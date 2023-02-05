import Swal from "sweetalert2";


export const TabTitle = (title) => {

  return (document.title = title);

}

export const disableButton = () => {

  document.getElementById('submit-button').disabled = true

}

export const enableButton = () => {

  document.getElementById('submit-button').disabled = false

}

export const messageError = (message) => {

  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: message,
    footer: 'Copyright © 2023 - Todos los derechos reservados',
  })

}