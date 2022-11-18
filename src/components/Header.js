import PropTypes from 'prop-types'
import { useLocation } from 'react-router'
import Button from './Button'

const Header = ({ title, onToggle, showAddTask }) => {
    const location = useLocation();

    return (
        <header className="header">
            <h1>{title}</h1>
            {location.pathname === '/' && (
                <Button 
                color={showAddTask ? 'red' : 'green'}  
                text={showAddTask ? 'Close' : 'Add'} 
                onClick={onToggle} 
                />
            )}
        </header>
    )
}

Header.defaultProps = {
    title: 'Default Title'
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

// CSS in JS
// const HeadingStyle = {
//     color:'red', 
//     backgroundColor: 'black'
// }

export default Header;