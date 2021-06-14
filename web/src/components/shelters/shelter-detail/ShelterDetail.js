import shelterService from '../../../services/shelter-service';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { AuthContext } from '../../../contexts/AuthStore';

import './ShelterDetail.css';
import { withStyles } from '@material-ui/core';
import PetItem from './../../pets/pet-item/Petitem';


function ShelterDetail() {

    const params = useParams();

    const { user } = useContext(AuthContext);

    const [shelter, setShelter ] = useState();

    useEffect(() => {

        
        const { id } = params;

        shelterService.detail(id)
            .then(shelter => setShelter(shelter))
            .catch(error => console.error(error))


            return () => {

            }

    }, [params])
     
    if (!shelter) {
        return null;
    }
    
    const { name, pets, email, avatar, contact, phone, description } = shelter;

    const StyledPaper = withStyles({
        root: {
            backgroundColor: '#fafafa',

        }
    })(Paper);
    return (
        <div className="container">
            <div className="shelter-info-distribution">
                <div className="d-flex flex-column justify-content-center align-items-center shelter-detail-avatar">
                    <img className='col-6' alt={name} src={avatar}/>
                    {user?.rol === 'shelter' && (
                        <Link className="btn btn-primary shadow-sm col-6 mt-3" to='/petsCreate' role="button">Create Pet</Link>
                    )}
                    
                    <Link className="btn btn-primary shadow-sm col-6 mt-3" to="/" role="button">Visit Website</Link>
                   
                </div>
                <StyledPaper elevation={0} className="col-lg-6 col-sm-12">
                    <h3 className="mb-5 shelter-detail-name">{name}</h3>
                    <div className="shelter-detail-contact col-md-12">
                        <h6 className="me-4 fw-bold"><i className="fas fa-user me-2"></i>{contact}</h6>
                        <h6 className="me-4 fw-bold"><i className="fas fa-envelope me-2"></i>{email}</h6>
                        <h6 className="me-4 fw-bold"><i className="fas fa-phone me-2"></i>{phone}</h6>
                    </div>
                    {/* TODO: RESOLVE THE COORDINATES INTO A CITY IN THE FRONT
                    <h6 className="fw-bold"><i className="fas fa-map-marker-alt me-2"></i>{city}</h6> */}
                </StyledPaper>
            </div>
            <Divider light={false} className="bg-secondary" variant="middle" />
            <p className="shelter-detail-description">{description}</p>
            <div className="row justify-content-center">
                <div className="d-flex justify-content-center">
                    {pets.map(pet => (
                        <div className="d-flex justify-content-center m-4" key={pet.id}><PetItem pet={pet}/></div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ShelterDetail;