import React, {createContext, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route} from 'react-router-dom'
import Login from './component/Login'
import Register from './component/Register'
import Producted from './component/Producted'
import Home from './component/Home'
import Profile from './component/Profile'
import Post from './component/Post'
import ProfileUpdate from './component/ProfileUpdate'
import ViewPost from './component/ViewPost'
import Singlepost from './component/Singlepost'


export const myContext = createContext();

function App() {
  const [userDetail, setUserDetail] = useState([])
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [token, setToken] =  useState('');
  const [allusers, setAllusers] = useState(null)

  return (
    <>
       <myContext.Provider value={{username, setUsername, email, setEmail, password, setPassword,message, setMessage, token, setToken, userDetail, setUserDetail, allusers, setAllusers} }>
       <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route element={<Producted/>}>
            <Route path='/home' element={<Home/>} />
            <Route path='/updteprofile' element={<ProfileUpdate/>} />
            <Route path='/newpost' element={<Post/>} />
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/post/:id/:userid' element={<ViewPost/>}/>
            <Route path='/singlepost/:userid'  element={<Singlepost/>} />
          </Route>
        </Routes>
       </myContext.Provider>
    </>
  )
}

export default App