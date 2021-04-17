import './Petitem.css';
import { Link } from 'react-router-dom';


function PetItem( { pet:{ id, name, image, age, gender, status, race} }) {


    return (
            <div>
                <div className="img-container">
                    <div className="d-flex justify-content-between align-items-center p-2 first"> <span className={status === 'Looking for home' ? 'home-status' : 'adopted-status'}>{status}</span> {/* <span className="wishlist"><i className="fa fa-heart"></i></span> */} </div> <img alt={name} src={image} className="pet-img"/>
                </div>
                <div className="product-detail-container">
                    <div className="d-flex justify-content-between align-items-center">
                        <h6 className="mb-0">{name}</h6> <span className="font-weight-bold pet-info">{`${age}`} {age > 1 ? 'Years' : 'Year'}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                        <div className="pet-info"> <i className={gender === 'male' ? 'fa fa-mars' : 'fa fa-venus'}></i> <span>{gender}</span> </div>
                    </div>
                    <div className="mt-3 d-grid gap-2"> <Link to={`/pets/${id}`} className="btn pet-btn">{`MORE ABOUT ${name.toUpperCase()}`}</Link> </div>
                </div>
            </div>
    );
}

export default PetItem;