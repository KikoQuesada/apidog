import './UserForm.css'
import { useState, useEffect } from 'react';
import { registerUser} from '../../../services/users-service';
import { useHistory } from 'react-router';
import usePlacesAutocomplete from '../../shared/UsePlacesAutocomplete';
const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /^.{8,}$/;

const validations = {
    name: (value) => {
        let message;
        if (!value) {
            message = 'A name is required';
        } else if (value.length < 3) {
            message = 'Name needs at least 3 chars'
        } else if (value.length > 50) {
            message = 'Name needs at most 50 chars'
        }
        return message;
    },
    lastName: (value) => {
        let message;
        if (!value) {
            message = 'A last name is required'
        } else if (value.length > 50) {
            message = 'The last name cant be greater than 50 chars'
        }
        return message;
    },
    email: (value) => {
        let message;
        if(!value) {
            message = 'A valid email is required'
        } else if (!EMAIL_PATTERN.test(value)) {
            message = 'The email is invalid'
        }
        return message;
    },
    password: (value) => {
        let message;
        if(!value) {
            message = 'A valid password is required'
        } else if (!PASSWORD_PATTERN.test(value)) {
            message = 'The password needs at least 8 chars'
        }
        return message;
    },
}


function UserForm() {


    const history = useHistory();

    const [state, setState] = useState({
        user: {
            name: '',
            lastName: '',
            avatar: '',
            email: '',
            city: [],
            password: '',
            rol: 'adopter'
        },
        touch: {},
        errors: {
            name: validations.name(),
            email: validations.email(),
            lastName: validations.lastName(),
            password: validations.password(),
        }
    });




    

    const [selectedPrediction, setSelectedPrediction] = useState(null)
    const [searchValue, setSearchValue] = useState("")
    const {predictions, setPredictions} = usePlacesAutocomplete(searchValue)

    const handlePredictionSelection = (e, prediction) => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ 
            'placeId': prediction.place_id
        }, 
        function(responses, status) {
            console.log(responses)
            if (status === 'OK') {
                var lat = responses[0].geometry.location.lat();
                var lng = responses[0].geometry.location.lng();
                const newState = {
                    ...state,
                    user: {
                        ...state.user,
                        city: [Number(lat), Number(lng)]
                    }
                }
                setState(newState)
            }
        });
        e.preventDefault()
        setSelectedPrediction(prediction)
        setPredictions()
      }

      const handleChange = (event) => {
        let { name, value } = event.target;

        if (event.target.file) {
            value = event.target.files[0]
        }
        setState(state => ({
            ...state,
            user: {
                ...state.user,
                [name]: value
            },
            errors: {
                ...state.errors,
                [name]: validations[name] && validations[name](value)
            }
        }));
    }

    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }
        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)


    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        
        setSelectedFile(e.target.files[0])
    }

    const handleBlur = (event) => {
        const { name } = event.target;
        setState(state => ({
            ...state,
            touch: {
                ...state.touch,
                [name]: true
            }
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('ENTRA', state)
        
        const { user } = state;
        registerUser(user)
        .then(user => {
            history.push('/login', { email: user.email})
        })
        .catch(error => {
            const { message, errors } = error && error.response ? error.response.data : error;
            console.error(message);

            setState(state => ({
                ...state,
                errors: errors
            }))
        })         
        
    }

    const isValid = () => {
        const { errors } = state;
        return !Object.keys(errors).some(error => errors[error]);
    }

    const { user, errors, touch } = state;



    return (
        <div className="container">
            <h2 className="text-center mb-5 fw-bold">Just a few info to create your Account</h2>
            <div className="row justify-content-center">
            <div className="col-2">
                <img className="user-avatar-container" alt='user' src={preview ? preview: 'https://res.cloudinary.com/getapet/image/upload/v1618902177/web%20sources/teamwork_jqxzg6.png'} />
            </div>
                <form encType="multipart/form-data" onSubmit={handleSubmit} className="col-4 shadow register-user-container">
                    <div className="input-group mb-4 d-flex align-items-end">
                        <span><i className="fas fa-user fa-lg me-3"></i></span>
                        <input name="name" type="text" value={user.name} onChange={handleChange} onBlur={handleBlur} placeholder="Enter your name" className={`w-75 form-control-user form-control-underlined-user border-primary ${touch.name && errors.name ? 'is-invalid' : ''}`}/>
                        <div className="invalid-feedback">{errors.name}</div>
                    </div>

                    <div className="input-group mb-4 d-flex align-items-end">
                        <span><i className="fas fa-user fa-lg me-3"></i></span>
                        <input name="lastName" type="text" value={user.lastName} onChange={handleChange} onBlur={handleBlur} placeholder="Enter your last name" className={`w-75 form-control-user form-control-underlined-user border-primary ${touch.lastName && errors.lastName ? 'is-invalid' : ''}`}/>
                        <div className="invalid-feedback">{errors.lastName}</div>
                    </div> 

                    <div className="input-group mb-4 d-flex align-items-end">
                        <span><i className="fas fa-envelope fa-lg me-3"></i></span>
                        <input name="email" type="text" value={user.email} onChange={handleChange} onBlur={handleBlur} placeholder="Email of your user" className={`w-75 form-control-user form-control-underlined-user border-primary ${touch.email && errors.email ? 'is-invalid' : ''}`}/>
                        <div className="invalid-feedback">{errors.email}</div>
                    </div>

                    <div className="input-group mb-4 d-flex align-items-center">
                        <span><i className="fas fa-lock fa-lg me-3"></i></span>
                        <input type="password" name="password" value={user.password} onChange={handleChange} onBlur={handleBlur} placeholder="Enter your password" className={`w-75 form-control-user form-control-underlined-user border-primary ${touch.password && errors.password ? 'is-invalid' : ''}`}/>
                        <div className="invalid-feedback">{errors.password}</div>
                    </div>

                    <div className="input-group mb-4 d-flex align-items-center">
                        <span><i className="fas fa-map-marker-alt fa-lg me-3"></i></span>
                        <input name="predictionSearch" className="w-75" autoComplete='off' value={selectedPrediction?.description} onChange={e => setSearchValue(e.target.value)}/>
                        <ul className='row google-list-user'>
                            {predictions?.map(prediction => (
                                <li key={prediction?.place_id}>
                                    <button className="google-btn-predictions-user" onClick={e => handlePredictionSelection(e, prediction)} onKeyDown={e => handlePredictionSelection(e, prediction)}>
                                        {prediction?.structured_formatting?.main_text || "Not found"}
                                    </button>
                                </li>
                            ))}
                         </ul>
                    </div>

                    <div className="input-group mb-4 d-flex align-items-center">
                        <span><i className="fas fa-cloud-upload-alt fa-lg me-3"></i></span>
                        <input name="avatar" type="file"  onChange={onSelectFile} onBlur={handleBlur} placeholder="user logo" className={`w-75 form-control-user form-control-underlined-user border-primary ${touch.avatar && errors.avatar ? 'is-invalid' : ''}`}/>
                        <span></span>
                        <div className="invalid-feedback">{errors.avatar}</div>
                    </div>

                    <button className="btn create-user-btn" type="submit" disabled={!isValid()}><i className="fas fa-plus"></i> Register User</button>
                </form>
            </div>
            
        </div>
    );
}

export default UserForm;