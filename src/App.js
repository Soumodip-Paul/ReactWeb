import './css/web.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Home } from './Components/Home';
import { NavBar } from './Components/items/NavBar';
import { Footer } from './Components/Footer';
import { Login } from './Components/Login';
import { SignUp } from './Components/SignUp';
import { User } from './Components/User';
import { ScrollTop } from './Components/items/ScrollTop';
import { Logout } from './Components/Logout';
import firebaseApp from './firebase/base';
import { useState } from 'react';

const auth = firebaseApp.auth()


function App() {

  const [currentUser, setcurrentUser] = useState(auth.currentUser)
  auth.onAuthStateChanged(user=>setcurrentUser(user))

  return (
    <Router>
      <NavBar/>
      <Switch>
        <Route exact path="/">
            <Home/>
        </Route>
        <Route exact path="/login">
            <Login  currentUser={currentUser}/>
        </Route>
        <Route exact path="/signup">
            <SignUp  currentUser={currentUser}/>
        </Route>
        <Route exact path="/logout">
            <Logout currentUser={currentUser}/>
        </Route>
        <Route path="/user">
            <User currentUser={currentUser}/>
        </Route>
        <Route path="/privacy-policy">
            <></>
        </Route>
        <Route path="/terms-and-conditions">
            <></>
        </Route>
      </Switch>
      <ScrollTop/>
      <Footer/>
    </Router>
  );
}

export default App;
