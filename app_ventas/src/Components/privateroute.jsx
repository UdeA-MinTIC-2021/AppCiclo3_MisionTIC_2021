import React from 'react'
import { useUser } from 'Context/UserContext'
import Header from 'Components/Header'

const PrivateRoute = ({roleList, children}) => {
    const {userData} = useUser();

    if(roleList.includes(userData.rol)){
        return children;
    }
    else{
        return  <div id='noauth' >
                    <Header>
                        <p id='noauth2'>No tienes autorización para ingresar a este módulo</p>
                        <p>Ponte en contacto con el Administrador del sistema</p>
                    </Header>
                </div>
        }

}


export default PrivateRoute;
