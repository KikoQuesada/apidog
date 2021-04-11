import { Link } from 'react-router-dom';
import './ShelterItem.css';


function ShelterItem({ shelter: {id, name, city, avatar}}) {
    return(
        <div className="shelter-card d-flex flex-column align-items-center">
            <img height="100px" width="100px" className="shelter-img" src={avatar} alt="default" />
            <div className="shelter-card-content">
                <h5 className="shelter-name-card">{name}</h5>
                <div className="d-flex justify-content-between">
                    <i className="fa fa-paw fa-2x" aria-hidden="true"></i>
                    <i class="fa fa-building fa-2x" aria-hidden="true"></i><span>{city}</span>
                </div>
            </div>
            <button className="shelter-info-button"><Link className="shelter-info-button-link" to={`/shelters/${id}`}>Shelter Info</Link></button>
        </div>
    );
}

export default ShelterItem;