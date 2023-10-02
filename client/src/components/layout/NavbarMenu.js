import {
    Navbar,
    Nav,
    Button
} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import LearnItLogo from '../../assests/logo.svg'
import logOutLogo from '../../assests/logout.svg'
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import SearchCourse from './SearchCourse';

const NavbarMenu = () => {
    const {
        authState: {
            user: {
                username
            }
        },
        logoutUser
    } = useContext(AuthContext)
    
    return (
        <Navbar bg='primary' variant='dark' className='shadow'>
            <Navbar.Brand className='
                d-flex
                align-items-center
                mr-2
            '>
                <img 
                    src={LearnItLogo} 
                    width='32' 
                    height='32' 
                    alt="logo"
                />
                LearnIt
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse className='
                f-flex 
                justify-content-between
            '>
                <Nav>
                    <Nav.Link to='/dashboard' as={Link} >
                        Dashboard
                    </Nav.Link>
                    <Nav.Link to='/about' as={Link}  >
                        About
                    </Nav.Link>
                </Nav>
                <Nav>
                    <SearchCourse />
                </Nav>
                <Nav className='mr-2'>
                    <Nav.Link className='text-white'>
                        Welcome {username}
                    </Nav.Link>
                    <Button onClick={() => logoutUser()}>
                        <img src={logOutLogo} alt="logout"/>
                        Logout
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavbarMenu;