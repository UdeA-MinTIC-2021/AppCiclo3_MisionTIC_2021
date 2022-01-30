
import Header from 'Components/Header';
import {Link} from 'react-router-dom';
import 'Estilos/estilos.css';


function PaginaPrincipal(){
    return (
        <div>
    
            <Header>
                <div>Gestión de vendedores</div>
            </Header>
    
            <div className="botones" >
                
                    <Link to='/registrar_vendedores'id='boton1v'>Registrar informacion de nuevo vendedor</Link> 
                    <Link to='/consultar_vendedores'id='boton2v'>Consultar/Modificar informacion de vendedores</Link>
            </div>
        </div>
    );
}

export default PaginaPrincipal;