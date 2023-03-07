import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { updateName } from '../../actions/auth'
import './styles.css';
import { disableButton, enableButton, messageError, TabTitle } from '../../utils/GeneralFunctions';

const Profile = () => {

   const dispatch = useDispatch();
   const state = useSelector(state => state);

   const formPassword = {
      currentPassword: '',
      newPassword: '',
      repeatNewPassword: '',
   }

   const [formData, setFormData] = useState(formPassword);
   const [name, setName] = useState(state.auth.firstname);
   const [category, setCategory] = useState("1");

   const handleChangePassword = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value
      })
   }

   const handleChangeName = (e) => {
      setName(e.target.value);
   }


   const handleChangeCategory = (e) => {
      setCategory(e.target.value);
   }

   useEffect(() => {

      TabTitle(`Perfil | Blog Venezuela`);

   }, [])


   const onSubmitForm = (e) => {
      e.preventDefault();
      disableButton();

      if (category === "1") {

         if (name !== "") {

            dispatch(updateName(name));

         } else {

            messageError('El nombre no puede estar vacio');

         }

      } else {

         if (formData.currentPassword === '' || formData.newPassword === '' || formData.repeatNewPassword === '') {

            messageError('Por favor, llene todos los campos.');

         } else {

            if (formData.newPassword !== formData.repeatNewPassword || formData.newPassword.length < 6) {

               messageError('Las contraseñas deben coincidir y ser mayor a 5 caracteres');

            } else {

               axios.put('/user/password',
                  {
                     newPassword: formData.newPassword,
                     password: formData.currentPassword
                  }
               ).then(data => {

                  if (data.data.ok) {
                     Swal.fire({
                        icon: 'success',
                        title: 'Genial!',
                        text: 'La contraseña ha sido cambiada exitosamente',
                        footer: 'Copyright © 2023 - Todos los derechos reservados',
                     }).then(data => {

                        window.location.href = '/blog';

                     });

                  } else {

                     messageError(data.data.message);

                  }

               }).catch(err => {

                  messageError('Ha ocurrido un error, por favor vuelve a intentarlo más tarde');

               });

            }

         }

      }
      
      enableButton();

   }

   return (

      <>
         <div className='profile'>
            <div className="wrapper">
               <div className="title">
                  Editar perfil
               </div>

               <div className="field prof-image">
                  <img className='profile-image' src={state.auth.img} height={200} width={200} alt='profile' ></img>
               </div>

               <br />
               <br />

               <div className="select">
                  <label>¿Que desea editar?</label>
                  <select name="category" className='feedback-input-profile' onChange={handleChangeCategory} required>
                     <option value="1" defaultValue>Nombre</option>
                     <option value="2">Contraseña</option>
                  </select>
               </div>


               <form onSubmit={onSubmitForm}>

                  {

                     category === "1" ?

                        <>
                           <div className="field">
                              <input type="text" name="name" onChange={handleChangeName} value={name} required></input>
                              <label>Nombre</label>
                           </div>
                           <br />

                           <div className="field">
                              <input type="submit" value="Cambiar nombre" id='submit-button'></input>
                           </div>
                           <br />
                        </>

                        :

                        <>
                           <div className="field">
                              <input type="password" name="currentPassword" onChange={handleChangePassword} value={formData.currentPassword} autoComplete="on" required></input>
                              <label>Contraseña actual</label>
                           </div>

                           <div className="field">
                              <input type="password" name="newPassword" onChange={handleChangePassword} value={formData.newPassword} autoComplete="on" required></input>
                              <label>Nueva contraseña</label>
                           </div>

                           <div className="field">
                              <input type="password" name="repeatNewPassword" onChange={handleChangePassword} value={formData.repeatNewPassword} autoComplete="on" required></input>
                              <label>Repetir nueva contraseña</label>
                           </div>
                           <br />

                           <div className="field">
                              <input type="submit" value="Cambiar contraseña" id='submit-button'></input>
                           </div>
                           <br />

                        </>

                  }


               </form>
            </div>
         </div>


      </>

   )
}

export default Profile;