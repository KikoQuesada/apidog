import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/nav/Navbar';
import Footer from './components/footer/Footer';
import "./App.css"
import Shelters from './screens/Shelters';


function App() {
  return (
    <Router>
      <Navbar />
      <div className="container pt-4 pb-5">
        <Switch>
          <Route exact path="/about" />
          <Route exact path="/shelters" component={Shelters}/>
          <Route exact path="/pets" />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
