import React, {useEffect, useState} from "react";
import "Estilos/consultarventas.css";
import Header from "Components/Header";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import PrivateComponent from "Components/PrivateComponent";


const getToken = () =>{
  return `Bearer ${localStorage.getItem('token')}`
}

const ConsultarVentas = () => {
  
  const [ventas, setVentas] = useState([]);
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true)

  useEffect(() => {
    const obtenerVentas = async () => {
      const options = {
        method: "GET",
        url: "https://rocky-beach-27823.herokuapp.com/ventas", 
        headers: {Authorization: getToken(),} };

      await axios
        .request(options)
        .then(function (response) {
          setVentas(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    };
    if (ejecutarConsulta){
      obtenerVentas();
      setEjecutarConsulta(false);
    }
  }, [ejecutarConsulta])

     

  return (
    <div>
      <Header>
        <div>LISTADO DE VENTAS</div>
      </Header>

      <Tabla listaVentas= {ventas} setEjecutarConsulta={setEjecutarConsulta}></Tabla>        
      <div className="botonventasc">
        <br></br>
        <Link to="/ventas/registrar_ventas">
          <button type="button" id="boton_enviarcv">
            Agregar venta
          </button>
        </Link>
        <br></br>
        <ToastContainer position="bottom-center" autoClose={1500}/>
      </div>
    </div>
  );
};


const FilaVenta = ({ventas, setEjecutarConsulta}) =>{
  const [edit, setEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false)
  
  
    
  const [infoNuevaVenta, setInfoNuevaVenta] = useState({
      id: ventas.id,
      fecha: ventas.fecha,
      documento: ventas.documento,
      nombre: ventas.nombre,
      precio: ventas.precio,
      unidades: ventas.unidades,
      valorventa: ventas.valorventa,
      vendedor: ventas.vendedor
      
  });

  

  const actualizarVenta = async () =>{
    
    const options = {
    method: 'PATCH',
    url: `https://rocky-beach-27823.herokuapp.com/ventas/${ventas._id}`,
    headers: {'Content-Type': 'application/json', Authorization: getToken(),},
    data: { ...infoNuevaVenta }
        };

      await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success("¡ Datos de la venta actualizados exitosamente !");
        console.log("info enviada a la bd: ", infoNuevaVenta) //
        setEdit(false);
        setEjecutarConsulta(true)
      })
      .catch(function (error) {
        console.error(error);
        toast.error("Error al actualizar la información");
      }); 
  };

  const eliminarVenta= async () =>{
    const options = {
      method: 'DELETE',
      url: `https://rocky-beach-27823.herokuapp.com/ventas/${ventas._id}`,
      headers: {'Content-Type': 'application/json', Authorization: getToken(),}
    };
    
    await axios.request(options).then(function (response) {
      console.log(response.data);
      toast.success("¡ Registro eliminado exitosamente !");
      setEjecutarConsulta(true)
      setOpenDialog(false)
    }).catch(function (error) {
      console.error(error);
      toast.error("Error al eliminar el registro");
    });
  };

  const [vendedores, setVendedores] = useState([])

    useEffect(()=>{
        const fetchVendedores = async ()=>{
            const obtenerVendedores = async () => {
                const options = {
                  method: "GET",
                  url: "https://rocky-beach-27823.herokuapp.com/miaplicacion", Authorization: getToken(),};
          
                await axios
                  .request(options)
                  .then(function (response) {
                    setVendedores(response.data);
                  })
                  .catch(function (error) {
                    console.error(error);
                  });
                };
                obtenerVendedores()
        }
        fetchVendedores()
    }, [])

  



  return(
    <tr>
      {edit ? (
    
      <>
      <td><input type="text" readOnly value={infoNuevaVenta.id} onChange={e=>setInfoNuevaVenta({...infoNuevaVenta, id: e.target.value})} /></td>
      <td><input type="date" value={infoNuevaVenta.fecha} onChange={e=>setInfoNuevaVenta({...infoNuevaVenta, fecha: e.target.value})}/></td>
      <td><input type="text" value={infoNuevaVenta.documento} onChange={e=>setInfoNuevaVenta({...infoNuevaVenta, documento: e.target.value})}/></td>
      <td><input type="text" value={infoNuevaVenta.nombre} onChange={e=>setInfoNuevaVenta({...infoNuevaVenta, nombre: e.target.value})}/></td>
      <td><input type="text" readOnly value={infoNuevaVenta.precio} onchange={e=>setInfoNuevaVenta({...infoNuevaVenta, precio: e.target.value})} /></td>
      <td><input type="text" value={infoNuevaVenta.unidades} onChange={e=>setInfoNuevaVenta({...infoNuevaVenta, unidades: e.target.value})}/></td>
      <td><input type="text" readOnly value={infoNuevaVenta.valorventa} onchange={e=>setInfoNuevaVenta({...infoNuevaVenta, tventa: '100'})}/></td>
      <td><select required value={infoNuevaVenta.vendedor} defaultValue={0} onChange={e=>setInfoNuevaVenta({...infoNuevaVenta, vendedor:e.target.value})}>
      <option disabled value={0}>Seleccione un vendedor</option>
                        {vendedores.map((el) => {
                            return <option key={nanoid()} value={el.id}>{`${el.nombres} ${el.apellidos}`}</option>
                        })}
          </select></td>
      </>
    ):(
    <>
      <td>{ventas.id}</td>
      <td>{ventas.fecha}</td>
      <td>{ventas.documento}</td>
      <td>{ventas.nombre}</td>
      <td>{ventas.precio}</td>
      <td>{ventas.unidades}</td>
      <td>{ventas.valorventa}</td>
      <td>{ventas.vendedor}</td>
      
      </>
    )}
    <PrivateComponent roleList={['Administrador' ,'Administrador2']}>
      <td>
        <div className='iconosform'>
          {edit? (
          <>
            <Tooltip title='Confirmar cambios' arrow><i onClick={()=> actualizarVenta()} className='fas fa-check text-green-700 hover:text-green-500'/></Tooltip>
            <Tooltip title='Descartar cambios' arrow><i onClick={()=>setEdit(!edit)} className='fas fa-ban text-red-700 hover:text-red-500'/></Tooltip>
          </>
          ):(
          <>
            <Tooltip title='Editar información' arrow><i onClick={()=>setEdit(!edit)} className='fas fa-pencil-alt text-yellow-700 hover:text-yellow-500'/></Tooltip>
            <Tooltip title='Eliminar vendedor' arrow><i onClick={()=>setOpenDialog(true)} className='fas fa-trash text-red-700 hover:text-red-500'/></Tooltip>
          </>
          )
        }
        </div>
        <Dialog open={openDialog} > 
          <div id="dialogo">
            <h3 id='textodialog'>¿Está seguro de eliminar este registro?</h3>
            <div id='botonesdialogo'>
            <button onClick={()=>eliminarVenta()} id="botonsi">Sí </button>
            <button onClick={()=>setOpenDialog(false)} id="botonno">No</button>
            </div>
          </div>
        </Dialog>
      </td>
    </PrivateComponent>

      
    </tr>
  );
};


const Tabla=({ listaVentas, setEjecutarConsulta}) => { 

     /* useEffect(()=>{
       console.log("este es el listado de vendedores: ", ...listaVentas);
      }, [listaVentas]); //--> este useEffect es para ver en consola la lista de vendedores en la tabla */

  return (
    <div id="tablaVentas">
      <h2>VENTAS REALIZADAS</h2>
      
        <table className="tablitaventas">
          <thead>
            <tr>
              <th>id venta</th>
              <th>Fecha de venta</th>
              <th>Documento cliente</th>
              <th>Nombre cliente</th>
              <th>Precio x Und.</th>
              <th>unds. vendidas</th>
              <th>Valor total venta</th>
              <th>Vendedor</th>
              <PrivateComponent roleList={['Administrador', 'Administrador2']}>
                <th>Acciones</th>
              </PrivateComponent>
            </tr>
          </thead>


          <tbody>
            {listaVentas.map((ventas) => {
              return (<FilaVenta key={nanoid()} ventas={ventas} setEjecutarConsulta={setEjecutarConsulta}/>);
            })}
          </tbody>
        </table>
      
    </div>
  );
}


export default ConsultarVentas;