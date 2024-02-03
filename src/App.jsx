import React, { useState } from 'react'
import './App.css'
import { Alert, Login, Signup, UserDetails } from './components/index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      type: type,
      msg: message
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  return (
    <BrowserRouter>
      <Alert alert={alert} />
      <Routes>
        <Route path='/' element={<Login showAlert={showAlert} />} />
        <Route path='/signup' element={<Signup showAlert={showAlert} />} />
        <Route path='/userdetails' element={<UserDetails showAlert={showAlert} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
