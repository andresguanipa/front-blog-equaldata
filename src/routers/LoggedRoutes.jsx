import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Blog from '../pages/Blog';
import Home from '../pages/Home';
import Upload from '../pages/Upload';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';

function LoggedRoutes() {

    return (
        <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/blog/:id' element={<Blog />} />
            <Route path='/upload' element={<Upload />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/*' element={<NotFound />}></Route>
        </Routes>
    )

}


export default LoggedRoutes;