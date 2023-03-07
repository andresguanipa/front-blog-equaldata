import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Blog from '../pages/Blog';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';

function LoggedRoutes() {

    return (
        <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/blog/:id' element={<Blog />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/*' element={<NotFound />}></Route>
        </Routes>
    )

}


export default LoggedRoutes;