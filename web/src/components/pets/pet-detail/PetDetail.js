import { useParams, useHistory } from 'react-router';
import { useState, useEffect } from 'react';
import petService from '../../../services/pet-service';
import { Link } from 'react-router-dom'
import './PetDetail.css';

import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core';

function PetDetail() {

    const history = useHistory();
    const params = useParams();

    const [pet, setPet] = useState();

    useEffect(() => {
        
        const { id } = params;

        petService.detail(id)
            .then(pet => setPet(pet))
            .catch(error => console.error(error))

        return () => {
            // ComponentWillUnmount
        }

    }, [history, params])

    if (!pet) {
        return null
    }

    const { name, race, age, image, gender, personality, shelter, status, gallery } = pet;

    const StyledPaper = withStyles({
        root: {
            backgroundColor: '#fafafa',

        }
    })(Paper);
    return ( 

        <div className="container">
            <div className="pet-info-distribution">
                <div className="d-flex flex-column justify-content-center align-items-center pet-detail-avatar">
                    <img className='col-6' alt={name} src={image}/>
                    <div className={`pet-status-${status === 'Looking for home' ? 'home' : 'adopted'} shadow-sm mt-4`}>{status}</div>
                </div>
                <StyledPaper elevation={0} className="col-lg-6 col-sm-12 styledPaper">
                    <h3 className="pet-detail-name">{name}</h3>
                    <h4 className="mb-5">{race}</h4>
                    <div className="pet-detail-contact col-md-12">
                        <h6 className="me-4 fw-bold"><i className="pet-info-icon fas fa-birthday-cake me-2"></i>{age} {`${age > 1 ? 'Years' : 'Year'}`}</h6>
                        <h6 className="me-4 fw-bold"><i className={`pet-info-icon fas fa-${gender === 'male' ? 'mars' : 'venus'} me-2`}></i>{gender}</h6>
                        <h6 className="me-4 fw-bold"><i className={`pet-info-icon fas fa-home me-2`}></i>{shelter.name}</h6>
                        
                    </div>
                </StyledPaper>
            </div>
            <Divider light={false} className="bg-secondary" variant="middle" />
            <p className="pet-detail-description">{personality}</p>
            <div className="row justify-content-center">
            <h3 className="mb-4 title-gallery">{name}'s Image Gallery</h3>
                <div className="row">
                    {gallery.map(img =><div className="col-lg-2 col-md-12 mb-4"> <img className="img-fluid mb-4 shadow-sm" key={img} src={img} alt={name}/></div>)}
                </div>
            </div>
        </div>

    )
}

export default PetDetail;