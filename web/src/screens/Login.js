import LoginForm from '../components/LoginForm';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="row">
      <div className="container d-flex justify-content-center">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;