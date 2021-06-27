import React from 'react';
import './Logout.css';

const Logout = (props) => {
    const {handleLogOut} = props;
    return (
       
        <div>
           <nav>
               <h2>welcome</h2>
               <button onClick={handleLogOut}>log out</button>
           </nav>
        </div>
    );
};

export default Logout;