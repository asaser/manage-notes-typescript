import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

// Todo zrobic tak aby nie było innych w App.tsx komponentow
// Todo zrobi porzadek z css plikami
import LoginComponent from './components/LoginCompnent/LoginComponent';
import NavBarComponent from './components/NavBarComponent/NavBarComponent';
import SignUpComponent from './components/SignUp/SignUpComponent';
import * as NotesApi from './routes/notesRouters';

import { UserModel } from './models/userModel';
import styles from './styles/singleNoteComponent.module.css';
import NoteLoggedComponent from './components/NoteComponent/NoteLoggedComponent';
import NoteLogoutComponent from './components/NoteComponent/NoteLogoutComponent';

function App() {

  const [loginUser, setLoginUser] = useState<UserModel | null>(null);

  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    async function loginUser() {
      try {
        const user = await NotesApi.getLoginUser();
        setLoginUser(user)
      } catch (error) {
        console.log(error);
        
      }
    }

    // egzekfowane jest jeden raz jak otwieramy strone
  }, [])
  
  return (
    <div>
      <NavBarComponent 
        loggedUser = {loginUser}
        onSignUpClick = {() => setShowSignUp(true)}
        onLoginClick = {() => setShowLogin(true)}
        onLogoutClick = {() => setLoginUser(null)}
      />
      <Container className={styles.notePage}>
        <>
          {loginUser ?
            <NoteLoggedComponent />
            :
            <NoteLogoutComponent />
          }
        </>
      </Container>
        {
          showSignUp &&
          <SignUpComponent
            onDeregistration = {() => setShowSignUp(false)}
            onSignUpSuccess = {(user) => {
              setLoginUser(user);
              setShowSignUp(false);
            }}
          />
        }
        {
          showLogin &&
          <LoginComponent
            onDeregistration={() => setShowLogin(false)}
            onLoginSuccess={(user) => {
              setLoginUser(user);
              setShowLogin(false);
            }}
          />
        }
    </div>
  );
}

export default App;
