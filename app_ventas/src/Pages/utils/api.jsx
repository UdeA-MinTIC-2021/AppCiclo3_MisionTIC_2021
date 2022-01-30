import axios from 'axios';


 // const baseURL = "http://localhost:5000"
const baseURL = 'https://app-ciclo3-mision-tic-2021-backend.vercel.app/';


// CRUD PARA USUARIOS

const getToken = () => {
    return `Bearer ${localStorage.getItem('token')}`;
  };

export const obtenerUsuarios = async (successCallback, errorCallback) => {
    const options = {
      method: 'GET',
      url: `${baseURL}/usuarios/`,
      headers: {
        Authorization: getToken(),
      },
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
  };
  
export const obtenerDatosUsuario = async (successCallback, errorCallback) => {
    const options = {
      method: 'GET',
      url: `${baseURL}/usuarios/self/`,
      headers: {
        Authorization: getToken(), // 3. enviarle el token a Auth0
      },
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
  };
  
  export const editarUsuario = async (id, data, successCallback, errorCallback) => {
    const options = {
      method: 'PATCH',
      url: `${baseURL}/usuarios/${id}/`,
      headers: { 'Content-Type': 'application/json', 
      Authorization: getToken() },
      data,
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
  };