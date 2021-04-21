import './Header.css'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header>
      <div className="intro-logo jumbo-bg">
        <h1><span>Get a</span> Pet</h1>
        <h3>Your app for lovely adoptions</h3>
        <img
          className="w-25"
          src="https://res.cloudinary.com/getapet/image/upload/v1617819597/GetAPet-01_jousy0.png"
          alt="GetaPet"
        />
        <div className="intro-button">
          <Link to="/register">Get Started</Link>
        </div>
        <div className="company-icons">
          <span className="company-icons__item">
            <i className="fab fa-apple" />
            app store
          </span>
          <span className="company-icons__item">
            <i className="fab fa-google-play" />
            google play
          </span>
          <span className="company-icons__item">
            <i className="fab fa-windows" />
            windows
          </span>
        </div>
      </div>
    </header>
    );
}

export default Header;