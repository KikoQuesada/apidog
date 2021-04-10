import { Link } from 'react-router-dom';
import './ShelterItem.css';


function ShelterItem({ shelter: {id, name, city, avatar, contact, phone, email, pets}}) {
    return(
        <div className="shelter-card d-flex flex-column align-items-center">
            <img width="80px" className="shelter-img" src={avatar} alt="default" />
            <h5 className="shelter-name-card">{name}</h5>
            <div>
                <i className="fa fa-paw fa-2x"></i>
            </div>
            <button className="shelter-info-button"><Link className="shelter-info-button-link" to={`/shelters/${id}`}>Shelter Info</Link></button>
            
        </div>
    );
}

export default ShelterItem;