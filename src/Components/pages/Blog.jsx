import React, { useState, useEffect } from 'react'
import { BlogItem } from '../items/BlogItem';
import { getBlog } from '../../model/BlogClass';

// const blogRef = firebaseApp.firestore().collection("blogs").orderBy("time", "desc").limit(25);
export const Blog = ({ darkMode, setProgress }) => {
    const [info, setInfo] = useState([])
    const [visibility, setvisibility] = useState("block")
    const [isError, setError] = useState(false)
    const [message, setMessage] = useState("")
    const backGround = `bg-${darkMode ? "secondary" : "white"}`
    const textColor = `text-${darkMode ? "light" : "dark"}`
    const color = `${darkMode ? "warning" : "success"}`

    // Start the fetch operation as soon as
    // the page loads
    useEffect(() => {
        fetchdata(setProgress)
    }, [setProgress])

    // Fetch the required data using the get() method
    const fetchdata = (setProgress) => {
        setProgress(20)

        let j = 0;
        getBlog().then((querySnapshot) => {
            setProgress(50)
            // Loop through the data and store
            // it in array to display
            querySnapshot.forEach(element => {
                var data = element.data();
                setInfo(arr => [...arr, data]);
                j++;
            });
            for (let i = 50; i < 90; i += 40 / j) setTimeout(setProgress(i), 300);
            setProgress(100)
            setvisibility("none")
        }).catch(error => {
            setMessage(error.message)
            setError(true);
            setProgress(100)
        })
    }
    const reFetch = () => {
        setMessage("")
        setError(false)
        setvisibility("block")
        fetchdata()
    }
    return (
        <div className={`p-0 m-0 ${backGround} ${textColor}`} >
            {!isError ? <div className={"spinner-border text-" + color} role="status"
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
                    <em className="text-break">{message}</em><br />
                    <button className="btn btn-outline-danger m-3" type="button" onClick={() => reFetch()}>
                        Reload
                    </button>
                </div>}
            {info.map(i => (<BlogItem darkTheme={{ backGround: backGround, textColor: textColor, color: color }} key={i.time} blog={i} />))}
        </div>
    )
}
