import Footer from 'Components/Footer'
import Navbar from 'Components/Navbar'
import React from 'react' 
import 'Estilos/Publiclayout.css'


const PublicLayout = ({ children }) => {
    return(
        <div id="playout">
            <Navbar />            
            <main className='mainp'>{ children }</main>
            <Footer />
        </div>
    )
}

export default PublicLayout
