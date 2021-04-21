import { useState } from 'react';
import { useHistory } from 'react-router';
import petService from '../../../services/pet-service';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const validations = {
    nickname: (value) => {
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
        } else if (value < 0) {
            message = 'Pets age needs to be greater than 0'
        }
        return message;
    },
}


function PetForm() {


    /*
    
    race: {
        type: String, 
        required: 'The pet race is required',
        minLength: [3, 'Name needs at least 3 chars'],
        maxLength: [50, 'Name needs at most 50 chars']
    },
    age: {
        type: Number, 
        required: 'Pet age is required',
        min: [1, 'Age must be greater than 1'],
    },
    gender: {
        type: String, 
        enum: ['male', 'female'],
        required: 'Pet gender is required'
    },
    personality: {
        type: String, 
        required: 'Pet personality is required',
        minLength: [20, 'Name needs at least 20 chars'],
        maxLength: [300, 'Name needs at most 300 chars']
    },
    shelter: {
        ref: 'User',
        type: Schema.Types.ObjectId,
        required: 'A shelter owner is required'
    },
    status: {
        type: String,
        enum: ['Adopted', "Looking for home"],
        required: 'Need to say if the pet is available',
    }
    */ 

    const history = useHistory();

    const [state, setState] = useState({
        pet: {
            nickname: '',
            specie: [],
            gender: [],
            race: '',
            age: 1,
        },
        errors: {
            nickname: validations.nickname(),
            specie: validations.specie(),
            gender: validations.gender(),
            race: validations.race(),
            age: validations.age(),
        },
        touch: {}
    });


    const handleChange = (event) => {
        const { name, value } = event.target;
        setState(state => {
            return {
                ...state,
                event: {
                    ...state.event,
                    [name]: value,
                },
                errors: {
                    ...state.errors,
                    [name]: validations[name] && validations[name](value)
                }
            }
        });
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

      const handleSubmit = async (event) => {
        event.preventDefault();

        if (isValid()) {
            try {
                const eventData = state.event;
                const pet = eventData.id ? await petService.update(eventData) : await petService.create(eventData);
                history.push(`/pets/${pet.id}`);
            } catch(error) {
                const { message, errors } = error.response?.data || error;

                setState(state => ({
                    ...state,
                    errors: {
                        ...errors,
                        title: !errors && message
                    },
                    touch: {
                        ...errors,
                        title: !errors && message
                    }
                }));


            }
        }

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
        
                <form onSubmit={handleSubmit} className="col-6 shadow register-container">

                    <div className="input-group mb-4 d-flex align-items-end">
                        <span><i className="fas fa-paw fa-lg me-3"></i></span>
                        <input name="nickname" type="text" value={pet.nickname} onChange={handleChange} onBlur={handleBlur} placeholder="Name of your pet" className={`form-control form-control-underlined border-primary ${touch.nickname && errors.nickname ? 'is-invalid' : ''}`}/>
                        <div className="invalid-feedback">{errors.nickname}</div>
                    </div>

                    <div className="input-group mb-4 d-flex align-items-end justify-content-around">
                        <div className="d-flex flex-column me-4">
                        <h5>Specie</h5>
                        <Select  value={pet.specie} name="specie" onChange={handleChange} inputProps={{name: 'specie'}} >
                            
                            <MenuItem value="dog">Dog</MenuItem>
                            <MenuItem value="cat">Cat</MenuItem>
                        </Select>
                        </div>
                        <div className="d-flex flex-column">
                        <h5>Gender</h5>
                        <Select value={pet.gender} onChange={handleChange} inputProps={{name: 'gender'}} >
                            
                            <MenuItem value={pet.gender[0]} >male</MenuItem>
                            <MenuItem value={pet.gender[1]} >female</MenuItem>
                        </Select>
                        </div>
                    </div>

                    <div className="input-group mb-4 d-flex align-items-end">
                        <span><i className="fas fa-venus-mars fa-lg me-3"></i></span>
                        <input name="race" type="text" value={pet.race} onChange={handleChange} onBlur={handleBlur} placeholder="Race of your pet" className={`form-control form-control-underlined border-primary ${touch.race && errors.race ? 'is-invalid' : ''}`}/>
                        <div className="invalid-feedback">{errors.race}</div>
                    </div>

                    <div className="input-group mb-4 d-flex align-items-end">
                        <span><i className="fas fa-birthday-cake fa-lg me-3"></i></span>
                        <input name="age" type="number" value={pet.age} onChange={handleChange} onBlur={handleBlur} placeholder="Name of your pet" className={`form-control form-control-underlined border-primary ${touch.age && errors.age ? 'is-invalid' : ''}`}/>
                        <div className="invalid-feedback">{errors.age}</div>
                    </div>

                    <button className="btn create-shelter-btn" type="submit" disabled={isValid()}><i className="fas fa-plus"></i> Create Pet</button>
                </form>
            </div>   
        </div>
    );
}

export default PetForm;