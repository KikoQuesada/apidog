import { Container, Row, Col } from 'reactstrap';
import './Sec3.css';

function Sec3() {
    return (
        <section className="s3">
    <Container>
      <div className="s3__titles">
        <h1>Get a Pet Team</h1>
        <h4>Web Developers and Animal Lovers</h4>
      </div>
      <Row className="row justify-content-center">
        <Col md="6" lg="3">
          <div className="s3__frame">
            <img
              src="https://res.cloudinary.com/getapet/image/upload/v1618993036/WhatsApp_Image_2017-12-19_at_09.19.40_pslbzm.jpg"
              alt=""
            />
            <div className="s3__in-out-alert">
              <div className="s3__social-icons">
                <i className="fab fa-facebook-f" />
                <i className="fab fa-twitter" />
                <i class="fab fa-linkedin-in" />
              </div>
              <h3>Web Developer and Pubs Tester</h3>
              <h3>Kiko Quesada</h3>
            </div>
          </div>
        </Col>
        <Col md="6" lg="3">
          <div className="s3__frame">
            <img
              src="https://res.cloudinary.com/getapet/image/upload/v1618992824/Goku_phecim.png"
              alt=""
            />
            <div className="s3__in-out-alert">
              <div className="s3__social-icons">
                <i className="fab fa-facebook-f" />
                <i className="fab fa-twitter" />
                <i class="fab fa-linkedin-in" />
              </div>
              <h3>CEO and Naps Manager</h3>
              <h3>Goku</h3>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
    );
}

export default Sec3