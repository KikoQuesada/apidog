
import { useState } from 'react';
import './ShelterForm.css';


/**
 * 
 {
        "city": [
            50,
            50
        ],
        "avatar": "https://res.cloudinary.com/getapet/image/upload/v1618040873/shelter_img/logo_1_su3vfc.jpg",
        "image": [],
        "name": "Defensa Felina",
        "email": "mhemstead0@geocities.com",
        "password": "JT7Ky16y",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum in felis a venenatis. Vivamus sodales elit consectetur turpis porta accumsan non vitae tellus. Etiam semper, erat sed commodo maximus, est leo faucibus lectus, eu tempor nibh nisl non tortor.",
        "phone": "664549474",
        "contact": "Martica Hemstead",
        "cif": "A34149454",
        "rol": "shelter",
    }
 * 
 */

function ShelterForm() {

    const [state, setState] = useState({
        name: ''
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setState((state, props) => ({
            ...state.shelter,
            [name]: value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const { name } = state;

    return (
        <div className="container">
            <div className="row">
                <form onSubmit={handleSubmit} className="col-6">
                    <div className="input-group mb-4 d-flex align-items-end">
                        <span><i className="fas fa-user fa-lg me-3"></i></span>
                        <input name="name" type="text" value={name} onChange={handleChange} placeholder="Name of your shelter" className="form-control form-control-underlined border-primary"/>
                    </div>
                </form>
            </div>
            
        </div>
        
    );


}

export default ShelterForm;