import React, {useEffect, useState} from "react";
import "Estilos/consultar.css";
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


const Consultar = () => {

  const [vendedores, setVendedores] = useState([]);
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true)

  useEffect(() => {
    const obtenerVendedores = async () => {
      const options = {
        method: "GET",
        url: "https://rocky-beach-27823.herokuapp.com/miaplicacion",
        headers: {
          Authorization: getToken(),
        } 
      };

      await axios
        .request(options)
        .then(function (response) {
          setVendedores(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    };
    if (ejecutarConsulta){
      obtenerVendedores();
      setEjecutarConsulta(false);
    }
  }, [ejecutarConsulta])

     

  return (
    <div>
      <Header>
        <div>LISTADO DE VENDEDORES</div>
        <Link to='/admin'></Link>
      </Header>

      <Tabla listaVendedores= {vendedores} setEjecutarConsulta={setEjecutarConsulta}></Tabla>        
      <div className="boton">
        <br></br>
        <Link to="/registrar_vendedores">
          <button type="button" id="boton_enviar">
            Agregar vendedor
          </button>
        </Link>
        <br></br>
        <ToastContainer position="bottom-center" autoClose={1500}/>
      </div>
    </div>
  );
};


const FilaVendedor = ({vendedores, setEjecutarConsulta}) =>{
  const [edit, setEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false)

  const [infoNuevoVendedor, setInfoNuevoVendedor] = useState({
      nombres: vendedores.nombres,
      apellidos: vendedores.apellidos,
      genero: vendedores.genero,
      tipo: vendedores.tipo,
      documento: vendedores.documento,
      fecha: vendedores.fecha,
      correo: vendedores.correo,
      telefono: vendedores.telefono,
      direccion: vendedores.direccion,
      comentarios: vendedores.comentarios,

  });

  const actualizarVendedor = async () =>{
    const options = {
      method: 'PATCH',
      url: `https://rocky-beach-27823.herokuapp.com/miaplicacion/${vendedores._id}/`,
      headers: {'Content-Type': 'application/json', Authorization: getToken(),},
      data: { ...infoNuevoVendedor }
    };
    
    await axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      toast.success("¡ Datos del vendedor actualizados exitosamente !");
      setEdit(false);
      setEjecutarConsulta(true)
    })
    .catch(function (error) {
      toast.error("Error al actualizar la información");
      console.error(error);
    });
  };

  const eliminarVendedor= async () =>{
    const options = {
      method: 'DELETE',
      url: `https://rocky-beach-27823.herokuapp.com/miaplicacion/${vendedores._id}/`,
      headers: {'Content-Type': 'application/json', Authorization: getToken(),},
      data: {id: vendedores._id}
    };

    await axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      toast.success("¡ Registro eliminado exitosamente !");
      setEjecutarConsulta(true)
      setOpenDialog(false)
    })
    .catch(function (error) {
      console.error(error);
      toast.error("Error al eliminar el registro");
    });
  }

return(
    <tr>
      {edit ? (
    
      <>
      <td><input type="text" value={infoNuevoVendedor.nombres} onChange={e=>setInfoNuevoVendedor({...infoNuevoVendedor, nombres:e.target.value})} /></td>
      <td><input type="text" value={infoNuevoVendedor.apellidos} onChange={e=>setInfoNuevoVendedor({...infoNuevoVendedor, apellidos:e.target.value})}/></td>
      <td><select required defaultValue={0} onChange={e=>setInfoNuevoVendedor({...infoNuevoVendedor, genero:e.target.value})}>
              <option disabled value={0}>Seleccione el género</option>
              <option>Masculino</option>
              <option>Femenino</option>
              <option>Otro</option>
          </select></td>
      <td><select required defaultValue={0} onChange={e=>setInfoNuevoVendedor({...infoNuevoVendedor, tipo:e.target.value})}>
              <option disabled value={0}>Seleccione una opción</option>
              <option>C.C.</option>
              <option>T.I.</option>
              <option>Pasaporte</option>
              <option>D.E.</option>
          </select></td>
      <td><input type="text" value={infoNuevoVendedor.documento} onChange={e=>setInfoNuevoVendedor({...infoNuevoVendedor, documento:e.target.value})}/></td>
      <td><input type="date" value={infoNuevoVendedor.fecha} onChange={e=>setInfoNuevoVendedor({...infoNuevoVendedor, fecha:e.target.value})}/></td>
      <td><input type="email" value={infoNuevoVendedor.correo} onChange={e=>setInfoNuevoVendedor({...infoNuevoVendedor, correo:e.target.value})}/></td>
      <td><input type="text" value={infoNuevoVendedor.telefono} onChange={e=>setInfoNuevoVendedor({...infoNuevoVendedor, telefono:e.target.value})}/></td>
      <td><input type="text" value={infoNuevoVendedor.direccion} onChange={e=>setInfoNuevoVendedor({...infoNuevoVendedor, direccion:e.target.value})}/></td>
      <td><input type="text" value={infoNuevoVendedor.comentarios} onChange={e=>setInfoNuevoVendedor({...infoNuevoVendedor, comentarios:e.target.value})}/></td>
      </>
    ):(
    <>
      <td>{vendedores.nombres}</td>
      <td>{vendedores.apellidos}</td>
      <td>{vendedores.genero}</td>
      <td>{vendedores.tipo}</td>
      <td>{vendedores.documento}</td>
      <td>{vendedores.fecha}</td>
      <td>{vendedores.correo}</td>
      <td>{vendedores.telefono}</td>
      <td>{vendedores.direccion}</td>
      <td>{vendedores.comentarios}</td>
      </>
    )}
      <PrivateComponent roleList={['Administrador', 'Administrador2']}>
      <td>
        
          <div className='iconosform'>
            {edit? (
            <>
            <Tooltip title='Confirmar cambios' arrow><i onClick={()=> actualizarVendedor()} className='fas fa-check text-green-700 hover:text-green-500'/></Tooltip>
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
        
        <Dialog open={openDialog}> 
        <div id='dialogo'>
        <h3 id='textodialog'>¿Está seguro de eliminar este registro?</h3>
        <div id='botonesdialogo'>
            <button onClick={()=>eliminarVendedor()} id='botonsi'>Sí </button>
            <button onClick={()=>setOpenDialog(false)} id='botonno'>No</button>
          </div>
          </div>
        </Dialog>
      </td>
      </PrivateComponent>

    </tr>
  );
};


const Tabla=({ listaVendedores, setEjecutarConsulta }) => { 

   /* useEffect(()=>{
      console.log("este es el listado de vendedores: ", ...listaVendedores, nuevoVendedor);
  }, [listaVendedores]); --> este useEffect es para ver en consola la lista de vendedores en la tabla*/

  return (
    <div id="tablaVendedores">
      <h2>VENDEDORES ACTUALES</h2>
      
        <table className="tablita">
          <thead>
            <tr>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Género</th>
              <th>Tipo de Documento</th>
              <th>Documento Identidad</th>
              <th>Fecha Nacimiento</th>
              <th>Correo Electrónico</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Comentarios</th>
              <PrivateComponent roleList={['Administrador', 'Administrador2']}>
                <th>Acciones</th>
              </PrivateComponent>

            </tr>
          </thead>

          <tbody>
            {listaVendedores.map((vendedores) => {
              return (<FilaVendedor key={nanoid()} vendedores={vendedores} setEjecutarConsulta={setEjecutarConsulta}/>);
            })}
          </tbody>
        </table>
      
    </div>
  );
}


export default Consultar;