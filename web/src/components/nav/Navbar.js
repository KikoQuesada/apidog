import { NavLink } from 'react-router-dom';
import './Navbar.css';


function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
            <div className="container">
                <NavLink to="/" ><img width="100" className="d-inline-block align-middle" src="https://res.cloudinary.com/getapet/image/upload/v1617819597/GetAPet_icon-02_d33hde.png" alt="getapet"/><img width="100" className="d-inline-block align-middle" src="https://res.cloudinary.com/getapet/image/upload/v1617819685/GetAPet_text-03_mdqzbr.png" alt="getapet-text" /></NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-navbar" aria-controls="main-navbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="main-navbar">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-5">
                        <li className="nav-item mx-3"><NavLink className="nav-link-font" to="/about">About Us</NavLink></li>
                        <li className="nav-item mx-3"><NavLink className="nav-link-font" to="/pets">Pets</NavLink></li>
                        <li className="nav-item mx-3"><NavLink className="nav-link-font" to="/shelters">Shelters</NavLink></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar