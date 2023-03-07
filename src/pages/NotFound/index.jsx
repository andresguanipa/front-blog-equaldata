import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import noEncontrado from "./images/13525-empty.gif";

const NotFound = () => {
    return (

        <div className='content-404'>
            <h1 className='h1-404'>404: Not Found :(</h1>
            <img src={noEncontrado} alt="not found" className='img-404' />
            <p className='p-404'>Ir al <Link to='/blog' className='link-404' >Inicio</Link></p>
        </div>

    )
}

export default NotFound;
