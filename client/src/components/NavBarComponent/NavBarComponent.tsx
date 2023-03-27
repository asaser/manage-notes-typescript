import { Container, Nav, Navbar } from "react-bootstrap";
import { UserModel } from "../../models/userModel";
import NavBarLoginComponent from "./NavBarLoginComponent";
import NavBarLogoutComponent from "./NavBarLogoutComponent";
import { Link } from "react-router-dom";

interface NavBarProps {
    loggedUser: UserModel | null,
    onSignUpClick: () => void,
    onLoginClick: () => void,
    onLogoutClick: () => void,
}


// Todo po nacisnieciu REFRESH ylogowuje sie automatycznie

const NavBarComponent = ({ loggedUser, onSignUpClick, onLoginClick, onLogoutClick}: NavBarProps) => {
    return ( 
        <Navbar bg="primary" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to='/'>
                    Notes app
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="mobile-navbar" />
                <Navbar.Collapse id="mobile-navbar">
                    <Nav>
                        <Nav.Link as={Link} to='/privacy'>
                            Privacy
                        </Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        { 
                            loggedUser ? 
                                <NavBarLoginComponent user={loggedUser} onLogoutSuccess={onLogoutClick} />
                                :
                                <NavBarLogoutComponent onSignUpClick={onSignUpClick} onLoginClick={onLoginClick} />
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBarComponent;