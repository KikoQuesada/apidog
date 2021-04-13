import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Navbar from './components/nav/Navbar';
import Footer from './components/footer/Footer';
import "./App.css"
import Shelters from './screens/Shelters';
import Pets from './screens/Pets';
import PetDetail from './components/pets/pet-detail/PetDetail'
import ScrollToTop from './components/shared/ScrollToTop';


function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <div className="pt-4 pb-5 min-vh-100">
        <Switch>
          <Route exact path="/about" />
          <Route exact path="/shelters" component={Shelters}/>
          <Route exact path="/pets" component={Pets}/>
          <Route exact path="/pets/:id" component={PetDetail}/>
          <Route exact path="/contact" />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
