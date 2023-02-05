import React from 'react';
import './styles.css';
import image from './images/steve2.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Intro = () => {

    AOS.init();

    return (

        <div className='intro'>
            <h2 data-aos="fade-right" data-aos-delay="350" data-aos-duration="900"><i>“The only way to do great work is to love what you do”</i></h2>
            <h4 data-aos="fade-right" data-aos-delay="500" data-aos-duration="1400" >- Steve Jobs.</h4>
            <img src={image} alt="intro-steve" className='steve' />
        </div>

    )
}

export default Intro;