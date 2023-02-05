import React from 'react';
import './styles.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const Header = () => {

  AOS.init();

  return (
    <>
      <header className='home-header'>

        <div data-aos="fade-left" data-aos-duration="1400">
          <h2>Bienvenidos a</h2>
          <h1>
            <span> Blog Venezuela </span>
          </h1>
        </div>

        <div data-aos="fade-left" data-aos-duration="1000">
          <p>
            El lugar para expresar tus ideas
          </p>
        </div>

      </header>

      <br /><br />
    </>
  );


};

export default Header;
