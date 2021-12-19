
import React, { /* useEffect,  useState, */ useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "Estilos/registrar1.css";
import axios from "axios";
import logo from "Imagenes/logo.png";


var myNumeroAleatorio = Math.floor(Math.random()*999)


const RegistroUsuario = () => {
  const form = useRef(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const nuevoUsuario = {};
    fd.forEach((value, key) => {
      nuevoUsuario[key] = value;
    });

    const options = {
      method: "POST",
      url: "https://rocky-beach-27823.herokuapp.com/usuarios",
      headers: { "Content-Type": "application/json" },
      data: {
        id: nuevoUsuario.id,
        rol: nuevoUsuario.rol,
        nombres: nuevoUsuario.nombres,
        apellidos: nuevoUsuario.apellidos,
        correo: nuevoUsuario.correo,
        contraseña: nuevoUsuario.contraseña,
      },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success("¡ Usuario registrado exitosamente !");
        
      })
      .catch(function (error) {
        console.error(error);
        toast.error("¡ Error al registrar el usuario !");
      });
        
      

    /* console.log("datos del nuevo usuario: ", nuevoUsuario); --> muestra en consola los datos enviados a la BD */
  };

  return (
    <div>
      <div className="LogoSS">
        <img src={logo} alt="logo" id="logo" />
      </div>
      <div className="registrate">
        <h2 id="h2">Regístrate</h2>

        <h2 id="h2_2">¡Es fácil y rápido!</h2>
      </div>

      <div className="Registro2">
        <form ref={form} onSubmit={submitForm}>
          <div>
            <input
              name="id"
              readOnly
              type="hidden"
              value={`US${myNumeroAleatorio}`}
            />
            <input name="rol" readOnly type="hidden" value="Pendiente" />
            <label htmlFor="nombres">Nombres: </label>
            <br />
            <input name="nombres" type="text" size="35px" required />
            <br></br>
            <br />
            <label htmlFor="apellidos">Apellidos: </label>
            <br />
            <input name="apellidos" type="text" size="35px" required />
            <br></br>
            <br />
            <label htmlFor="correo">Correo electrónico: </label>
            <br />
            <input name="correo" type="email" size="35px" required />
            <br></br>
            <br />
            <label htmlFor="contraseña">Contraseña: </label>
            <br />
            <input name="contraseña" type="password" size="35px" required />
            <br></br>
            <br />

            <div className="botonlog">
              <br></br>
              <button type="submit" id="boton_registrolog">
                ¡Registrate!
              </button>
              <br></br>
            </div>
          </div>
        </form>
        <ToastContainer position="top-center" autoClose={1500} />
      </div>
    </div>
  );
};

export default RegistroUsuario;
