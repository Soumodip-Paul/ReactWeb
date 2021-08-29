import React from 'react'

const openDialog = (link) => { window.open(link, 'windowName', 'width=550, height=650, left=24, top=24, scrollbars, resizable'); return false; };

export const Tweet = ({ url, subject }) => {
    let link = `https://twitter.com/intent/tweet?url=${url}&amp;text=${encodeURI(subject != null ? subject : "Tweet")}`;
    return (
        <>
            <a className="text-decoration-none" rel="noreferrer" target="_blank" href={link} onClick={() => openDialog(link)}>
                <span style={{ color: '#fff', backgroundColor: '#1d9bf0', display: 'inline-flex' }} className="rounded-3 p-1 m-1">
                    <img src="/assets/svg/twitter.svg" className="m-0 p-0" alt="twitter" />
                </span>
            </a>
        </>
    )
}

export const FaceBookPost = ({ url }) => {
    let link = `https://www.facebook.com/sharer/sharer.php?u=${encodeURI(url)}&amp;src=sdkpreparse`;
    return (
        <a className="text-decoration-none" rel="noreferrer" target="_blank" href={link} onClick={() => openDialog(link)}><span style={{ color: '#fff', backgroundColor: '#365899' }} className="material-icons material-icons-outlined  rounded-3 p-1 m-1">facebook</span></a>
    )
}
export const MailTo = ({ subject, url }) => {
    let link = `mailto:?subject=${encodeURI(subject)}&amp;body=${encodeURI(url)}`;
    return (
        <a className="text-decoration-none" rel="noreferrer" target="_blank" href={link} onClick={() => openDialog(link)}><span style={{ color: '#fff', backgroundColor: '#ea4335' }} className="material-icons material-icons-outlined  rounded-3 p-1 m-1">mail</span></a>
    )
}
export const LinkedIn = ({ url }) => {
    let link = `https://www.linkedin.com/shareArticle?url=${encodeURI(url)}`;
    return (
        <a className="text-decoration-none" rel="noreferrer" target="_blank" href={link} onClick={() => openDialog(link)}>
            <span style={{ color: '#fff', backgroundColor: '#0a66c2', display: 'inline-grid' }} className="rounded-3 p-1 m-1">
                <img src="/assets/svg/linkedin.svg" alt="Linked in" className="m-0 p-0" />
            </span>
        </a>
    )
}
export const CopyLink = ({ url }) => {
    //let link = `https://www.linkedin.com/shareArticle?url=${encodeURI(url)}`;
    return (
        <span className="text-decoration-none" onClick={() => navigator.clipboard.writeText(url)}><span style={{ color: '#fff', backgroundColor: '#155ee9', cursor: 'pointer' }} className="material-icons material-icons-outlined  rounded-3 p-1 m-1">link</span></span>
    )
}
export const WhatsApp = ({ subject, url }) => {
    let link = `https://web.whatsapp.com/send?text=${encodeURI(subject)} ${encodeURI(url)}`;
    return (
        <a className="text-decoration-none" rel="noreferrer" target="_blank" href={link} onClick={() => openDialog(link)}><span style={{ color: '#fff', backgroundColor: '#00e676' }} className="material-icons material-icons-outlined  rounded-3 p-1 m-1">
            whatsapp
        </span></a>
    )
}

const ShareUtils = ({ subject, url }) => {
    return (
        <div className="w-100 p-2 m-0 text-center">
            <FaceBookPost url={url} />
            <WhatsApp url={url} subject={subject} />
            <Tweet url={url} subject={subject} />
            <MailTo url={url} subject={subject} />
            <LinkedIn url={url} />
            <CopyLink url={url} />
        </div>
    )
}

export default ShareUtils;
