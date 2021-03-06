import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Home } from './Components/pages/Home';
import { NavBar } from './Components/items/NavBar';
import { Footer } from './Components/pages/Footer';
import { Login } from './Components/pages/Login';
import { SignUp } from './Components/pages/SignUp';
import { User } from './Components/pages/User';
import { ScrollTop } from './Components/utils/ScrollTop';
import { useContext, useState } from 'react';
import { Blog } from './Components/pages/Blog';
import { PageNotFound } from './Components/pages/404';
import { About } from './Components/pages/About';
import { BlogView } from './Components/pages/BlogView';
import { UploadBlog } from './Components/pages/UploadBlog';
import { getUserDetail } from './model/User';
import { Verify } from './Components/pages/verify';
import { Pricing } from './Components/pages/Pricing';
import { Darkmode } from './context/Background';
import LoadingBar from 'react-top-loading-bar'
import firebaseApp from './firebase/base';
import 'firebase/auth'

const auth = firebaseApp.auth()

function App() {

    const [currentUser, setcurrentUser] = useState(auth.currentUser)
    const [progress, setProgress] = useState(0)
    const [admin, setAdmin] = useState(false)
    const darkMode = useContext(Darkmode).mode
    const checkIsAdmin = async (uid) => {
        try {
            let doc = await getUserDetail(uid)
            if (doc.exists) setAdmin(doc.data().isAdmin)
            else setAdmin(false)
        }
        catch (e) {
            setAdmin(false)
        }
    }
    auth.onAuthStateChanged(user => {
        if (user == null) setAdmin(false)
        else {
            checkIsAdmin(user.uid)
        }
        setcurrentUser(user)
    })

    return (
        
        <Router>
            <LoadingBar height={darkMode ? 2 : 3} color={darkMode ? '#0dcaf0' : '#35f370'} progress={progress} onLoaderFinished={() => setProgress(0)} />
            <NavBar currentUser={currentUser} showSearch={false} admin={admin} />
            <div style={{ minHeight: "82.3vh" }} className={`bg-${darkMode ? "secondary" : "white"} text-${darkMode ? "light" : "dark"}`}>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/login">
                        <Login currentUser={currentUser} />
                    </Route>
                    <Route exact path="/signup">
                        <SignUp currentUser={currentUser} />
                    </Route>
                    <Route exact path="/user/">
                        <Redirect to={currentUser != null ? "./" + currentUser.uid : "/login"} />
                    </Route>
                    <Route path="/user/:id">
                        <User currentUser={currentUser} />
                    </Route>
                    <Route exact path="/blog">
                        <Blog currentUser={currentUser} setProgress={setProgress} />
                    </Route>
                    <Route path="/blog/:id">
                        <BlogView currentUser={currentUser} setProgress={setProgress} darkMode={darkMode} />
                    </Route>
                    <Route exact path="/privacy-policy">
                        <div className="container p-5">Sample Privacy Policy page</div>
                    </Route>
                    <Route exact path="/terms-and-conditions">
                        <div className="container p-5">Sample Terms and conditions page</div>
                    </Route>
                    <Route exact path="/about">
                        <About />
                    </Route>
                    <Route exact path="/pricing">
                        <Pricing />
                    </Route>
                    { !currentUser &&<Route exact path="/verify">
                       <Verify />
                    </Route>}
                    <Route exact path="/create" render={() => {
                        if (admin) return <UploadBlog />
                        else return <PageNotFound />
                    }}>
                    </Route>
                    <Route>
                        <PageNotFound />
                    </Route>
                </Switch>
            </div>
            <SignUp currentUser={currentUser} />
            <Login currentUser={currentUser} />
            <ScrollTop />
            <Footer />
        </Router>
    );
}

export default App;
