import { useState, useEffect, useContext, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { tinyOptions } from '../utils/TextUtils'
import { uploadBlog } from '../../model/BlogClass'
import { Darkmode } from '../../context/Background';

export const UploadBlog = () => {
    const darkMode = useContext(Darkmode).mode
    const backGround = `bg-${darkMode ? "secondary" : "white"}`
    const textColor = `text-${darkMode ? "light" : "dark"}`
    const [title, setTitle] = useState("")
    const [link, setlink] = useState("")
    const [warning, setWarning] = useState(<></>)
    const editorRef = useRef(null);
    const log = (e) => {
        e.preventDefault()
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    useEffect(() => {
        document.title = (title !== "" ? title : "") + " Cool Developer Bangla"
    }, [title])

    const updateWarning = (alert) => {
        if (link.length !== 0) {
            if (alert == null) setWarning(<></>);
            else if (alert === "success") setWarning(<div className="text-success">This name is available</div>);
            else if (alert === "fail") setWarning(<div className="text-danger">This name is not available</div>);
        }
        else setWarning(<></>)
        return link.length !== 0 && alert === "success";
    }

    const submit = (e, isDraft) => {
        e.preventDefault();
        const text = editorRef.current ? editorRef.current.getContent() : ''
        if (text !== '' && title !== '' && link !== '') {
            uploadBlog(title, `${text}`, link, Date.now(), isDraft);
            setTitle('');
            updateWarning(null);
            setlink('');
        }
    }
    const onChange = (e, changeMethod) => {
        changeMethod(e.target.value)
    }
    return (
        <div className={`p-0 m-0 blog-container ${backGround} ${textColor}`}>
            <form  onSubmit={e => { submit(e, false) }} className={`p-3  ms-0 ${backGround} ${textColor}`} >
                <div className="form-group form-floating w-100">
                    <input type="text" className="form-control" id="linkInput" placeholder="Link" value={link}
                        onChange={e => { updateWarning(null); setlink(e.target.value); }} onBlur={() => updateWarning("success")} />
                    <label htmlFor="linkInput" className={darkMode ? "text-dark" : ""}>Link</label>
                </div>
                <div className="p-0 m-0" style={{ height: '30px' }}></div>
                <div className="form-group w-100">
                    <Editor
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue="<p>This is the initial content of the editor. </p>"
                        init={tinyOptions()}
                    />
                </div>

                <div className="p-0 m-0" style={{ height: '30px' }}>{warning}</div>

                <div className="form-group form-floating w-100">
                    <input type="text" className="form-control" id="Title" placeholder="Title" value={title} onChange={e => (onChange(e, setTitle))} />
                    <label htmlFor="Title" className={darkMode ? "text-dark" : ""}>Title</label>
                </div>



                <button type="submit" className="btn btn-primary m-2" >Submit</button>
                <button className="btn btn-primary m-2" onClick={log}>Log editor content</button>
                <button type="button" className="btn btn-success m-2" onClick={e => submit(e, true)}>Save As Draft</button>
            </form>

            {/* <div className={` ${backGround} ${textColor} no-scrollbar`}
                style={{ height: '82.3vh', overflow: 'auto' }}>

                <h1 style={{ fontFamily: "'Roboto',serif" }}
                    className={`px-2 pt-2 pb-0 m-0 w-100 fw-bolder text-center  ${backGround} ${textColor}`}>
                    {title.length === 0 ? "Your Title" : title.toLocaleUpperCase()}
                </h1>

                <hr className={`bg-${darkMode ? "light" : "dark"}`} style={{ padding: "1px" }} />
                <div className={`px-4  fs-6 p-0 m-0 w-100 text-end fst-italic ${backGround} ${textColor}`} style={{ fontFamily: "'Caveat',serif" }}>&#8212; {new Date().toDateString()}</div>
                <p className={`px-4  fs-5 pt-2 pb-4 m-0 ${backGround} ${textColor}`} style={{ fontFamily: "'Roboto Slab',serif" }} dangerouslySetInnerHTML={{ __html: renderAll(text) }}>
                </p>

            </div> */}
        </div>
    )
}
