import React from 'react'
import Accordion , { AccordionItem } from '../items/Accordion'

export const About = ({darkMode}) => {
    const text1 = <><strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.</>
    const text2 = <><strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.</>
    const text3 = <><strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.</>
    return (
        <div style={{minHeight: "82.3vh"}} className={`accordion bg-${darkMode?"secondary":"white"}`}>
            <Accordion darkMode={darkMode}>
                <AccordionItem parent="accordionExample" header="A1" content={text1} id="a" expanded darkMode={darkMode}/>
                <AccordionItem parent="accordionExample" header="A2" content={text2} id="b" darkMode={darkMode}/>
                <AccordionItem parent="accordionExample" header="A3" content={text3} id="c" darkMode={darkMode}/>
            </Accordion>
        </div>
    )
}
