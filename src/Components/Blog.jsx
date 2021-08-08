import React,{useState,useEffect} from 'react'
import firebaseApp from '../firebase/base'
import "firebase/firestore"
import { BlogItem } from './items/BlogItem';

const blogRef = firebaseApp.firestore().collection("blogs").orderBy("time","desc").limit(25);
export const Blog = () => {
    const [info , setInfo] = useState([])
    const [visibility, setvisibility] = useState("block")
    const [isError, setError] = useState(false)
    const [message, setMessage] = useState("")
  
    // Start the fetch operation as soon as
    // the page loads
    useEffect(() => {
        fetchdata()
    }, [])
  
    // Fetch the required data using the get() method
    const fetchdata = () => {
        blogRef.get().then((querySnapshot) => {
             
            // Loop through the data and store
            // it in array to display
            querySnapshot.forEach(element => {
                var data = element.data();
                setInfo(arr => [...arr , data]);
                  
            });
            setvisibility("none")
        }).catch(error => {
            setMessage(error.message)
            setError(true);
        })
    }
    const reFetch = () => {
        setMessage("")
        setError(false)
        setvisibility("block")
        fetchdata()
    }
    return (
        <div className="p-0 m-0" style={{minHeight: "82.3vh"}}>
            {!isError ? <div className="spinner-border text-success" role="status" 
            style={{
                display: visibility,
                position: "absolute",
                left: "45%",
                top: "45%"
            }}>
                <span className="visually-hidden">Loading...</span>
            </div> : 
            <div 
                style={{
                    display: visibility,
                    position: "absolute",
                    left: "0",
                    top: "45%",
                    width: "100%",
                    textAlign: "center",
                }}>
            <h4> Ooops! some error has  been occured </h4><br />
            <em>{message}</em><br />
            <button className="btn btn-outline-danger m-3" type="button" onClick={()=> reFetch()}>
                Reload
            </button>
            </div> }
            {info.map(i => (<BlogItem key={i.time} blog={i}/>))}
        </div>
    )
}