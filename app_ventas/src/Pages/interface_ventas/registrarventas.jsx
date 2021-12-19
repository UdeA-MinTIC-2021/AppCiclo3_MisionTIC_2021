import Header from "Components/Header";
import 'Estilos/registrarventa.css';
import React, { useEffect,  useState, useRef } from 'react'; // se debe importar de esta manera el useEffect para poderlos usar dentro del componente formulario
// import 'Estilos/consultar.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import axios from "axios";
import { nanoid } from "nanoid";


var myNumeroAleatorio = Math.floor(Math.random()*999999)

const getToken = () =>{
  return `Bearer ${localStorage.getItem('token')}`
}


const RegistrarVentas=() => {

const [vendedores, setVendedores] = useState([])

useEffect(()=>{
     const fetchVendedores = async ()=>{
        const obtenerVendedores = async () => {
            const options = {
              method: "GET",
              url: "https://rocky-beach-27823.herokuapp.com/miaplicacion",
              headers: { Authorization: getToken(),}
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
            obtenerVendedores()
     }
     fetchVendedores()
}, [])

    const form = useRef(null);

    const submitForm= async (e) =>{
        e.preventDefault();
        const fd = new FormData(form.current);

        const nuevaVenta = {}; 
        fd.forEach((value, key)=>{
            nuevaVenta[key]=value;
        });

        const options = {
            method: 'POST',
            url: 'https://rocky-beach-27823.herokuapp.com/ventas/',
            headers: {'Content-Type': 'application/json' , Authorization: getToken(),},
            data: {
              id: nuevaVenta.idventa,
              fecha: nuevaVenta.fechaventa,
              documento: nuevaVenta.documentocliente,
              nombre: nuevaVenta.nombrecliente,
              precio: nuevaVenta.preciound,
              unidades: nuevaVenta.unidades,
              valorventa: nuevaVenta.valortotalventa,
              vendedor: nuevaVenta.vendedor
            }
          };

        await axios
        .request(options)
        .then(function (response) {
            console.log(response.data);
            toast.success("¡ Venta registrada exitosamente !");

          })
          .catch(function (error) {
            console.error(error);
            toast.error("¡ error al registrar la venta !");
          });
        
        console.log("datos del form enviados", nuevaVenta); // este console es para poder visualizar en la consola los datos que han sido enviados.
        
    }
    

    const [und, setUnd] = useState(0)
    const [punidad, setPunidad] = useState(85000)
    const [tventa, setTventa] = useState(0)
    

    
    useEffect(() => {
        setTventa(und*punidad)
    }, [und, punidad]);
    

    return(
        <div>
           <Header>
                <div>REGISTRAR NUEVA VENTA</div>
            </Header>
            
            <div className='Formularioventas'>
            <form ref={form} onSubmit={submitForm}>
                <div className='internoventas'>
                <label htmlFor='idventa'><b>Identificador de venta: </b></label><br/>
                <input value={`RV-${myNumeroAleatorio}`} readOnly name='idventa' type="text" size="35px" required /><br></br><br/>
                <label htmlFor='fechaventa'><b>Fecha de venta: </b></label>
                <input name='fechaventa' type="date" required/><br></br><br/>
                <label htmlFor='documentocliente' ><b>Numero documento del cliente: </b> </label> <br/>
                <input name='documentocliente' type="text" size="35px" required/><br></br><br/>
                <label htmlFor='nombrecliente' ><b>Nombre de Cliente: </b> </label> <br/>
                <input name='nombrecliente' type="text" size="35px" required/><br></br><br/>
                <label htmlFor='preciound'><b>Precio por unidad: </b></label><br/>
                <input value={punidad} readOnly onChange={(e)=> setPunidad(e.target.value)} id="punidad" name='preciound' type="text" size="35px" required/><br></br><br/>  
                <label htmlFor="unidades" ><b>Unidades vendidas: </b></label>
                <input value={und} onChange={(e)=> setUnd(e.target.value)} id="und" name='unidades' type="number" size="35px" min={0} max={100} required/><br></br><br/>
                <label htmlFor='valortotalventa'><b>Valor total de venta: </b></label><br/>
                <input value={tventa} readOnly onChange={(e)=> setTventa(e.target.value)} id="tventa" name='valortotalventa'  type="text"  size="35px" required/><br></br><br/>
                <label htmlFor="vendedor">
                    <b>Vendedor:</b> 
                    <select name="vendedor" defaultValue="" required>
                        <option disabled value="">Seleccione un vendedor</option>
                        {vendedores.map((el) => {
                            return <option key={nanoid()} value={el.id}>{`${el.nombres} ${el.apellidos}`}</option>
                        })}
                    </select>
                </label>
                
                <div className='botonventas'>
                    <br></br><button type='submit' id="boton_enviarv">Registrar</button> <br></br>
                    <br></br><Link to='/ventas/consultar_ventas'> <button type='button' id="boton_enviarv">Consultar listado de ventas</button> </Link><br></br>
                </div>
            </div>
            </form>

            <ToastContainer position="bottom-center" autoClose={1500}/>
            
        </div>
            
            
            
        </div>
    );    
}

export default RegistrarVentas;