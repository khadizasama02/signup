import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './SignUp/Login';
import { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import Logout from './SignUp/Logout';
import { useEffect } from 'react';



if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.app(); // if already initialized, use that one
}


function App() {
  const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [hasAccount, setHasAccount] = useState(false);



    const clearInputs = () => {
      setEmail("");
      setPassword("");
    }

    const clearErrors = () => {
      setEmailError("");
      setPasswordError("");
    }




    const handleLogIn = () =>{
      clearErrors();
         firebase.auth()
         .signInWithEmailAndPassword(email, password)
         .catch(err =>{
           switch(err.code){
             case "auth/invalid-email":
             case "auth/user-disabled":
             case "auth/user-not-found":
               setEmailError(err.message);
               break;
              case "auth/wrong-password":
                setPasswordError(err.message);
                break;
           }
         });
    };
    const handleSignUp = () =>{
      clearErrors();
      firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(err =>{
        switch(err.code){
          case "auth/email-already-in-use":
          case "auth/invalid-email":
          
            setEmailError(err.message);
            break;
           case "auth/weak-password":
             setPasswordError(err.message);
             break;
        }
      });

    }
    const handleLogOut = () =>{
      firebase.auth().signOut();
    };
    const authListener = () =>{
      firebase.auth().onAuthStateChanged(user=>{
        if(user){
          clearInputs();
          setUser(user)
        }
        else{
          setUser("")
        }
      });
    };
    useEffect(()=>{
      authListener();
    },[])

  return (
    <div className="App">
    
    {user?(
      <Logout handleLogOut={handleLogOut}/>
    ):(
      
     
     <Login
       email={email}
       setEmail={setEmail}
       password={password}
       setPassword={setPassword}
       handleLogIn={handleLogIn}
       handleSignUp = {handleSignUp}
       hasAccount={hasAccount}
       setHasAccount={setHasAccount}
       emailError={emailError}
       passwordError = {passwordError}
     />
    )
    
    };
   
    
    </div>
  );
}

export default App;
