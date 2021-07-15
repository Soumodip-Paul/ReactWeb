import './css/web.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Home } from './Components/Home';
import { NavBar } from './Components/items/NavBar';
import { Footer } from './Components/Footer';
import { Login } from './Components/Login';
import { SignUp } from './Components/SignUp';
import { Profile } from './Components/Profile';
import { ScrollTop } from './Components/items/ScrollTop';


function App() {
  return (
    <Router>
      <NavBar/>
      <Switch>
        <Route exact path="/">
            <Home/>
        </Route>
        <Route exact path="/login">
            <Login />
        </Route>
        <Route exact path="/signup">
            <SignUp/>
        </Route>
        <Route exact path="/profile">
            <Profile/>
        </Route>
      </Switch>
      <ScrollTop/>
      <Footer/>
    </Router>
  );
}

export default App;
