import { Container, Row, Col } from 'reactstrap'

import './Sec1.css'

function Sec1() {
    return (
        <section className="s1">
      <Container>
        <Row>
          <Col md="12" className="text-center s1-intro">
            <h2>Simple system to adopt a pet or to get your pets adopted</h2>
            <h3>Shelters and particular are welcome here!</h3>
          </Col>
          <Col md="6" lg="4" className="text-center s1-advice">
            <img
              className="s1-avatar me-4"
              src="https://res.cloudinary.com/getapet/image/upload/v1618902177/web%20sources/animal-shelter_bz8fod.png"
              alt="shelter"
            />
            <img
              className="s1-avatar"
              src="https://res.cloudinary.com/getapet/image/upload/v1618902177/web%20sources/teamwork_jqxzg6.png"
              alt="user"
            />
            <h3>Register Yourself</h3>
            <p>
              Either your a particular who wants to give love or your are a shelter who wants to search for a home to your animals
            </p>
            
          </Col>
          <Col md="6" lg="4" className="text-center s1-advice">
            <img
              className="s1-avatar"
              src="https://res.cloudinary.com/getapet/image/upload/v1618949993/web%20sources/pet_zr6far.png"
              alt="pets"
            />
            <h3>Search for the perfect Forever Friend</h3>
            <p>
             You can navigate through our list of pets ready to receive love, or you can upload the profiles of your animals, if you are a shelter  
            </p>
            
          </Col>
          <Col md="6" lg="4" className="text-center s1-advice">
            <img
              className="s1-avatar"
              src="https://res.cloudinary.com/getapet/image/upload/v1618950109/web%20sources/clipboard_av2nua.png"
              alt=""
            />
            <h3>Lets connect!</h3>
            <p>
              Thanks to our app, users and shelters can send and receive the adoption forms, in order to formalize the adoption process
            </p>
            
          </Col>
        </Row>
      </Container>
    </section>
    );
}

export default Sec1;