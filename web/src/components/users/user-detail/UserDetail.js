import { useParams, useHistory } from 'react-router';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UserDetail.css'
import { detail } from '../../../services/users-service';

import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core';

function UserDetail() {

    const history = useHistory();
    const params = useParams();

    const [user, setUser] = useState();
    console.log('USER', user)
    useEffect(() => {
        const { id } = params;

            detail(id)
            .then(user => setUser(user))
            .catch(error => console.error(error));

            return () => {
                //Will Unmount???
            }



    }, [params, history])

    if(!user) {
        return null
    }



    const { rol, name, lastName, email, avatar, adoption } = user;

    const StyledPaper = withStyles({
        root: {
            backgroundColor: '#fafafa',

        }
    })(Paper);

    return (
        <div className="container">
            <div className="userDetail-info-distribution">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <img className='col-6 userDetail-avatar-container shadow' alt={name} src={avatar}/>
                </div>
                <h3 className="user-detail-name">{name} {lastName}</h3>
                <h6 className="me-4 fw-bold"><i className="user-info-icon fas fa-envelope me-2"></i>{email}</h6>        
            </div> 
            <Divider light={false} className="bg-secondary" variant="middle" />
            {user?.adoption === null && (
                <section className="d-flex flex-column justify-content-center align-items-center">
                    <h3 className="fw-3 fs-1 mt-4 mb-3">¿You don't have your Adoption Form completed?</h3>
                    <h4 className="noAdoption-titles mt-2 mb-4">go ahead!</h4>
                    <Link to="/adoptionForm" className="btn btn-primary">Adoption Form</Link>
                </section>
                
            )}
            {user?.rol === 'shelter' && (
                <StyledPaper elevation={0} className="row styledPaper justify-content-center">
                    <h3 className="user-detail-name text-center mt-4 mb-4">{name}'s Adoption Form Answers</h3>
                    <div className="col-lg-6 col-md-12 col-sm-12 p-4">
                        <h6 className="adoption-titles">Home Information</h6>
                        <p>{adoption.homeInfo}</p>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 p-4">
                        <h6 className="adoption-titles">Family Information</h6>
                        <p>{adoption.familyInfo}</p>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 p-4">
                        <h6 className="adoption-titles">Work and Hobbies</h6>
                        <p>{adoption.workInfo}</p>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 p-4">
                        <h6 className="adoption-titles">Pet Necessities</h6>
                        <p>{adoption.petNecessities}</p>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 p-4">
                        <h6 className="adoption-titles">Pet Costs</h6>
                        <p>{adoption.petCosts}</p>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 p-4">
                        <h6 className="adoption-titles">Why I want to Adopt</h6>
                        <p>{adoption.whyAdoption}</p>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 p-4">
                        <h6 className="adoption-titles">My Perfect Pet</h6>
                        <p>{adoption.perfectPet}</p>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 p-4">
                        <h6 className="adoption-titles">About Adoption Policy</h6>
                        <p>{adoption.shelterPolicy}</p>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 p-4">
                        <h6 className="adoption-titles">I know all this bad behaviours</h6>
                        <p>{adoption.badBehaviour}</p>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 p-4">
                        <h6 className="adoption-titles">And my solutions for that are</h6>
                        <p>{adoption.behaviourSolution}</p>
                    </div>
                </StyledPaper>
            )}
            {user?.id === adoption?.owner && (
                <StyledPaper elevation={0} className="row styledPaper justify-content-center">
                    <h3 className="user-detail-name text-center mt-4 mb-4">{name}'s Adoption Form Answers</h3>
                    <div className="col-lg-6 col-md-12 col-sm-12 p-4">
                        <h6 className="adoption-titles">Home Information</h6>
                        <p>{adoption.homeInfo}</p>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 p-4">
                        <h6 className="adoption-titles">Family Information</h6>
                        <p>{adoption.familyInfo}</p>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 p-4">
                        <h6 className="adoption-titles">Work and Hobbies</h6>
                        <p>{adoption.workInfo}</p>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 p-4">
                        <h6 className="adoption-titles">Pet Necessities</h6>
                        <p>{adoption.petNecessities}</p>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 p-4">
                        <h6 className="adoption-titles">Pet Costs</h6>
                        <p>{adoption.petCosts}</p>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 p-4">
                        <h6 className="adoption-titles">Why I want to Adopt</h6>
                        <p>{adoption.whyAdoption}</p>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 p-4">
                        <h6 className="adoption-titles">My Perfect Pet</h6>
                        <p>{adoption.perfectPet}</p>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 p-4">
                        <h6 className="adoption-titles">About Adoption Policy</h6>
                        <p>{adoption.shelterPolicy}</p>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 p-4">
                        <h6 className="adoption-titles">I know all this bad behaviours</h6>
                        <p>{adoption.badBehaviour}</p>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 p-4">
                        <h6 className="adoption-titles">And my solutions for that are</h6>
                        <p>{adoption.behaviourSolution}</p>
                    </div>
                </StyledPaper>
            )}
            
        </div>
    );
}

export default UserDetail;