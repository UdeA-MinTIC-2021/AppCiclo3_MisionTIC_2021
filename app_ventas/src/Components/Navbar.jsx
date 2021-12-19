import React from 'react'
import 'Estilos/navbar.css'
import { Link } from 'react-router-dom'
import Header from './Header'


const Navbar = () => {
    return (
        <div>
            <Header>SalesSof</Header>
            
            <nav className='barranav'>
                <ul className='ul1'>
                    <li>Nosotros</li>
                    <li>Nuestra historia</li>
                    <li>Contáctanos</li>
                    <li id='botonl'>
                        <Link to="/login">
                        <button id='bt1'>
                            Accceder
                        </button>
                        </Link>
                    </li>
                    
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
