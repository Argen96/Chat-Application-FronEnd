import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './public/signUp/signUp.js';
import LogIn from './public/login/logIn.js';
import ForgetPssw from './public/password/forgPssw.js';
import ResetPasswordPage from './public/password/resetPssw.js';

function App(){
    return (
        <BrowserRouter>
          <Routes>
            <Route path = '/' element = {<SignUp/>}> </Route>
            <Route path = '/log-in' element = {<LogIn />}> </Route>
            <Route path = '/forgot-password' element = {<ForgetPssw/>}> </Route>
            <Route path = '/reset-password' element = {<ResetPasswordPage/>}> </Route>
          </Routes>
      </BrowserRouter>
     );
    }

export default App
