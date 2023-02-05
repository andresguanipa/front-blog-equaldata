import React, { useState } from 'react'
import './styles.css';
import Swal from 'sweetalert2';
import axios from '../../../config/axios';

const Contact = () => {


    let form = {
        name: '',
        email: '',
        message: ''
    }

    const [formData, setFormData] = useState(form);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.name === '' || formData.email === '' || formData.message === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, llene todos los campos.',
                footer: 'Copyright © 2022 - Todos los derechos reservados',
            })
        } else {

            formData.message = formData.message.replace(/\n/g, '<br />');

            axios.post('/publication/mail', formData).then(res => {
                
                if(res.data.ok){
                    Swal.fire({
                        icon: 'success',
                        title: 'Mensaje enviado',
                        text: 'Gracias por escribirnos, hemos enviado un mensaje a su correo.',
                        footer: 'Copyright © 2022 - Todos los derechos reservados',
                    })

                    document.getElementsByName('name')[0].value = '';
                    document.getElementsByName('email')[0].value = '';
                    document.getElementsByName('message')[0].value = '';

                    setFormData({
                        name: '',
                        email: '',
                        message: ''
                    })

                } else {

                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ha ocurrido un error, por favor verifique los campos e intente nuevamente.',
                        footer: 'Copyright © 2022 - Todos los derechos reservados',
                    })

                }

            }).catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ha ocurrido un error, por favor intente mas tarde.',
                    footer: 'Copyright © 2022 - Todos los derechos reservados',
                })
            })


        }



    }


    return (

        <div className="contact">
            <h2 className='h2-contact'>Subir una publicación</h2>
            <p className='p-contact'>Hola, :Usuario:</p>

            <div className='contact-form'>
                <input name="name" type="text" className="feedback-input" placeholder="Nombre" onChange={handleChange} required />
                <input name="email" type="email" className="feedback-input" placeholder="Email" onChange={handleChange} required />
                <textarea name="message" className="feedback-input" placeholder="Mensaje" onChange={handleChange} required></textarea>
                <button type="submit" placeholder='Enviar' className='button-contact' onClick={handleSubmit}>Enviar</button>
            </div>
        </div>

    )
}

export default Contact;