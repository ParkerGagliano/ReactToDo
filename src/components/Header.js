import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({title, onAdd, showAdd}) => {
  return (
    <header className='header'>
        <h1>{title}</h1>
        <Button onClick={onAdd}color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close': 'Add'}/>
    </header>
  )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

Button.defaultProps = {
    color: 'steelblue'
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

//const headingStyle = {color: 'red', backgroundColor:'black'}
// You can have styles in a variable and use single curly to add in-line



export default Header