import { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { AuthContext } from '../../contexts/AuthStore';
import adoptionService from '../../services/adoption-service';
import './AdoptionForm.css';

const validations = {
    homeInfo: (value) => {
        let message;
        if (!value) {
            
        } else if (value.length > 1000) {
            message = 'You only have 1000 chars to tell us about your home'
        }
        return message;
    },
    familyInfo: (value) => {
        let message;
        if (!value) {
            
        } else if (value.length > 1000) {
            message = 'You only have 1000 chars to tell us about your family'
        }
        return message;
    },
    workInfo: (value) => {
        let message;
        if (!value) {
            
        } else if (value.length > 1000) {
            message = 'You only have 1000 chars to tell us about your work and hobbies'
        }
        return message;
    },
    petNecessities: (value) => {
        let message;
        if (!value) {
            
        } else if (value.length > 1000) {
            message = 'You only have 1000 chars to tell us about pet necessities'
        }
        return message;
    },
    petCosts: (value) => {
        let message;
        if (!value) {
            
        } else if (value.length > 1000) {
            message = 'You only have 1000 chars to tell us about pet costs'
        }
        return message;
    },
    whyAdoption: (value) => {
        let message;
        if (!value) {
            
        } else if (value.length > 1000) {
            message = 'You only have 1000 chars to tell us about why you want to adopt'
        }
        return message;
    },
    perfectPet: (value) => {
        let message;
        if (!value) {
            
        } else if (value.length > 1000) {
            message = 'You only have 1000 chars to tell us about your perfect pet'
        }
        return message;
    },
    shelterPolicy: (value) => {
        let message;
        if (!value) {
            
        } else if (value.length > 1000) {
            message = 'You only have 1000 chars to tell us about our shelter policy'
        }
        return message;
    },
    badBehaviour: (value) => {
        let message;
        if (!value) {
            
        } else if (value.length > 1000) {
            message = 'You only have 1000 chars to tell us about bad behaviour'
        }
        return message;
    },
    behaviourSolution: (value) => {
        let message;
        if (!value) {
            
        } else if (value.length > 1000) {
            message = 'You only have 1000 chars to tell us about behaviour solutions'
        }
        return message;
    },
}

function AdoptionForm() {

    

    const { user } = useContext(AuthContext)
    const history = useHistory();
    console.log('USER', user)
    const [state, setState] = useState({
        adoption: {
            homeInfo: '',
            familyInfo: '',
            workInfo: '',
            petNecessities: '',
            petCosts: '',
            whyAdoption: '',
            perfectPet: '',
            shelterPolicy: '',
            badBehaviour: '',
            behaviourSolution: '',
        },
        errors: {
            homeInfo: validations.homeInfo(),
            familyInfo: validations.familyInfo(),
            workInfo: validations.workInfo(),
            petNecessities: validations.petNecessities(),
            petCosts: validations.petCosts(),
            whyAdoption: validations.whyAdoption(),
            perfectPet: validations.perfectPet(),
            shelterPolicy: validations.shelterPolicy(),
            badBehaviour: validations.badBehaviour(),
            behaviourSolution: validations.behaviourSolution(),
        },
        touch: {}
    })


    const handleChange = (event) => {
        let { name, value } = event.target;

        if (event.target.file) {
            value = event.target.files[0]
        }


        setState(state => ({
            ...state,
            adoption: {
                ...state.adoption,
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('USER', user)
        
        const { adoption } = state;
        const ad = user?.adoption?.id ? adoptionService.update(user.adoption) : adoptionService.create(adoption)
            .then(adoption => {
                history.push(`/adoptions/${adoption.id}`)
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


    const { adoption, errors, touch } = state;

    return (
        <form onSubmit={handleSubmit} className="row justify-content-center">
            <h2 className="adoption-title">Adoption Form</h2>
            <div className="row justify-content-center col-lg-6">
                <div className="input-group m-4 p-5 d-flex flex-column align-items-start">
                    <h5>Your Home</h5>
                    <textarea rows='5' type="text" name="homeInfo" value={adoption.homeInfo} onChange={handleChange} onBlur={handleBlur} placeholder="Tell us about your home: flat or house, dimensions, garden, owner or rent, etc.. " className={`adoption-form-control adoption-form-control-underlined border-primary ${touch.homeInfo && errors.homeInfo ? 'is-invalid' : ''}`}/>
                    <div className="invalid-feedback">{errors.homeInfo}</div>
                </div>
            </div>
            <div className="row justify-content-center col-lg-6">
                <div className="input-group m-4 p-5 d-flex flex-column align-items-start">
                    <h5>Your Family</h5>
                    <textarea rows='5' type="text" name="familyInfo" value={adoption.familyInfo} onChange={handleChange} onBlur={handleBlur} placeholder="Tell us about your family: how many people? Children? babies? anyone with allergy? etc.. " className={`adoption-form-control adoption-form-control-underlined border-primary ${touch.familyInfo && errors.familyInfo ? 'is-invalid' : ''}`}/>
                    <div className="invalid-feedback">{errors.familyInfo}</div>
                </div>
            </div>
            <div className="row justify-content-center col-lg-6">
                <div className="input-group m-4 p-5 d-flex flex-column align-items-start">
                    <h5>Your Work</h5>
                    <textarea rows='5' type="text" name="workInfo" value={adoption.workInfo} onChange={handleChange} onBlur={handleBlur} placeholder="Tell us about your work: do you have? stability? schedule? Any hobby? Holidays? etc.. " className={`adoption-form-control adoption-form-control-underlined border-primary ${touch.workInfo && errors.workInfo ? 'is-invalid' : ''}`}/>
                    <div className="invalid-feedback">{errors.workInfo}</div>
                </div>
            </div>
            <div className="row justify-content-center col-lg-6">
                <div className="input-group m-4 p-5 d-flex flex-column align-items-start">
                    <h5>Pet Necessities</h5>
                    <textarea rows='5' type="text" name="petNecessities" value={adoption.petNecessities} onChange={handleChange} onBlur={handleBlur} placeholder="Tell us all the necessities you think a cat/dog needs and what do you think about sterilization" className={`adoption-form-control adoption-form-control-underlined border-primary ${touch.petNecessities && errors.petNecessities ? 'is-invalid' : ''}`}/>
                    <div className="invalid-feedback">{errors.petNecessities}</div>
                </div>
            </div>
            <div className="row justify-content-center col-lg-6">
                <div className="input-group m-4 p-5 d-flex flex-column align-items-start">
                    <h5>Pet Costs</h5>
                    <textarea rows='5' type="text" name="petCosts" value={adoption.petCosts} onChange={handleChange} onBlur={handleBlur} placeholder="Tell us all the expenses produce a cat/dog per month and what do you think a vet consult cost" className={`adoption-form-control adoption-form-control-underlined border-primary ${touch.petCosts && errors.petCosts ? 'is-invalid' : ''}`}/>
                    <div className="invalid-feedback">{errors.petCosts}</div>
                </div>
            </div>
            <div className="row justify-content-center col-lg-6">
                <div className="input-group m-4 p-5 d-flex flex-column align-items-start">
                    <h5>Why?</h5>
                    <textarea rows='5' type="text" name="whyAdoption" value={adoption.whyAdoption} onChange={handleChange} onBlur={handleBlur} placeholder="Tell us why you want to adopt a pet" className={`adoption-form-control adoption-form-control-underlined border-primary ${touch.whyAdoption && errors.whyAdoption ? 'is-invalid' : ''}`}/>
                    <div className="invalid-feedback">{errors.whyAdoption}</div>
                </div>
            </div>
            <div className="row justify-content-center col-lg-6">
                <div className="input-group m-4 p-5 d-flex flex-column align-items-start">
                    <h5>Your Perfect Pet</h5>
                    <textarea rows='5' type="text" name="perfectPet" value={adoption.perfectPet} onChange={handleChange} onBlur={handleBlur} placeholder="Describe us you perfect pet (cat or dog)" className={`adoption-form-control adoption-form-control-underlined border-primary ${touch.perfectPet && errors.perfectPet ? 'is-invalid' : ''}`}/>
                    <div className="invalid-feedback">{errors.perfectPet}</div>
                </div>
            </div>
            <div className="row justify-content-center col-lg-6">
                <div className="input-group m-4 p-5 d-flex flex-column align-items-start">
                    <h5>Shelter Policy</h5>
                    <textarea rows='5' type="text" name="shelterPolicy" value={adoption.shelterPolicy} onChange={handleChange} onBlur={handleBlur} placeholder="Some shelter may want to meet you personally and to make a post adoption following. What do you think about this, are you agree?" className={`adoption-form-control adoption-form-control-underlined border-primary ${touch.shelterPolicy && errors.shelterPolicy ? 'is-invalid' : ''}`}/>
                    <div className="invalid-feedback">{errors.shelterPolicy}</div>
                </div>
            </div>
            <div className="row justify-content-center col-lg-6">
                <div className="input-group m-4 p-5 d-flex flex-column align-items-start">
                    <h5>Bad Behaviour</h5>
                    <textarea rows='5' type="text" name="badBehaviour" value={adoption.badBehaviour} onChange={handleChange} onBlur={handleBlur} placeholder="Tell us all the bad behaviours of a cat/dog you can remember" className={`adoption-form-control adoption-form-control-underlined border-primary ${touch.badBehaviour && errors.badBehaviour ? 'is-invalid' : ''}`}/>
                    <div className="invalid-feedback">{errors.badBehaviour}</div>
                </div>
            </div>
            <div className="row justify-content-center col-lg-6">
                <div className="input-group m-4 p-5 d-flex flex-column align-items-start">
                    <h5>Bad Behaviour Solutions</h5>
                    <textarea rows='5' type="text" name="behaviourSolution" value={adoption.behaviourSolution} onChange={handleChange} onBlur={handleBlur} placeholder="Tell us which are the bests approaches to solve this bad behaviours" className={`adoption-form-control adoption-form-control-underlined border-primary ${touch.behaviourSolution && errors.behaviourSolution ? 'is-invalid' : ''}`}/>
                    <div className="invalid-feedback">{errors.behaviourSolution}</div>
                </div>
            </div>
            <button className="btn create-shelter-btn col-2" type="submit"><i className="fas fa-paper-plane"></i> Send</button>
        </form>
        
    );   
}

export default AdoptionForm;