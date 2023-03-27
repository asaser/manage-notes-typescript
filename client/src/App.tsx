import { useEffect, useState } from 'react';

// Todo zrobic tak aby nie było innych w App.tsx komponentow
// Todo zrobi porzadek z css plikami
import LoginComponent from './components/LoginCompnent/LoginComponent';
import NavBarComponent from './components/NavBarComponent/NavBarComponent';
import SignUpComponent from './components/SignUp/SignUpComponent';
import * as NotesApi from './routes/notesRouters';

import { UserModel } from './models/userModel';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NotesPage from './pages/NotesPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';

import styles from './styles/app.module.css'

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
    <BrowserRouter>

      <div>
        <NavBarComponent 
          loggedUser = {loginUser}
          onSignUpClick = {() => setShowSignUp(true)}
          onLoginClick = {() => setShowLogin(true)}
          onLogoutClick = {() => setLoginUser(null)}
        />
        <Container className={styles.pageContainer}>
          <Routes>
            {/* Todo zobaczyc w innych projektach jak lepiej to zrobic */}
            <Route 
              path='/'
              element={<NotesPage loginUser={loginUser} />}
            />

            <Route 
              path='/privacy'
              element={<PrivacyPage />}
            />

            <Route 
              path='/*'
              element={<NotFoundPage />}
            />
          </Routes>
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
    </BrowserRouter>
  );
}

export default App;
