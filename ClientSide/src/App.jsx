import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChangePass from './components/Changepass';
import Verify from './components/Verify';
import Register from './components/Register';
import Login from './components/Login';

import HomePage from './components/HomePage';
import Nav from './components/Nav';
import Profile from './components/Profile';
import Createbio from './components/createbio';
import Editbio from './components/editbio';
import Addphoto from './components/addphoto';
// import { useState } from 'react';
function App() {
 
const [user,setUser]=useState("");
  return (
    <>
    <BrowserRouter>
{user &&  <Nav user={user}/>}
      <Routes>
    <Route path="/" element={<HomePage setUser={setUser}/>}></Route>

      <Route path="/changepass" element={<ChangePass/>}></Route>
      <Route path="/verify" element={<Verify/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/profile" element={<Profile/>}></Route>
      <Route path="/createbio/:id" element={<Createbio/>}></Route>
      <Route path="/edit/:id" element={<Editbio/>}></Route>
      <Route path="/addphoto" element={<Addphoto/>}></Route>



      

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
