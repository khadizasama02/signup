import React from 'react';
import './Login.css';


const Login = (props) => {
    const { email,  setEmail, password,setPassword, handleLogIn, handleSignUp, hasAccount,setHasAccount,emailError,passwordError } = props;
    

    return (
        
        <div>
        <h1 className="header">Make the most of your professional life</h1>
        <div className="card w-25 h-25">
        <div className="login">
           
           <div className="login_form">
           <label>Email</label>
                <input type="text" name="email" autoFocus onChange={e => setEmail(e.target.value) } value={email} placeholder="email"/>
                <p>{emailError}</p>
                <label>Password</label>
                <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" required/>
                
                <p>{passwordError}</p>
              
                {
                    hasAccount ? (
                        <>
                        <button onClick={handleLogIn}>Sign In</button>
                        <p className="login_p">not a member ? <span className="login_register" onClick={()=> setHasAccount(!hasAccount)}>Register now</span> </p> 
                        </>
                    ) : (
                     <>
                        <button onClick={handleSignUp}>Sign Up</button>
                        <p className="login_p">Already have an account? <span className="login_register" onClick={()=> setHasAccount(!hasAccount)}>Sign In</span></p>
                        </>
                    )
                }
           </div>
            
         </div>
        </div>
        </div>
        
    );
};

export default Login;