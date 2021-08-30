import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Dropdown = ({areaLabel,children,style,className}) => {
    return (
        <ul className={`${className} dropdown-menu`} style={style} aria-labelledby={areaLabel}>
            {children}
        </ul>
    )
}

export const DropdownItem = ({children}) => {
    return (<li><div className="dropdown-item ">{children}</div></li>)
} 

export const DropdownLink= ({children,to}) => {
    return (<li><Link className="dropdown-item" to={to}>{children}</Link></li>)
} 

export const DropdownDivider = () => {
    return <li><hr className="dropdown-divider" /></li>
}


Dropdown.propTypes = {
    areaLabel: PropTypes.string.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
}

DropdownLink.propTypes = {
    to: PropTypes.string.isRequired,
}

export default Dropdown


