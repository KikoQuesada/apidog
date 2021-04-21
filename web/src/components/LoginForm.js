import './LoginForm.css';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router';
import { login } from '../../src/services/users-service';
import { AuthContext } from '../contexts/AuthStore';

function LoginForm() {
    const { onUserChange } = useContext(AuthContext);
    const location = useLocation();
    const history = useHistory();

    const [state, setState] = useState({
        user: {
            email: location.state?.email || '',
            password: ''
        },
        errors: {}
    })


    const handleChange = (event) => {
        const { name, value } = event.target;
        setState(state => ({
            ...state,
            user: {
                ...state.user,
                [name]: value
            },
            errors: {}
        }))
    }


    const handleSubmit = async (event) => {
        event.preventDefault()
    
        try {
          const user = await login(state.user.email, state.user.password);
          onUserChange(user);
          history.push('/');
        } catch (error) {
          const { message, errors } = error.response ? error.response.data : error;
          console.error(message);
          setState(state => ({
            ...state,
            errors: errors
          }))
        }
      } 

      const { user, errors } = state;

    return (
        <div className="container d-flex justify-content-center">
            <form className="login shadow col-lg-4 col-md-8 col-sm-12" onSubmit={handleSubmit}>
                <div className="input-group mb-4 d-flex justify-content-center align-items-end">
                    <span><i className="fas fa-user fa-lg me-3"></i></span>
                    <input type="text" placeholder="Email..." onChange={handleChange} className={`w-75 login-form-control login-form-control-underlined ${errors.email ? 'is-invalid' : ''}`}/>
                    <div className="invalid-feedback"></div>
                </div>
                <div className="input-group mb-4 d-flex justify-content-center align-items-end">
                    <span><i className="fas fa-lock fa-lg me-3"></i></span>
                    <input type="password" placeholder="Password..." onChange={handleChange} className='w-75 login-form-control login-form-control-underlined border-primary '/>
                    <div className="invalid-feedback"></div>
                </div>
                <div className="justify-content-center">
                    <button className="mt-5 btn login-btn"><Link className="login-btn-link" to='/register'>Register</Link></button>
                    <button className="mt-5 btn login-btn" type="submit">Login</button>
                </div>
                
            </form>
        </div>
    ); 
}

export default LoginForm;