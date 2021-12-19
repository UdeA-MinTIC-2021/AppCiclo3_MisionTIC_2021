import React, {useEffect, useState} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import Sidebar from 'Components/Sidebar';
import 'Estilos/privatelayout.css';
import { Link } from 'react-router-dom'
import ReactLoading from 'react-loading';
import Header from 'Components/Header';
import { obtenerDatosUsuario } from 'Pages/utils/api';
import { useUser } from 'Context/UserContext'

 


const Privatelayout = ({ children }) => {

  const { isAuthenticated, isLoading, getAccessTokenSilently, logout } = useAuth0();
  const [loadingUserInformation, setLoadingUserInformation] = useState(false)         
  const {setUserData} = useUser()
     
    
    useEffect(()=>{


        const fetchAuth0Token = async () =>{


          // 1. Pedir token a Auth0
          setLoadingUserInformation(true)
           const accessToken = await getAccessTokenSilently({
                audience: `api-autenticacion-ventas-mintic`,
            });
            // 2. Recibir token de Auth0
            localStorage.setItem('token', accessToken);
            console.log('este es el token que llego de Auth000000', accessToken);
            // 3. Enviarle el token al Backend
            await obtenerDatosUsuario((response)=>{
                console.log('response con datos de usuario: ', response);
                setUserData(response.data)
                setLoadingUserInformation(false)
            },(err)=>{
                console.log('error', err)
                setLoadingUserInformation(false)
                logout({ returnTo: 'https://salessoft.herokuapp.com' })
            });
                     
        };
        if(isAuthenticated){
            fetchAuth0Token();

        }
    }, [isAuthenticated, getAccessTokenSilently, setUserData, logout]);

    if(isLoading || loadingUserInformation) 
    return <div className='loading'> <ReactLoading  type="cylon" color="#00FF40" delay={10} height={'20%'} width={'20%'} /></div>

    if(!isAuthenticated){
         <div id='noauth' > 
            <Header>
            <div id='noauth2'>Por favor, inicia sesión para ingresar</div>
            <Link to="/" id='btnhome'> Ir al inicio </Link>
            </Header>
        </div>
    }  return (
    
      <div id="private">
        <Sidebar />
          <main className="mains">{children}</main>
      </div>
    );
};
            
    

export default Privatelayout;
