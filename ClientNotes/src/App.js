import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import Notes from './Components/UserNotes/Notes'
import AddNotes from './Components/UserNotes/AddNotes'
import UpdateNote from './Components/UserNotes/UpdateNote'


function App() {
  return (
    <>
      <BrowserRouter>
        {<Navbar />}
        <Routes>
          <Route path='/' element={<Notes />} />
          <Route path='/Auth/login' element={<Login />} />
          <Route path='/Auth/register' element={<Register />} />
          <Route path='/Notes/getUserNotes/:id' element={<Notes />} />
          <Route path='/Notes/addNotes/:id' element={<AddNotes />} />
          <Route path='/Notes/updateNotes/:id' element={<UpdateNote />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
