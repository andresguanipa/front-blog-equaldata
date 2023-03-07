import React from 'react';
import './styles.css';
import image from './images/steve2.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Intro = () => {

    AOS.init();

    return (

        <div className='intro'>
            <h2 data-aos="fade-right" data-aos-delay="350" data-aos-duration="900"><i>SERVICES AND MAINTENANCE PEROZO LLC</i></h2>
            <img src={image} alt="intro-steve" className='steve' />
        </div>

    )
}

export default Intro;