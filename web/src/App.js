import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Navbar from './components/nav/Navbar';
import Footer from './components/footer/Footer';
import "./App.css"
import Shelters from './screens/Shelters';
import ShelterDetail from './components/shelters/shelter-detail/ShelterDetail';
import Pets from './screens/Pets';
import PetDetail from './components/pets/pet-detail/PetDetail'
import ScrollToTop from './components/shared/ScrollToTop';
import SelectUser from './screens/SelectUser';
import ShelterForm from './components/shelters/shelter-form/ShelterForm';
import Login from './screens/Login';
import AuthStore from './contexts/AuthStore';
import Home from './screens/home/Home';

function App() {
  return (
    <Router>
      <AuthStore>
      <ScrollToTop />
      <Navbar />
      <div className="pt-4 pb-5 min-vh-100">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" />
          <Route exact path="/shelters" component={Shelters}/>
          <Route exact path="/shelters/:id" component={ShelterDetail}/>
          <Route exact path="/pets" component={Pets}/>
          <Route exact path="/pets/:id" component={PetDetail}/>
          <Route exact path="/contact" />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={SelectUser} />
          <Route exact path="/registerShelter" component={ShelterForm} />
          <Route exact path="/registerUser" />
        </Switch>
      </div>
      <Footer />
      </AuthStore>
    </Router>
  );
}

export default App;
