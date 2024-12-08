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
import Detailspage from './components/details';
import Postdetails from './components/postDetails';
function App() {
 
const [user,setUser]=useState("");
const [userimg,setuserimg]=useState("");
console.log(userimg);  
// console.log(user);

  return (
    <>
    <BrowserRouter>
    {user && <Nav userimg={userimg} user={user} />}
      <Routes>
    <Route path="/" element={<HomePage setUser={setUser}/>}></Route>

      <Route path="/changepass" element={<ChangePass/>}></Route>
      <Route path="/verify" element={<Verify/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/profile" element={<Profile setuserimg={setuserimg} />} />
      <Route path="/createbio/:id" element={<Createbio/>}></Route>
      <Route path="/edit/:id" element={<Editbio/>}></Route>
      <Route path="/addphoto" element={<Addphoto/>}></Route>
      <Route path="/details/:id" element={<Detailspage/>}></Route>
      <Route path="/postdetails/:id" element={<Postdetails/>}></Route>


      


      

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
