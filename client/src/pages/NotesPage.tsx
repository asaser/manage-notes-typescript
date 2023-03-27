import { Container } from "react-bootstrap";
import NoteLoggedComponent from "../components/NoteComponent/NoteLoggedComponent";
import NoteLogoutComponent from "../components/NoteComponent/NoteLogoutComponent";
import { UserModel } from "../models/userModel";

import styles from '../styles/SingleNoteComponent.module.css';

interface NotesPageProps {
    loginUser: UserModel | null;
}

const NotesPage = ({ loginUser }: NotesPageProps) => {

    return (
        <Container className={styles.notePage}>
        <>
          {loginUser ?
            <NoteLoggedComponent />
            :
            <NoteLogoutComponent />
          }
        </>
      </Container>
    );
}
 
export default NotesPage;