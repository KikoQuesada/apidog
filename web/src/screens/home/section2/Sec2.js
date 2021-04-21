import { Container, Row, Col } from 'reactstrap';
import './Sec2.css';

function Sec2() {
    return (
<section className="s2">
    <Container>
      <Row className="flex-align">
        <Col md="5" lg="3" className="s2__mob-pic">
          <img
            src="https://bootstrapmade.com/demo/themes/eStartup/img/about-img.png"
            alt="adoption form"
          />
        </Col>
        <Col md="7" lg="5" className="s2__des">
          <h2>
            <span className="bold">UNIQUE</span> Adoption Form
          </h2>
          <p>
            As adopter, you can fill your adoption form only once and keep it in your Get a Pet profile. As shelter you can
            read all the adoption form the users interested in the animals you have for adoption.
          </p>
          <ul className="s2__list">
            <li><i className="fas fa-paw"></i>  Friendly user interface</li>
            <li><i className="fas fa-paw"></i>  easy to use</li>
            <li><i className="fas fa-paw"></i>  Helpful for users to adopt pets</li>
            <li><i className="fas fa-paw"></i>  Helpful for shelters to evaluate the user candidates</li>
            <li><i className="fas fa-paw"></i>  The most benefited, the animals </li>
          </ul>
        </Col>
      </Row>
    </Container>
  </section>
    );
}

export default Sec2