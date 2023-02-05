import React, { useState, useEffect } from 'react'
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { signUp } from '../../actions/auth';
import { messageError, TabTitle } from '../../utils/GeneralFunctions';
import './styles.css';
import { URL_IMG } from '../../config/constant';

function SignUp() {


  const dispatch = useDispatch();

  const [values, handleInputChange] = useForm({
    nameSignup: '',
    usernameSignup: '',
    passwordSignup: '',
    repeatPasswordSignup: '',
    photoSignup: ''
  });

  const { nameSignup, usernameSignup, passwordSignup, repeatPasswordSignup } = values;

  const [File, setFile] = useState();

  const onChangeFile = (e) => {
    setFile(e.target.files);
  }

  useEffect(() => {

    TabTitle(`Sign up | Blog Venezuela`);

  }, [])

  const onSubmitForm = async (e) => {
    e.preventDefault();


    if (nameSignup !== "" && usernameSignup !== "" && passwordSignup !== "" && repeatPasswordSignup !== "") {
      if (passwordSignup === repeatPasswordSignup && passwordSignup.length > 5) {

        let img = '';

        if (!File) {
          img = URL_IMG;

        } else {

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
            img = file.secure_url;

          } else {

            messageError('Error al subir la imagen');

          }

        }

        if (img !== '') {

          dispatch(signUp(usernameSignup, passwordSignup, nameSignup, img));

        }

      } else {

        messageError('Las contraseñas deben contener mas de 5 caracteres y deben coincidir.');

      }

    } else {

      messageError('Por favor, llene todos los campos.');

    }

  }

  return (

    <>
      <div className='signup'>
        <div className="wrapper">
          <div className="title-signup">
            Regístrate, ¡Es gratis!
          </div>

          <form onSubmit={onSubmitForm}>

            <div className="field">
              <input type="text" name="nameSignup" onChange={handleInputChange} value={nameSignup} required></input>
              <label>Nombre</label>
            </div>

            <div className="field">
              <input type="text" name="usernameSignup" onChange={handleInputChange} value={usernameSignup} required></input>
              <label>Usuario</label>
            </div>

            <div className="field">
              <input type="password" name="passwordSignup" onChange={handleInputChange} value={passwordSignup} autoComplete="on" required></input>
              <label>Contraseña</label>
            </div>

            <div className="field">
              <input type="password" name="repeatPasswordSignup" onChange={handleInputChange} value={repeatPasswordSignup} autoComplete="on" required></input>
              <label>Repite la contraseña</label>
            </div>

            <div className="field-file">
              <input type="file" name="profilePhoto" accept="image/png,image/jpeg,image/jpg" onChange={onChangeFile} />
            </div>

            {File ?

              <label className='notice'><b>Foto de perfil seleccionada!</b></label>

              :

              <label className='notice'><b>Selecciona una foto de perfil</b></label>

            }

            <br />
            <br />
            <div className="field">
              <input type="submit" id='submit-button' value="Registrarse"></input>
            </div>

            <a href="/login">¿Ya posees una cuenta? Inicia Sesion</a>

            <br />
          </form>
        </div>
      </div >
    </>
  );


}

export default SignUp;
