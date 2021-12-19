import React from "react";
import {Link} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import logo from "Imagenes/logo.png";
import "Estilos/login.css";



const Login = () => {
  
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      
            <div className="LogoSS">
              <img src={logo}  alt="logo" id="logo" />
            </div>
            <div className='SS'>
            <span id='Salessoft'><b>SalesSoft</b></span>
            </div>
            <div className="textoIS">
              <span id="IS"><b>Iniciar sesión en tu cuenta DESPLEGADA POR FIN6</b></span>
            </div>

            <form action="" className="formulario">
              <div className="entradaTextoCedula">
                <input type="email" placeholder="Correo electrónico"/>
              </div>
              <div className="entradaTextoContraseña">
                <input type="password" placeholder="Contraseña"  />
              </div>
                
            
              
                <div className="olvideContraseña">
                  <button id="olvide">Olvidé mi contraseña</button>
                </div>
                <div className="botonacceder">
                  <button id="acceder" onClick={() => loginWithRedirect()}>Inicia sesión</button>
                </div>
              
                <div className="botonregistrate">
                  <span className='textor'>¿No tienes cuenta?</span>
                  <Link to='/registrousuarios'><button id="registrar">Regístrate </button></Link>  
                </div>
                  
                
              
            </form>
          
    </div>
  );
}
export default Login;
