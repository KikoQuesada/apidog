import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import petService from '../../../services/pet-service';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import './PetForm.css'

const validations = {
    nickName: (value) => {
        let message;
        if (!value) {
            message = 'A pet name is required'
        } else if (value < 3) {
            message = 'Pets name needs at least 3 chars'
        } else if (value > 50) {
            message = 'Pets name needs at most 50 chars'
        }
        return message;
    },
    specie: (value) => {
        let message;
        if (!value) {
            message = 'The pet specie is required'
        }
        return message;
    },
    gender: (value) => {
        let message;
        if (!value) {
            message = 'Pet gender is required'
        }
        return message;
    },
    race: (value) => {
        let message;
        if (!value) {
            message = 'A pet race is required'
        } else if (value < 3) {
            message = 'Pets race needs at least 3 chars'
        } else if (value > 50) {
            message = 'Pets race needs at most 50 chars'
        }
        return message;
    },
    age: (value) => {
        let message;
        if (!value) {
            message = 'Pet age is required'
        } else if (Number(value) < 0) {
            message = 'Pets age needs to be greater than 0'
        }
        return message;
    },
    personality: (value) => {
        let message;
        if (!value) {
            message = 'Pet personality is required'
        } else if (value < 20) {
            message = 'Pet personality needs at least 20 chars'
        } else if (value > 300) {
            message = 'Pet personality needs at most 300 chars'
        }
        return message;
    }
}


function PetForm() {


    /*
    
    
    
    status: {
        type: String,
        enum: ['Adopted', "Looking for home"],
        required: 'Need to say if the pet is available',
    }
    */ 

    const history = useHistory();

    const [state, setState] = useState({
        pet: {
            nickName: '',
            specie: '',
            gender: '',
            race: '',
            age: 0,
            personality: '',
            status: 'Looking for home'
        },
        errors: {
            nickName: validations.nickName(),
            specie: validations.specie(),
            gender: validations.gender(),
            race: validations.race(),
            age: validations.age(),
            personality: validations.personality(),
        },
        touch: {}
    });


    const handleChange = (event) => {
        const { name, value } = event.target;

        if (event.target.file) {
            value = event.target.files[0]
        }

        setState(state => {
            return {
                ...state,
                pet: {
                    ...state.pet,
                    [name]: value,
                },
                errors: {
                    ...state.errors,
                    [name]: validations[name] && validations[name](value)
                }
            }
        });
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
        
        const { pet } = state;
        petService.create(pet)
        .then(pet => {
            history.push(`/pets/${pet.id}`)
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

      const { pet, errors, touch} = state;

    return (
        <div className="container">
            <h2 className="text-center mb-5 fw-bold">Lets create our pet profile</h2>
            <div className="row justify-content-center">
                <div className="col-2">
                    <img className="pet-avatar-container" alt={pet.nickName} src={preview ? preview: 'https://res.cloudinary.com/getapet/image/upload/v1618949993/web%20sources/pet_zr6far.png'} />
                </div>
                <form onSubmit={handleSubmit} className="col-6 shadow register-container">

                    <div className="input-group mb-4 d-flex align-items-end">
                        <span><i className="fas fa-signature fa-lg me-3"></i></span>
                        <input name="nickName" type="text" value={pet.nickName} onChange={handleChange} onBlur={handleBlur} placeholder="Name of your pet" className={`form-control form-control-underlined border-primary ${touch.nickName && errors.nickName ? 'is-invalid' : ''}`}/>
                        <div className="invalid-feedback">{errors.nickName}</div>
                    </div>

                    <div className="input-group mb-4 d-flex align-items-end justify-content-around">
                        <div className="d-flex flex-column me-4">
                        <h6 className="fs-5">Specie</h6>
                        <Select  value={pet.specie} name="specie" onChange={handleChange} inputProps={{name: 'specie'}} >
                            
                            <MenuItem value="dog">Dog</MenuItem>
                            <MenuItem value="cat">Cat</MenuItem>
                        </Select>
                        </div>
                        <div className="d-flex flex-column">
                        <h6 className="fs-5">Gender</h6>
                        <Select value={pet.gender} onChange={handleChange} inputProps={{name: 'gender'}} >
                            
                            <MenuItem value='male' >male</MenuItem>
                            <MenuItem value='female'>female</MenuItem>
                        </Select>
                        </div>
                    </div>

                    <div className="input-group mb-4 d-flex align-items-end">
                        <span><i className="fas fa-paw fa-lg me-3"></i></span>
                        <input name="race" type="text" value={pet.race} onChange={handleChange} onBlur={handleBlur} placeholder="Race of your pet" className={`form-control form-control-underlined border-primary ${touch.race && errors.race ? 'is-invalid' : ''}`}/>
                        <div className="invalid-feedback">{errors.race}</div>
                    </div>

                    <div className="input-group mb-4 d-flex align-items-end">
                        <span><i className="fas fa-birthday-cake fa-lg me-3"></i></span>
                        <input name="age" type="number" value={pet.age} onChange={handleChange} onBlur={handleBlur} placeholder="Name of your pet" className={`form-control form-control-underlined border-primary ${touch.age && errors.age ? 'is-invalid' : ''}`}/>
                        <div className="invalid-feedback">{errors.age}</div>
                    </div>

                    <div className="input-group mb-4 d-flex align-items-center">
                        <span><i className="fas fa-align-left fa-lg me-3"></i></span>
                        <textarea rows='4' name="personality" type="text" value={pet.personality} onChange={handleChange} onBlur={handleBlur} placeholder="Describe the personality of the pet" className={`form-control form-control-underlined border-primary ${touch.personality && errors.personality ? 'is-invalid' : ''}`}/>
                        <div className="invalid-feedback">{errors.personality}</div>
                    </div>

                    <div className="input-group mb-4 d-flex align-items-center">
                        <span><i className="fas fa-cloud-upload-alt fa-lg me-3"></i></span>
                        <input name="image" type="file"  onChange={onSelectFile}  placeholder="Shelter logo" className={`form-control form-control-underlined border-primary ${touch.image && errors.image ? 'is-invalid' : ''}`}/>
                        <span></span>
                        <div className="invalid-feedback">{errors.image}</div>
                    </div>

                    <button className="btn create-pet-btn" type="submit" disabled={isValid()}><i className="fas fa-plus"></i> Create Pet</button>
                </form>
            </div>   
        </div>
    );
}

export default PetForm;