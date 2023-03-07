import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { loginUserPassword } from '../../actions/auth';
import { disableButton, enableButton, messageError, TabTitle } from '../../utils/GeneralFunctions';
import './styles.css';

const Login = () => {

   const dispatch = useDispatch();

   const [values, handleInputChange] = useForm({
      username: '',
      password: ''
   });

   const { username, password } = values;

   useEffect(() => {

      TabTitle(`Login | Blog Venezuela`);

   }, [])

   const onSubmitForm = (e) => {
      e.preventDefault();
      disableButton();

      if (values.password !== '' && values.username !== '') {

         dispatch(loginUserPassword(values.username, values.password));

      } else {

         messageError('Debe llenar todos los campos');

      }

      enableButton();

   }

   return (

      <>
         <div className='login'>
            <div className="wrapper">
               <div className="title">
                  Ingresar
               </div>

               <form onSubmit={onSubmitForm}>

                  <div className="field">
                     <input type="text" name="username" onChange={handleInputChange} value={username} required></input>
                     <label>Usuario</label>
                  </div>

                  <div className="field">
                     <input type="password" name="password" id="password-login" onChange={handleInputChange} value={password} autoComplete="on" required></input>
                     <label>Contraseña</label>
                  </div>
                  <br />

                  <div className="field">
                     <input type="submit" id="submit-button" value="Iniciar sesion"></input>
                  </div>

               </form>
            </div>
         </div>

      </>

   )
}

export default Login;