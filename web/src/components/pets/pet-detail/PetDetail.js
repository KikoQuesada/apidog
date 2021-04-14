import { useParams, useHistory } from 'react-router';
import { useState, useEffect } from 'react';
import petService from '../../../services/pet-service';
import { Link } from 'react-router-dom'
import './PetDetail.css';


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
    return ( 
        <div className="container w-75">
            <div className="profile-header">

                <div className="profile-img">
                    <img src={image} width="200" alt={name}/>
                </div>

                <div className="profile-nav-info">
                    <h3 className="user-name">{name}</h3>
                    <div className="address">
                        <p>{race.toUpperCase()}</p>
                    </div>
                </div>

            </div>

            <div className="main-bd">
                <div>
                    <div className="profile-side">
                        <div className="d-flex justify-content-end">
                            <h5 className={status === 'Looking for home' ? 'profile-side-home' : 'profile-side-adopted'}>{status}</h5>
                        </div>
                        <div className="d-flex justify-content-around align-items-center pet-detail-info">
                            <p><i className="fas fa-birthday-cake"></i> {age} {age === 1 ? 'Year' : 'Years'}</p>
                            <p><i className={gender === 'male' ? 'fas fa-mars' : 'fas fa-venus'}></i> {gender}</p>
                            <p><i className="fas fa-paw"></i><Link to={`/shelters/${shelter.id}`} className="pet-shelter-link"> {shelter.name}</Link></p>
                        </div>
                        
                        <div className="pet-personality">
                            <p>{personality}</p>
                        </div>
                        <div className="profile-btn">
                            <button className="adoptRequest"><i className="fas fa-paper-plane"></i> Send Adoption Request</button>
                            <button className="adoptRequest"><i className="fas fa-undo"></i> <Link to='/pets'> Back to Pets</Link></button>
                        </div>
                    </div>
                    {gallery.length !== 0 ? (
                    <div className="mt-5">
                        <h3>Here you can see more about<h3 className="pet-name-galley">{name}</h3></h3>
                        <div className="pet-detail-gallery">
                            {gallery.map(img => <img key={img} src={img} alt={name}/>)}
                        </div>
                    </div>
                    ) : ''}
                    
                </div>
            </div>
        </div>
    )
}

export default PetDetail;