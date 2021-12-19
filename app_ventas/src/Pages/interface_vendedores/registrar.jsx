import Header from "Components/Header";
import 'Estilos/registrar.css';
import React, {/* useEffect,  useState, */ useRef } from 'react'; // se debe importar de esta manera el useEffect para poderlos usar dentro del componente formulario
import 'Estilos/consultar.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import axios from "axios";


const getToken = () =>{
    return `Bearer ${localStorage.getItem('token')}`
  }


const Registrar=() => {



    const form = useRef(null);

    const submitForm= async (e) =>{
        e.preventDefault();
        const fd = new FormData(form.current);

        const nuevoVendedor = {}; 
        fd.forEach((value, key)=>{
            nuevoVendedor[key]=value;
        });

        const options = {
            method: 'POST',
            url: 'https://rocky-beach-27823.herokuapp.com/miaplicacion',
            headers: {'Content-Type': 'application/json' , Authorization: getToken(),},
            data: {
              nombres: nuevoVendedor.nombres,
              apellidos: nuevoVendedor.apellidos,
              genero: nuevoVendedor.genero,
              tipo: nuevoVendedor.tipo,
              documento: nuevoVendedor.documento,
              fecha: nuevoVendedor.fecha,
              correo: nuevoVendedor.correo,
              telefono: nuevoVendedor.telefono,
              direccion: nuevoVendedor.direccion,
              comentarios: nuevoVendedor.comentarios
            }
          };

        await axios
        .request(options)
        .then(function (response) {
            console.log(response.data);
            toast.success("¡ Datos del vendedor registrados exitosamente !");

          })
          .catch(function (error) {
            console.error(error);
            toast.error("¡ el vendedor no fue registrado !");
          });
        
        // console.log("datos del form enviados", nuevoVendedor); // ese console es para poder visualizar en la consola los datos que han sido enviados.
        
    }


    return(
        <div>
           <Header>
                <div>REGISTRAR INFORMACIÓN NUEVO VENDEDOR</div>
            </Header>
            
            <div className='Formulario2'>
            <form ref={form} onSubmit={submitForm}>
                <div className='interno2'>
                <label htmlFor='nombres'><b>Nombres: </b></label><br/>
                <input name='nombres' type="text" size="35px" required/><br></br><br/>
                <label htmlFor='apellidos'><b>Apellidos: </b></label><br/>
                <input name='apellidos' type="text"  size="35px" required/><br></br><br/>
                <label htmlFor='genero'><b>Género: </b></label>
                <input value='Femenino'  id='radiob' type="radio" name="genero"  />
                <label htmlFor="genero">Femenino</label>
                <input value='Masculino' id='radiob' type="radio" name="genero" />
                <label htmlFor="genero">Masculino</label>
                <input value='Otro' id='radiob' type="radio" name="genero" />
                <label htmlFor="genero">Otro</label><br></br><br/>
                <label htmlFor="tipo"><b>Documento de identidad: </b></label>
                <select name='tipo' id="docs" required defaultValue={0}>
                    <option disabled value={0}>Seleccione una opción</option>
                    <option>C.C.</option>
                    <option>T.I.</option>
                    <option>Pasaporte</option>
                    <option>D.E.</option>
                </select><br/>
                <input name='documento' type="text" size="35px" required/><br></br><br/>
                <label htmlFor='fecha'><b>Fecha de Nacimiento: </b></label>
                <input name='fecha' type="date" required/><br></br><br/>
                <label htmlFor='correo'><b>Correo electrónico: </b></label><br/>
                <input name='correo' type="email" size="35px" required/><br></br><br/>  
                <label htmlFor='telefono' ><b>Teléfono: </b> </label><br/>
                <input name='telefono' type="tel" size="35px" max={10} required/><br></br><br/>
                <label htmlFor='direccion' ><b>Dirección de Residencia: </b> </label> <br/>
                <input name='direccion' type="text" size="35px" required/><br></br><br/>
                <div id="comentarios"><label htmlFor='comentarios'><b>Comentarios: </b></label><br/>
                    <textarea name='comentarios'  rows="9" cols="60"></textarea><br></br>
                </div>
                
                <div className='boton'>
                    <br></br><button type='submit' id="boton_enviar">Registrar</button> <br></br>
                    <br></br><Link to='/consultar_vendedores'> <button type='button' id="boton_enviar">Consultar Lista</button> </Link><br></br>
                </div>
            </div>
            </form>

            <ToastContainer position="bottom-center" autoClose={1500}/>
            
        </div>
            
            
            
        </div>
    );    
}

export default Registrar;