import axios from '../../config/axios';
import React, { useEffect, useState } from 'react';
import BlogList from '../../components/Home/BlogList';
import Header from '../../components/Home/Header';
import Intro from '../../components/Home/Intro';
import { TabTitle } from '../../utils/GeneralFunctions';
import './styles.css';
import { Roller } from '../../components/common/Roller';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from '../../components/common/Footer';

const Home = () => {

  AOS.init();

  let blogList = {
    data: []
  }

  const [blogs, setBlogs] = useState(blogList);

  useEffect(() => {

    axios.get('/payment/all').then(res => {
      setBlogs(res.data.data);

    }).catch(err => {
      console.log(err);

    });

/*     setTimeout(()=> {

    },10000) */


  }, []);



  TabTitle(`Blog Venezuela`);

  return (

    <>

      <div className="back">

        <div className="content">

          <Intro />

          <div className='container'>

            <Header />

            {
              !blogs.length ?

                <Roller />

                :

                <BlogList blogs={blogs} />
            }

          </div>

          <br />
          <br />

          <Footer />

        </div>
      </div>


    </>

  );

};

export default Home;
