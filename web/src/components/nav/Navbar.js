import { NavLink, useHistory } from 'react-router-dom';
import { useContext, Fragment} from 'react';
import { logout } from '../../services/users-service';
import { AuthContext } from '../../contexts/AuthStore';
import './Navbar.css';


function Navbar() {

    const { user, isAuthenticated, onUserChange } = useContext(AuthContext);
    const history = useHistory();

    async function handleLogout() {
        await logout();
        onUserChange(undefined);
        history.push('/login');
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-4">
            <div className="container">
                <NavLink to="/" ><img width="100" className="d-inline-block align-middle" src="https://res.cloudinary.com/getapet/image/upload/v1617819597/GetAPet_icon-02_d33hde.png" alt="getapet"/><img width="100" className="d-inline-block align-middle" src="https://res.cloudinary.com/getapet/image/upload/v1617819685/GetAPet_text-03_mdqzbr.png" alt="getapet-text" /></NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-navbar" aria-controls="main-navbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="main-navbar">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-5">
                        <li className="nav-item mx-3"><NavLink className="nav-link-font" to="/pets">Pets</NavLink></li>
                        <li className="nav-item mx-3"><NavLink className="nav-link-font" to="/shelters">Shelters</NavLink></li>
                        <li className="nav-item mx-3"><NavLink className="nav-link-font" to="/contact">Contact Us</NavLink></li>
                    </ul>
                    <ul className="align-items-center navbar-nav me-auto mb-2 mb-lg-0 mx-5">
                        {!isAuthenticated() && (
                            <Fragment>
                                <li className="nav-item mx-3"><NavLink className="nav-link-font" to="/register">Register</NavLink></li>
                                <li className="nav-item mx-3"><NavLink className="nav-link-font" to="/login">Login</NavLink></li>
                            </Fragment>
                        )}
                        {isAuthenticated() && (
                            <Fragment>
                                <li className="nav-item mx-3"><NavLink className="nav-link-font" to={`/${user.rol === 'shelter' ? 'shelters' : 'adopters'}/${user.id}`}>{user.name}</NavLink></li>
                                <li className="nav-item mx-3"><button className="d-flex flex-row btn btn-danger" onClick={handleLogout}><i className="fas fa-sign-out-alt"><span>LogOut</span> </i></button></li>
                            </Fragment>
                        )}   
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar