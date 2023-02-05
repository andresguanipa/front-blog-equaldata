import React from 'react'
import { Navigate } from 'react-router-dom'

export const PublicRoutes = ({ children }) => {

    const auth = localStorage.getItem('token');

    return auth !== ''  ?
        <Navigate to="/" />
        : children

}