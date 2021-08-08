import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import { Home } from './Components/Home';
import { NavBar } from './Components/items/NavBar';
import { Footer } from './Components/Footer';
import { Login } from './Components/Login';
import { SignUp } from './Components/SignUp';
import { User } from './Components/User';
import { ScrollTop } from './Components/items/ScrollTop';
import firebaseApp from './firebase/base';
import { useState } from 'react';
import { Blog } from './Components/Blog';
import { PageNotFound } from './Components/404';
import 'firebase/auth'
import './css/web.css'

const auth = firebaseApp.auth()

function App() {

const [currentUser, setcurrentUser] = useState(auth.currentUser)
auth.onAuthStateChanged(user=>setcurrentUser(user))

    return (
    <Router>
        <NavBar showSearch={false}/>
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
        <Route exact path="/user/">
            <Redirect to={currentUser!=null?"./" + currentUser.uid:"/login"}/>
        </Route>
        <Route path="/user/:id">
            <User currentUser={currentUser}/>
        </Route>
        <Route path="/blog">
            <Blog currentUser={currentUser}/>
        </Route>
        <Route path="/privacy-policy">
            <div style={{minHeight: "82.3vh"}} />
        </Route>
        <Route path="/terms-and-conditions">
        <div style={{minHeight: "82.3vh"}} />
        </Route>
        <Route>
            <PageNotFound/>
        </Route>
        </Switch>
        <ScrollTop/>
        <Footer/>
    </Router>
    );
}

export default App;
