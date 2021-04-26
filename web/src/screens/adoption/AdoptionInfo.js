import './AdoptionInfo.css'
import { Link } from 'react-router-dom';

function AdoptionInfo() {
    return (
        <section className="container">
            <div className="d-flex flex-column justify-content-center align-items-center">
                <picture>
                    <img className="adoptionInfo-img" alt="adoption-info" src="https://res.cloudinary.com/getapet/image/upload/v1617819597/GetAPet_icon-02_d33hde.png"/>
                </picture>
                <article className="d-flex flex-column justify-content-center align-items-center">
                    <h4 className="adoptionInfo-title">Before starting the Adoption Form</h4>
                    <p className="adoptionInfo-text text-center">The Adoption Form is a document that the shelters use to evaluate your suitability to adopt a pet. According to your answers 
                        in this Adoption Form a shelter may prevent you from adopting any of its pets, so follow the next recommendations BEFORE starting
                        the Adoption Form.
                    </p>
                </article>
                <article>
                    <h5>Recommendations:</h5>
                    <ul className="adoptionInfo-text">
                        <li className="mb-3"><i className="me-2 fas fa-desktop"></i>Use your desktop, instead of your mobile phone or tablet to complete the Adoption Form</li>
                        <li className="mb-3"><i className="me-2 fas fa-stopwatch"></i>Choose a time of the day when you have between 20-30 minutes to spare</li>
                        <li className="mb-3"><i className="me-2 fas fa-comment-slash"></i>Choose a calm and quite place without distractions</li>
                        <li className="mb-3"><i className="me-2 fas fa-brain"></i>Think carefully about your answer and be sincere because once you submit the form, you CAN'T change the answers</li>
                        <li className="mb-3"><i className="me-2 fas fa-user"></i>Just be yourself!</li>
                    </ul>
                </article>
                <Link className="btn go-adoption-btn" to="/adoptionForm">Let's Start!</Link>
            </div>
        </section>
    );
}

export default AdoptionInfo;