import { Button } from "react-bootstrap";

interface NavBarLogoutProps {
    onSignUpClick: () => void,
    onLoginClick: () => void,
}

const NavBarLogoutComponent = ({ onSignUpClick, onLoginClick }: NavBarLogoutProps) => {
    return (
        <>
            <Button onClick={onSignUpClick}>
                Sign up
            </Button>
            <Button onClick={onLoginClick}>
                Login
            </Button>
        </>
    );
}

export default NavBarLogoutComponent;