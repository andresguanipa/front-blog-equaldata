import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import './styles.css';
import { Link } from 'react-router-dom';
import { TabTitle } from '../../utils/GeneralFunctions';
import { Markup } from 'interweave';
import axios from '../../config/axios';
import { Roller } from '../../components/common/Roller';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Blog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  let blogState = {
    data: false,
    client: '',
    dni: '',
    createdAt: '',
    img: '',
    amount: '',
    confirmationNumber: '',
  }

  AOS.init();

  const [blog, setBlog] = useState(blogState);

  useEffect(() => {

    axios.get(`/payment/${id}`)
      .then(res => {

        if (res.data.ok) {

          console.log(res.data);

          let months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
          let date = new Date(res.data.data.createdAt);
          const fecha = `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;

          setBlog({
            data: true,
            client: res.data.data.client.name,
            dni: res.data.data.client.dni,
            createdAt: fecha,
            billImage: res.data.data.billImage,
            amount: res.data.data.amount,
            confirmationNumber: res.data.data.confirmationNumber
          });

          TabTitle(`${res.data.data.title} | Blog Venezuela`);

        } else {

          setBlog({ data: false });
          navigate("../", { replace: true });

        }



      }).catch(err => {
        console.log(err);
      });

  }, [id]);

  return (

      <div className='container'>
        <Link className='blog-goBack' to='/'>
          <span className='blog-goBack-arrow'> &#8592;</span> <span className='blog-goBack-text' >Volver</span>
        </Link>

        {
          blog.data === true ?

            (
              <div className='blog-wrap' data-aos-delay="200" data-aos="fade-right">
                <header>
                  <p className='blog-date'>Publicado el {blog.createdAt}</p>
                  <h1>Client: {blog.client} (DNI: {blog.dni})</h1>
                  <br />
                </header>
                <img src={blog.billImage} alt='cover' className='blog-img' />
                <br />
                <br />

                <Markup className='blog-content' content={`<b>Amount:</b> ${blog.amount}`} />
                <br />
                <Markup className='blog-content' content={`<b>Confirmation Number:</b> ${blog.confirmationNumber}`} />
                <br />

                <hr />
                <br />


              </div>
            )
            :
            (
              <Roller />
            )
        }
      </div>


  );
};

export default Blog;
