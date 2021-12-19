import React, { useEffect } from 'react'
import 'Estilos/sidebar.css'
import 'Estilos/responsive.css';
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from 'Context/UserContext'



const Sidebar = () => {

    const {userData} = useUser();
    const { user, logout } = useAuth0();

   
    const cerrarSesion = () =>{
        logout({ returnTo: 'https://young-fjord-29465.herokuapp.com/' })
        localStorage.setItem('token', null)
    }
    
    return (        
       <nav id='sidebar' >
           <div align="center" id='logo'> <img src={userData.picture} id='foto' alt='Imgen de usuario' width="85px" height="85px"/></div>
            <div id='infosb'> 
                <label>{userData.name}</label>
                <label>{userData.nickname}</label>
                <label>{userData.rol}</label>
           </div>
           <button id='botoncs' onClick={() => cerrarSesion()}>Cerrar sesión</button>
       </nav>
    )
};

export default Sidebar;
