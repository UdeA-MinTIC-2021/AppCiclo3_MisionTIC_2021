import 'Estilos/usuarios.css';
import Header from "Components/Header";
import React, {useEffect, useState} from "react";
import { nanoid } from "nanoid";
import { obtenerUsuarios } from 'Pages/utils/api';
import { editarUsuario } from 'Pages/utils/api';
import PrivateComponent from 'Components/PrivateComponent';



const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      await obtenerUsuarios(
        (respuesta) => {
          console.log('usuarios', respuesta.data);
          setUsuarios(respuesta.data);
        },
        (err) => {
          console.log(err);
        }
      );
    };
    fetchUsuarios();
  }, []);
         

  return (
    <div id='tablausuarios'>
      
      <Header>
        <div>Gestión de usuarios</div>
      </Header>
      
      <table className="tablitausuarios">
      <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo electrónico</th>
              <th>Rol</th>
              <th>Estado</th>
              
            </tr>
          </thead>
        <tbody>
          {usuarios.map((user) => {
            return (
            <tr key={nanoid()}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <RolesUsuario user={user} />
              </td>
              <td>
                <EstadoUsuario user={user} />
              </td>
            </tr>
            );
            })}
        </tbody>
       </table>
       
      </div>
    );
  };

  const RolesUsuario = ({ user }) =>{
    const [rol, setRol] = useState(user.rol)
    useEffect(()=>{
      const editUsuario = async ()=>{
          await editarUsuario(user._id, { rol },(res)=>{console.log(res)},(err)=>{console.err(err)})
      }
      if(user.rol !== rol){
        editUsuario();
      }      
    }, [rol, user]);
    return(
      <select value={rol} onChange={e=>setRol(e.target.value)}>
        <option value="" disabled>Seleccione un rol</option>
        <option value="Pendiente">Pendiente</option>
        <option value="Administrador">Administrador</option>
        <option value="Administrador2">Administrador II</option>
        <option value="Vendedor">Vendedor</option>
      </select>
    )
  }

  const EstadoUsuario = ({ user }) => {
    const [estado, setEstado] = useState(user.estado ?? '');
  
    useEffect(() => {
      const editUsuario = async () => {
        await editarUsuario(
          user._id,
          { estado },
          (res) => {
            console.log(res);
          },
          (err) => {
            console.error(err);
          }
        );
      };
      if (user.estado !== estado) {
        editUsuario();
      }
    }, [estado, user]);
  
    return (
      <select value={estado} onChange={(e) => setEstado(e.target.value)}>
        <option value='' disabled>Seleccione un estado </option>
        <option value='autorizado' className='text-green-500'>Autorizado</option>
        <option value='pendiente' className='text-yellow-500'>Pendiente</option>
        <option value='rechazado' className='text-red-500'>Rechazado</option>
      </select>
    );
  };
      
export default Usuarios;