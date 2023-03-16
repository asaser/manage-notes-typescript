import { Button, Navbar } from "react-bootstrap";
import { UserModel } from "../../models/userModel";
import * as NewLoginParams from "../../routes/notesRouters";

interface NavBarLoginProps {
    user: UserModel,
    onLogoutSuccess: () => void,
}

const NavBarLoginComponent = ({ user, onLogoutSuccess}: NavBarLoginProps) => {
    async function logout() {
        try {
            await NewLoginParams.logout()
            onLogoutSuccess()
        } catch (error) {
            alert(error)
        }
    }
    
    return (
        <>
            <Navbar.Text>
                You are sign in: {user.username}
            </Navbar.Text>
            <Button onClick={logout}>
                Logout
            </Button>
        </>
    );
}

export default NavBarLoginComponent;