
import { useState } from 'react';
import shelterService from '../../../services/shelter-service';
import './ShelterForm.css';
import { useHistory } from 'react-router';

import usePlacesAutocomplete from '../../shared/UsePlacesAutocomplete';
const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /^.{8,}$/;
const PHONE_PATTERN = /^[679]{1}[0-9]{8}$/;
const CIF_PATTERN = /^([a-z]|[A-Z]|[0-9])[0-9]{7}([a-z]|[A-Z]|[0-9])$/;

/**
 * 
 {
        "city": [
            50,
            50
        ],
    }
 * 
 */

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
    email: (value) => {
        let message;
        if(!value) {
            message = 'A valid email is required'
        } else if (!EMAIL_PATTERN.test(value)) {
            message = 'The email is invalid'
        }
        return message;
    },
    phone: (value) => {
        let message;
        if(!value) {
            message = 'A phone number is required'
        } else if (!PHONE_PATTERN.test(value)) {
            message = 'The phone number is invalid'
        }
        return message;
    },
    cif: (value) => {
        let message;
        if(!value) {
            message = 'A CIF of your shelter is required'
        } else if (!CIF_PATTERN.test(value)) {
            message = 'The CIF number is invalid'
        }
        return message;
    },
    contact: (value) => {
        let message;
        if(!value) {
            message = 'A contact person is required'
        }
        return message;
    },
    description: (value) => {
        let message;
        if(!value) {
            message = 'A shelter description is required'
        } else if (value.length < 100) {
            message = 'Name needs at least 100 chars'
        } else if (value.length > 300) {
            message = 'Name needs at most 300 chars'
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

function ShelterForm() {

    const history = useHistory();

    const [state, setState] = useState({
        shelter: {
            name: '',
            email: '',
            phone: '',
            cif: '',
            city: [],
            contact: '',
            description: '',
            password: '',
            rol: 'shelter'
        },
        touch: {},
        errors: {
            name: validations.name(),
            email: validations.email(),
            phone: validations.phone(),
            cif: validations.cif(),
            contact: validations.contact(),
            description: validations.description(),
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
            if (status == 'OK') {
                var lat = responses[0].geometry.location.lat();
                var lng = responses[0].geometry.location.lng();
                const newState = {
                    ...state,
                    shelter: {
                        ...state.shelter,
                        city: [Number(lat), Number(lng)]
                    }
                }
                setState(newState)
            }
        });
        console.log(prediction)
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
            shelter: {
                ...state.shelter,
                [name]: value
            },
            errors: {
                ...state.errors,
                [name]: validations[name] && validations[name](value)
            }
        }));
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

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('ENTRA', state)
        
           console.log('ENTRA')
            const { shelter } = state;
            shelterService.register(shelter)
            .then(shelter => {
                setState(shelter)
                history.push('/login')
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
        return Object.keys(errors).some(error => errors[error]);
    }

    const { shelter, errors, touch } = state;

    return (
        <div className="container">
            <div className="row">
            <div className="col-2">
                <img className="shelter-avatar-container" alt={shelter.name} src={shelter.avatar ? shelter.avatar: 'https://res.cloudinary.com/getapet/image/upload/v1617970328/default_avatar_xnnmwl.png'} />
            </div>
                <form onSubmit={handleSubmit} className="col-6">
                    <div className="input-group mb-4 d-flex align-items-end">
                        <span><i className="fas fa-user fa-lg me-3"></i></span>
                        <input name="name" type="text" value={shelter.name} onChange={handleChange} onBlur={handleBlur} placeholder="Name of your shelter" className={`form-control form-control-underlined border-primary ${touch.name && errors.name ? 'is-invalid' : ''}`}/>
                        <div className="invalid-feedback">{errors.name}</div>
                    </div>

                    <div className="input-group mb-4 d-flex align-items-end">
                        <span><i className="fas fa-envelope fa-lg me-3"></i></span>
                        <input name="email" type="text" value={shelter.email} onChange={handleChange} onBlur={handleBlur} placeholder="Email of your shelter" className={`form-control form-control-underlined border-primary ${touch.email && errors.email ? 'is-invalid' : ''}`}/>
                        <div className="invalid-feedback">{errors.email}</div>
                    </div>

                    <div className="input-group mb-4 d-flex align-items-end">
                        <span><i className="fas fa-phone fa-lg me-3"></i></span>
                        <input name="phone" type="text" value={shelter.phone} onChange={handleChange} onBlur={handleBlur} placeholder="Phone number of your shelter" className={`form-control form-control-underlined border-primary ${touch.phone && errors.phone ? 'is-invalid' : ''}`}/>
                        <div className="invalid-feedback">{errors.phone}</div>
                    </div>

                    <div className="input-group mb-4 d-flex align-items-end">
                        <span><i className="fas fa-check-circle fa-lg me-3"></i></span>
                        <input name="cif" type="text" value={shelter.cif} onChange={handleChange} onBlur={handleBlur} placeholder="CIF/NIE of your shelter" className={`form-control form-control-underlined border-primary ${touch.cif && errors.cif ? 'is-invalid' : ''}`}/>
                        <div className="invalid-feedback">{errors.cif}</div>
                    </div>

                    <div className="input-group mb-4 d-flex align-items-end">
                        <span><i className="fas fa-address-book fa-lg me-3"></i></span>
                        <input name="contact" type="text" value={shelter.contact} onChange={handleChange} onBlur={handleBlur} placeholder="Contact person of your shelter" className={`form-control form-control-underlined border-primary ${touch.contact && errors.contact ? 'is-invalid' : ''}`}/>
                        <div className="invalid-feedback">{errors.contact}</div>
                    </div>

                    <div className="input-group mb-4 d-flex align-items-center">
                        <span><i className="fas fa-lock fa-lg me-3"></i></span>
                        <input type="password" name="password" value={shelter.password} onChange={handleChange} onBlur={handleBlur} placeholder="Enter your password" className={`form-control form-control-underlined border-primary ${touch.password && errors.password ? 'is-invalid' : ''}`}/>
                        <div className="invalid-feedback">{errors.password}</div>
                    </div>
                    <div className="input-group mb-4 d-flex align-items-center">
                        <span><i className="fas fa-map-marker-alt fa-lg me-3"></i></span>
                        <input name="predictionSearch" autoComplete='off' value={selectedPrediction?.description} onChange={e => setSearchValue(e.target.value)}/>
                        <ul className='row google-list'>
                            {predictions?.map(prediction => (
                                <li key={prediction?.place_id}>
                                    <button className="google-btn-predictions" onClick={e => handlePredictionSelection(e, prediction)} onKeyDown={e => handlePredictionSelection(e, prediction)}>
                                        {prediction?.structured_formatting?.main_text || "Not found"}
                                    </button>
                                </li>
                            ))}
                         </ul>
                    </div>
                    <div className="input-group mb-4 d-flex align-items-center">
                        <span><i className="fas fa-edit fa-lg me-3"></i></span>
                        <textarea rows='4' type="text" name="description" value={shelter.description} onChange={handleChange} onBlur={handleBlur} placeholder="Shelter description" className={`form-control form-control-underlined border-primary ${touch.description && errors.description ? 'is-invalid' : ''}`}/>
                        <div className="invalid-feedback">{errors.description}</div>
                    </div>

                    {/* <div className="input-group mb-4 d-flex align-items-center">
                        <span><i className="fas fa-cloud-upload-alt fa-lg me-3"></i></span>
                        <input name="avatar" type="file"  onChange={handleChange} onBlur={handleBlur} placeholder="Shelter logo" className={`form-control form-control-underlined border-primary ${touch.avatar && errors.avatar ? 'is-invalid' : ''}`}/>
                        <span></span>
                        <div className="invalid-feedback">{errors.avatar}</div>
                    </div> */}

                    <button className="btn create-shelter-btn" type="submit" disabled={isValid()}><i className="fas fa-plus"></i> Register Shelter</button>
                </form>
            </div>
            
        </div>
        
    );


}

export default ShelterForm;