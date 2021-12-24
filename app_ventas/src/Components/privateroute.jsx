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
                        <div id='noauth2'>No tienes autorización para ingresar a este módulo</div>
                        <h2>Ponte en contacto con el Administrador del sistema</h2>
                    </Header>
                </div>
        }

}


export default PrivateRoute;
