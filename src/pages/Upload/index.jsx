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
        dni: '',
        amount: '',
        category: '',
        confirmationNumber: ''
    });

    const { dni, amount, confirmationNumber } = values;


    const [File, setFile] = useState();

    const onChangeFile = (e) => {
        setFile(e.target.files);
    }

    useEffect(() => {

        TabTitle(`Publicar | Blog Venezuela`);

    }, [])

    const handleSubmit = async (e) => {

        try {

            e.preventDefault();
            disableButton();

            if (values.dni !== '' && values.amount !== '' && values.confirmationNumber !== '' && File) {

                const userExist = await axios.get(`/client/byDNI?dni=${values.dni}`);

                if (userExist.data.ok) {

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

                        values.amount = values.amount.replace(/\n/g, '<br />');

                        axios.post('/payment/create',
                            {
                                idClient: userExist.data.data.idClient,
                                amount: values.amount,
                                billImage: file.secure_url,
                                confirmationNumber: values.confirmationNumber
                            }
                        ).then(res => {

                            if (res.data.ok) {

                                document.getElementById('submit-button').disabled = false;

                                document.getElementsByName('dni')[0].value = '';
                                document.getElementsByName('amount')[0].value = '';
                                document.getElementsByName('confirmationNumber')[0].value = '';
                                document.getElementsByName('imagen')[0].value = [];

                                Swal.fire({
                                    icon: 'success',
                                    title: 'Done!',
                                    text: 'The payment report was successfully completed!',
                                    footer: 'SERVIMAINPER © 2023 - All Rights Reserved',
                                })

                            } else {

                                messageError('An error has occurred, please check the fields and try again.');

                            }

                        }).catch(err => {

                            console.log(err);
                            messageError('An error has occurred, please try again later.');

                        })

                    } else {

                        messageError('An error occurred while trying to upload the image, please check the image and try again.');

                    }

                } else {
                    messageError('You are not registered, please contact the service administrator.');
                }



            } else {

                messageError('Please fill in all fields.');

            }

            enableButton();



        } catch (e) {
            enableButton();
            console.log(e);
            messageError('An error has occurred, please try again later.');

        }
    }


    return (

        <>
            <div className="contact">
                <h2 className='h2-contact'>Payment report</h2>

                <div className='contact-form'>
                    <input name="dni" type="text" className="feedback-input" placeholder="Type your ID" onChange={handleInputChange} value={dni} required />
                    <input name="amount" type="text" className="feedback-input" placeholder="Amount to pay" onChange={handleInputChange} value={amount} required />
                    <input type="file" className='feedback-input' name="imagen" accept="image/png,image/jpeg,image/jpg" onChange={onChangeFile} />
                    <input name="confirmationNumber" type="text" className="feedback-input" placeholder="Receipt-confirmation Number" onChange={handleInputChange} value={confirmationNumber} required />
                    <br />
                    <br />
                    <button type="submit" placeholder='Send' className='button-contact' id='submit-button' onClick={handleSubmit}>Send</button>
                </div>
            </div>

        </>



    )
}

export default Upload;