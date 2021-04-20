import { Link } from 'react-router-dom';
import './SelectUser.css'

function SelectUser() {
    return (
        <div className="container">
            <h2 className="text-center">¿Do you want to adopt a pet or you have pets for adoption?</h2>
            <div className="row justify-content-center">
                <div className="row col-lg-4 justify-content-center">
                    <div className="img-position shadow">
                        <Link to="/registerUser" ><img className="btn-image" alt="user" src="https://res.cloudinary.com/getapet/image/upload/v1618902177/web%20sources/teamwork_jqxzg6.png"/></Link>
                    </div>
                    <h5 className="title-btn">I want to adopt!</h5>
                </div>
                <div className="row col-lg-4 justify-content-center">
                    <div className="img-position shadow">
                        <Link to="/registerShelter" ><img className="btn-image" alt="shelter" src="https://res.cloudinary.com/getapet/image/upload/v1618902177/web%20sources/animal-shelter_bz8fod.png"/></Link>
                    </div>
                    <h5 className="title-btn">I have pets for adoption</h5>
                </div>    
            </div>
        </div>

    );
}

export default SelectUser;