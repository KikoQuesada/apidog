import { useParams, useHistory } from 'react-router';
import { useState, useEffect } from 'react';
import petService from '../../../services/pet-service';
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

    const { name, race, age, image, gender, personality, shelter, specie, status } = pet;
    return ( 
        <div className="container">
            <div className="profile-header">

                <div className="profile-img">
                    <img src={image} width="200" alt={name}/>
                </div>

                <div className="profile-nav-info">
                    <h3 className="user-name">{name}</h3>
                    <div className="address">
                        <p>{race.toUpperCase()}</p>
                        <p>{shelter.name}</p>
                    </div>
                </div>

            </div>

            <div className="main-bd">
                <div className="">
                    <div className="profile-side">
                        <h5 classNameName={status === 'Looking for home' ? 'profile-side-home' : 'profile-side-adopted'}>{status}</h5>
                        <p className="mobile-no"><i className="fa fa-phone"></i> +23470xxxxx700</p>
                        <p className="user-mail"><i className="fa fa-envelope"></i> Brightisaac80@gmail.com</p>
                        <div className="user-bio">
                            <h3>Bio</h3>
                            <p className="bio">
                            Lorem ipsum dolor sit amet, hello how consectetur adipisicing elit. Sint consectetur provident magni yohoho consequuntur, voluptatibus ghdfff exercitationem at quis similique. Optio, amet!
                            </p>
                        </div>
                        <div className="profile-btn">
                            <button className="chatbtn" id="chatBtn"><i className="fa fa-comment"></i> Chat</button>
                            <button className="createbtn" id="Create-post"><i className="fa fa-plus"></i> Create</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PetDetail;