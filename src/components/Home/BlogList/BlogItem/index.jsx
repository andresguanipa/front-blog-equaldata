import React from 'react';
import { Link } from 'react-router-dom';
import Chip from '../../../common/Chip';
import './styles.css';
import { Markup } from 'interweave';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { URL_IMG } from '../../../../config/constant';

const BlogItem = ({

  blog: {
    content,
    title,
    createdAt,
    client,
    billImage,
    categories,
    idPayment,
    confirmationNumber
  },

}) => {

  AOS.init();

  let months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  let date = new Date(createdAt);
  const fecha = `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;

  return (
    <>


      <div className='blogItem-wrap' key={idPayment} data-aos="fade-right" data-aos-duration="1200">
        <Link className='blogItem-link' to={`/blog/${idPayment}`}>
          <img className='blogItem-cover' src={billImage} alt='cover' loading='lazy' />

{/*           <Chip label={categories} />
 */}          
          <h3>{confirmationNumber}</h3>
        </Link>

{/*         <Markup className='blogItem-desc' content={content.substr(0,360)} />
 */}        
        <footer>
          <div className='blogItem-author'>
            <img src={URL_IMG} alt='avatar' loading='lazy' />
            <div>
              <h6>{client !== null ? client.name : 'Unknown'}</h6>
              <p>{fecha}</p>
            </div>
          </div>
        </footer>
      </div >

    </>



  );
};

export default BlogItem;
