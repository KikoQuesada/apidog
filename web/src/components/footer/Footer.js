import { Link } from 'react-router-dom';
import "./Footer.css"


function Footer() {
    return (
        <footer className="footer-distributed">
            <div className="footer-left">
                <h3>Get a<span> Pet</span></h3>
                <p className="footer-links">
					<Link className="me-2" to="/pets">Pets</Link>
					<Link className="me-2" to="/shelters">Shelters</Link>
					<Link className="me-2" to="/contact">Contact</Link>
				</p>
				<p className="footer-company-name">Get a Pet © 2021</p>
			</div>

			<div className="footer-center">
				<div>
					<i className="fa fa-map-marker"></i>
					<p><span>Fake Street Nº123</span> Sevilla Sity Bro</p>
				</div>

				<div>
					<i className="fa fa-phone"></i>
					<p>+34 629 532 546</p>
				</div>

				<div>
					<i className="fa fa-envelope"></i>
					<p><a href="mailto:support@company.com">franciscoquesadacabello89@gmail.com</a></p>
				</div>
			</div>

			<div className="footer-right">
				<p className="footer-company-about">
					<span>About the company</span>
					Get a Pet is an start-up made to connect adopters, people who wants to adopt a pet, with shelters, the non lucrative associations who takes care of abandoned animals
				</p>

				<div className="footer-icons">

					<a href="/"><i className="fa fa-facebook"></i></a>
					<a href="/"><i className="fa fa-twitter"></i></a>
					<a href="/"><i className="fa fa-linkedin"></i></a>
					<a href="/"><i className="fa fa-github"></i></a>

				</div>
			</div>

		</footer>
    );
}

export default Footer;