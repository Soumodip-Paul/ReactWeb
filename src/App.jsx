import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Home } from './Components/pages/Home';
import { NavBar } from './Components/items/NavBar';
import { Footer } from './Components/pages/Footer';
import { Login } from './Components/pages/Login';
import { SignUp } from './Components/pages/SignUp';
import { User } from './Components/pages/User';
import { ScrollTop } from './Components/utils/ScrollTop';
import { useState } from 'react';
import { Blog } from './Components/pages/Blog';
import { PageNotFound } from './Components/pages/404';
import { About } from './Components/pages/About';
import { BlogView } from './Components/pages/BlogView';
import { UploadBlog } from './Components/pages/UploadBlog';
import LoadingBar from 'react-top-loading-bar'
import firebaseApp from './firebase/base';
import 'firebase/auth'
import './css/web.css'

const auth = firebaseApp.auth()

function App() {

const [currentUser, setcurrentUser] = useState(auth.currentUser)
const [darkMode, setDarkMode] = useState(true)
const [progress, setProgress] = useState(0)
const updateTheme = (booleanValue) =>   setDarkMode(booleanValue)
auth.onAuthStateChanged(user=>setcurrentUser(user))

    return (
    <Router>
        <LoadingBar height={darkMode?2:3} color={darkMode?'#0dcaf0':'#35f370'} progress={progress} onLoaderFinished={() => setProgress(0)}/>
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
            <Blog currentUser={currentUser} setProgress={setProgress} darkMode={darkMode}/>
        </Route>
        <Route path="/blog/:id">
            <BlogView currentUser={currentUser} darkMode={darkMode}/>
        </Route>
        <Route exact path="/privacy-policy">
            <div style={{minHeight: "82.3vh"}}/>
        </Route>
        <Route exact path="/terms-and-conditions">
            <div style={{minHeight: "82.3vh"}}/>
        </Route>
        <Route exact path="/about">
            <About darkMode={darkMode}/>
        </Route>
        <Route exact path="/create">
            <UploadBlog darkMode={darkMode}/>
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
