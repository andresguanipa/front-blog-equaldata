import React from 'react';
import { useSelector } from 'react-redux';
import './styles.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Header = () => {

  const state = useSelector(state => state);

  AOS.init();

  return (
    <>
      <header className='home-header'>

        <div data-aos="fade-left" data-aos-duration="1400">
          <h2>Bienvenido, </h2>
          <h1>
            <span> {state.auth.firstname} </span>
          </h1>
        </div>

        <div data-aos="fade-left" data-aos-duration="1000">
          <p>
            A continuación, los últimos pagos enviados
          </p>
        </div>

      </header>

      <br /><br />
    </>
  );


};

export default Header;
