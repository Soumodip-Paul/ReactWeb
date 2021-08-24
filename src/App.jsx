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
import { About } from './Components/About';
import { BlogView } from './Components/items/BlogView';
import 'firebase/auth'
import './css/web.css'

const auth = firebaseApp.auth()

function App() {

const [currentUser, setcurrentUser] = useState(auth.currentUser)
auth.onAuthStateChanged(user=>setcurrentUser(user))
const [darkMode, setDarkMode] = useState(true)
const updateTheme = (booleanValue) =>   setDarkMode(booleanValue)

    return (
    <Router>
        <NavBar showSearch={false} darkMode={darkMode} onUpdateTheme={updateTheme}/>
        <Switch>
        <Route exact path="/">
            <Home darkMode={darkMode}/>
        </Route>
        <Route exact path="/login">
            <Login  currentUser={currentUser} darkMode={darkMode}/>
        </Route>
        <Route exact path="/signup">
            <SignUp  currentUser={currentUser} darkMode={darkMode}/>
        </Route>
        <Route exact path="/user/">
            <Redirect to={currentUser!=null?"./" + currentUser.uid:"/login"} darkMode={darkMode}/>
        </Route>
        <Route path="/user/:id">
            <User currentUser={currentUser} darkMode={darkMode}/>
        </Route>
        <Route exact path="/blog">
            <Blog currentUser={currentUser} darkMode={darkMode}/>
        </Route>
        <Route path="/blog/:id">
            <BlogView currentUser={currentUser} darkMode={darkMode}/>
        </Route>
        <Route path="/privacy-policy">
            <div style={{minHeight: "82.3vh"}} darkMode={darkMode}/>
        </Route>
        <Route path="/terms-and-conditions">
            <div style={{minHeight: "82.3vh"}} darkMode={darkMode}/>
        </Route>
        <Route path="/about">
            <About darkMode={darkMode}/>
        </Route>
        <Route>
            <PageNotFound darkMode={darkMode}/>
        </Route>
        </Switch>
        <ScrollTop darkMode={darkMode}/>
        <Footer darkMode={darkMode}/>
    </Router>
    );
}

export default App;
