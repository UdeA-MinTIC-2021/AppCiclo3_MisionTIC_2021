import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Login from "Pages/interface1/login";
import RegistroUsuario from "Pages/interface1/registrarusuario";
import Modulos from "Pages/interface1/modulos";
import PaginaPrincipal from "Pages/interface_vendedores/PaginaPpal";
import Registrar from "Pages/interface_vendedores/registrar";
import Consultar from "Pages/interface_vendedores/consultar";
import Ventas from "Pages/interface_ventas/ventas";
import RegistrarVentas from "Pages/interface_ventas/registrarventas";
import ConsultarVentas from "Pages/interface_ventas/consultarventas";
import Usuarios from "Pages/interface_usuarios/usuarios";
import Landing from "Pages/interface1/landing";
import PublicLayout from "layouts/publiclayout";
import PrivateRoute from "Components/privateroute";
import Privatelayout from "layouts/privatelayout";
import Authlayout from "layouts/Authlayout";
import { UserContext } from "Context/UserContext";

function App() {

  const [userData, setUserData] = useState({});
  return (
    <Auth0Provider
      domain="misiontic-app.us.auth0.com"
      clientId="HXwPE3SMDNt8qqvrtpFWN2Esld0BQXsj"
      redirectUri="https://agile-springs-40899.herokuapp.com/admin"
      audience="api-autenticacion-ventas-mintic"
    >
      <UserContext.Provider value={{ userData, setUserData }}>
        <Router>
          <Switch>
            <Route path={['/admin', '/admin/vendedores', '/consultar_vendedores', '/registrar_vendedores', '/admin/ventas', '/ventas/consultar_ventas', '/ventas/registrar_ventas', '/admin/gestion_usuarios']}>
              <Privatelayout>
                <Switch>
                  <Route path="/admin/gestion_usuarios" exact>
                    <PrivateRoute roleList={['Administrador']}>
                      <Usuarios />
                    </PrivateRoute>
                  </Route>

                  <Route path="/ventas/registrar_ventas" exact>
                  <PrivateRoute roleList={['Administrador', 'Administrador2', 'Vendedor']}>
                    <RegistrarVentas />
                  </PrivateRoute>
                  </Route>
                    
                  <Route path="/ventas/consultar_ventas" exact>
                    <PrivateRoute roleList={['Administrador', 'Administrador2', 'Vendedor']}>
                      <ConsultarVentas />
                    </PrivateRoute>
                  </Route>

                  <Route path="/admin/ventas" exact>
                    <PrivateRoute roleList={['Administrador', 'Administrador2', 'Vendedor']}>
                      <Ventas />
                    </PrivateRoute>
                  </Route>

                  <Route path="/registrar_vendedores" exact>
                    <PrivateRoute roleList={['Administrador', 'Administrador2']}>
                    <Registrar />
                    </PrivateRoute>
                  </Route>

                  <Route path="/consultar_vendedores" exact>
                  <PrivateRoute roleList={['Administrador', 'Administrador2']}>
                    <Consultar />
                  </PrivateRoute>
                  </Route>

                  <Route path="/admin/vendedores" exact>
                    <PrivateRoute roleList={['Administrador', 'Administrador2']}>
                      <PaginaPrincipal />
                    </PrivateRoute>
                  </Route>

                  <Route path='/admin'>
                    <Modulos />
                  </Route>
                </Switch>
              </Privatelayout>
            </Route>
            <Route path={['/login', '/registrousuarios']}>
              <Authlayout>
                <Switch>
                  <Route path="/login">
                    <Login />
                  </Route>
                  <Route path="/registrousuarios">
                    <RegistroUsuario />
                  </Route>
                </Switch>
              </Authlayout>
            </Route>
            <Route path={['/']}>
              <PublicLayout>
                <Switch>
                  <Route path='/'>
                    <Landing />
                  </Route>
                </Switch>
              </PublicLayout>
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>

    </Auth0Provider>
  );
}

export default App;
