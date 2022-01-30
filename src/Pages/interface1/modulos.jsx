import Header from "Components/Header";
import 'Estilos/modulos.css';
import User from 'Imagenes/user (4).png';
import Group from 'Imagenes/icono_grupo.png';
import Sale from 'Imagenes/discount.png';
import {Link} from 'react-router-dom';
import PrivateComponent from "Components/PrivateComponent";


const Modulos=() => {
    return (
        
    <div>

        <Header>
            <div>Bienvenido</div>
        </Header>
    
        <div id='BotonesModulos'>
            <PrivateComponent roleList={['Administrador']}>
                <Link to='/admin/gestion_usuarios' id='boton1'><img src={User} alt='user_icon'/>Gestión de usuarios</Link>
            </PrivateComponent>
            <PrivateComponent roleList={['Administrador', 'Administrador2', 'Vendedor']}>
                <Link to='/admin/ventas' id='boton2'><img src={Sale} alt='sale_icon'/>Administración de ventas</Link>
            </PrivateComponent>
            <PrivateComponent roleList={['Administrador', 'Administrador2']}>
                <Link to='/admin/vendedores'id='boton3'><img src={Group} alt='group_icon'/>Gestión de vendedores</Link>
            </PrivateComponent>
        </div>





    </div>
    );    
}

export default Modulos;