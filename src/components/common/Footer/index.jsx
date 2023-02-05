import React from 'react';
import { useDispatch } from 'react-redux';
import { startLogout } from '../../../actions/auth'
import './styles.css';

const Footer = () => {

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(startLogout());
    }


    return (

        <footer className='footer'>

            <div className="footer-content">
                <h3>Ing. Andrés Guanipa</h3>
                <p>Full-Stack Developer | Software Engineer</p>
            </div>
            <div className="footer-bottom">
                <p>



                    <a href="/"><b>Inicio</b></a>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <a href="/upload"><b>Publicar</b></a>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <a href="/profile"><b>Editar Perfil</b></a>
                </p>
                
                <div className="footer-menu">
                    <ul className="f-menu">

                        <li onClick={handleLogout}><a href=""><b>Logout</b></a></li>

                    </ul>
                </div>
            </div>

        </footer>

    )
}

export default Footer;