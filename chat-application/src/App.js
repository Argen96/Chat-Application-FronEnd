import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './public/signUp/signUp.js';
import LogIn from './public/login/logIn.js';

function App(){
    return (
        <BrowserRouter>
          <Routes>
            <Route path = '/' element = {<SignUp/>}> </Route>
            <Route path = '/log-in' element = {<LogIn />}> </Route>
          </Routes>
      </BrowserRouter>
     );
    }


export default App