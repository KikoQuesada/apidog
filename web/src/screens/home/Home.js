import Header from './header/Header';
import Sec1 from './section1/Sec1';
import Sec2 from './section2/Sec2';
import Sec3 from './section3/Sec3';
import './Home.css'


function Home() {
    return(
        <div className="home-wrapper">
          <Header />
          <Sec1 />
          <Sec2 />
          <Sec3 />
        </div>
    );
}

export default Home;