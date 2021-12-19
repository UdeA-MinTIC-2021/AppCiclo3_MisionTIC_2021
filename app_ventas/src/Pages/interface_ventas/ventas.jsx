import Header from 'Components/Header';
import {Link} from 'react-router-dom';
import 'Estilos/ventas.css'



function Ventas(){
    return (
        <div>
    
            <Header>
                <div>Administración de ventas</div>
            </Header>
    
            <div className="botonesventas" >
                
                    <Link to='/ventas/registrar_ventas'id='boton1vt'>Registrar venta</Link> 
                    <Link to='/ventas/consultar_ventas'id='boton2vt'>Consultar/Modificar ventas</Link>
            </div>
        </div>
    );
}

export default Ventas;