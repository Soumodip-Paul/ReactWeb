import React from 'react'
import PropTypes from 'prop-types'

const Accordion = (props) => {
    return (
        <div className={`accordion bg-${props.darkMode?"secondary":"white"}`} id="accordionExample">
            {props.children}
        </div>
    )
}

export const AccordionItem = ({header,content,parent,id,expanded,darkMode}) => {
    const backGround = `bg-${darkMode?"secondary":"white"}`
    const textColor = `text-${darkMode?"light":"dark"}`
    return (
        <div className="accordion-item">
            <h2 className="accordion-header " id={id}>
                <button className={`accordion-button ${!expanded? "collapsed": ''} ${backGround+' '+textColor}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${id}`} aria-expanded={expanded?"true":"false"} aria-controls={`collapse${id}`}>
                    {header}
                </button>
            </h2>
            <div id={`collapse${id}`}className={`accordion-collapse collapse ${expanded?"show":''} ${backGround+' '+textColor}`} aria-labelledby={id} data-bs-parent={`#${parent}`}>
                <div className="accordion-body">
                    {content}
                </div>
            </div>
        </div>
    )
}

AccordionItem.defaultProps = {
    expanded : false
}

AccordionItem.propTypes = {
    expanded : PropTypes.bool
}
export default Accordion;