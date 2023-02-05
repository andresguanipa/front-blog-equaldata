import React, { useEffect, useState } from 'react'
import './styles.css';
import Swal from 'sweetalert2';
import axios from '../../config/axios';
import Footer from '../../components/common/Footer';
import { useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { disableButton, enableButton, messageError, TabTitle } from '../../utils/GeneralFunctions';

const Upload = () => {

    const state = useSelector(state => state);

    const [values, handleInputChange] = useForm({
        title: '',
        content: '',
        category: '',
        imgAuthor: ''
    });

    const { title, content, category, imgAuthor } = values;


    const [File, setFile] = useState();

    const onChangeFile = (e) => {
        setFile(e.target.files);
    }

    useEffect(() => {

        TabTitle(`Publicar | Blog Venezuela`);

    }, [])

    const handleSubmit = async (e) => {

        e.preventDefault();
        disableButton();

        if (values.title !== '' && values.content !== '' && values.category !== '' && values.imgAuthor !== '' && File) {

            const filess = File;
            const data = new FormData();
            data.append("file", filess[0]);
            data.append("upload_preset", "equaldata");

            const res = await fetch("https://api.cloudinary.com/v1_1/dlvlxxe5t/upload", {
                method: "POST",
                body: data
            })

            if (res.ok) {
                const file = await res.json();
                console.log(file.secure_url);

                values.content = values.content.replace(/\n/g, '<br />');

                axios.post('/publication/create',
                    {
                        title: values.title,
                        content: values.content,
                        img: file.secure_url,
                        categories: values.category,
                        imgAuthor: values.imgAuthor

                    }
                ).then(res => {

                    if (res.data.ok) {

                        document.getElementById('submit-button').disabled = false;

                        document.getElementsByName('title')[0].value = '';
                        document.getElementsByName('content')[0].value = '';
                        document.getElementsByName('category')[0].value = '';
                        document.getElementsByName('imgAuthor')[0].value = '';
                        document.getElementsByName('imagen')[0].value = [];

                        Swal.fire({
                            icon: 'success',
                            title: 'Listo!',
                            text: 'La publicación fue subida exitosamente!',
                            footer: 'Copyright © 2023 - Todos los derechos reservados',
                        }).then(data => {

                            window.location.href = "/"

                        })

                    } else {

                        messageError('Ha ocurrido un error, por favor verifique los campos e intente nuevamente.');

                    }

                }).catch(err => {

                    messageError('Ha ocurrido un error, por favor intente mas tarde.');

                })

            } else {

                messageError('Ha ocurrido un error al intentar subir la imagen, por favor revise la misma intente nuevamente.');

            }

        } else {

            messageError('Por favor, llene todos los campos.');

        }

        enableButton();

    }


    return (

        <>
            <div className="contact">
                <h2 className='h2-contact'>Subir una publicación</h2>
                <p className='p-contact'>Hola, {state.auth.firstname}.</p>

                <div className='contact-form'>
                    <input name="title" type="text" className="feedback-input" placeholder="Titulo" onChange={handleInputChange} value={title} required />
                    <textarea name="content" className="feedback-input" placeholder="Contenido" onChange={handleInputChange} value={content} required></textarea>
                    <select name="category" className='feedback-input' onChange={handleInputChange} value={category} required>
                        <option value="" defaultValue>Categoria</option>
                        <option value="De interés">De interés</option>
                        <option value="Educacional">Educacional</option>
                        <option value="Entretenimiento">Entretenimiento</option>
                        <option value="Historia">Historia</option>
                        <option value="Motivacional">Motivacional</option>
                        <option value="Noticia">Noticia</option>
                        <option value="Tecnología">Tecnología</option>
                    </select>
                    <input type="file" className='feedback-input' name="imagen" accept="image/png,image/jpeg,image/jpg" onChange={onChangeFile} />
                    <input name="imgAuthor" type="text" className="feedback-input" placeholder="Origen de imagen. (Ej: Wikipedia)" onChange={handleInputChange} value={imgAuthor} required />
                    <br />
                    <br />
                    <button type="submit" placeholder='Enviar' className='button-contact' id='submit-button' onClick={handleSubmit}>Enviar</button>
                </div>
            </div>

            <Footer />
        </>



    )
}

export default Upload;