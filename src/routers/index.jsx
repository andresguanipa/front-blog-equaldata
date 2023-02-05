import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios, { generateToken } from '../config/axios'
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import LoggedRoutes from './LoggedRoutes'
import { login, startLogout } from '../actions/auth';
import NotFound from '../pages/NotFound';

function AppRouter() {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);

    useEffect(() => {

        generateToken(localStorage.getItem('token'));

        axios.get('/user/')
            .then((res) => {

                if (res.data.ok) {
                    dispatch(login(res.data.user.id, res.data.user.username, localStorage.getItem('name'), res.data.user.img, localStorage.getItem('token')));

                } else {
                    dispatch(startLogout());

                }

                setChecking(false);


            }).catch((err) => {
                console.log(err)

            })

    }, [])


    if (checking) {
        return (
            <h1>Espere...</h1>
        )
    }


    return (
        <Routes>

            <Route path="/login" element={
                <PublicRoutes>
                    <Login />
                </PublicRoutes>
            } />

            <Route path="/signup" element={
                <PublicRoutes>
                    <SignUp />
                </PublicRoutes>
            } />

            <Route path="/*" element={
                <PrivateRoutes>
                    <LoggedRoutes />
                </PrivateRoutes>
            } />


        </Routes>
    )

}


export default AppRouter;