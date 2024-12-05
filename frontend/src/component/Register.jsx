import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import register from '../assets/AuthImg/heart.png'
import axios from "axios";
import {  useNavigate, Link } from 'react-router-dom';
import { myContext } from '../App';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


function Register() {
     const {username, setUsername, email, setEmail, password, setPassword}  = useContext(myContext)
     
     const notifySuccess = (msg) => {
        toast.success(msg, {
            style: {
                width: '300px', margin :' 20px auto auto auto', borderRadius : '10%' ,border :'1px solid black'
              },
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });                                                                                                                                                                                                                                               
     }

     const notifyError = (msg)=>{
        toast.error(msg, {
            style: {
                width: '300px', margin :'20px auto auto auto' , borderRadius : '10px', border :'1px solid black' 
              },
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
     }
      
    const navigate = useNavigate();
    const handelRegister = (e)=>{
       e.preventDefault()
        axios
         .post("https://mern-social-media-backend-xqgq.onrender.com/app/register", {username : username, email : email, password : password})
         .then(res => {
            console.log(res.data.message)
           if(res.status === 200){
            notifySuccess(res.data.message)
             setTimeout(() => {
                navigate('/')
             }, 2000);
           }

           if(res.status === 201){
            notifyError(res.data.message)
           }
         } 
           )
         .catch(err => {
            console.error(err)});  
    }
    return (
        <>
        <div   className='min-vh-100 container-fluid p-0 d-flex align-items-center justify-content-center '>
                  <div className="container  d-flex align-items-center justify-content-center ">
                   
                  <form className='form mt-3 mt-md-0 p-4 rounded-5 d-flex flex-column align-items-start justify-content-center' onSubmit={(e)=>handelRegister(e)}>
                  <img className='img-fluid auth-img' src={register} alt="auth" />
                            <h2 className='mb-2'>Register</h2>
                            <span className='fw-5 mb-2'>Hi, welcome back</span>
                            <div className="form-group mb-3 w-100">
                                
                                <input type="text" onChange={(e)=> setUsername(e.target.value)} placeholder='Username' className="custom-form" id="username" />
                            </div>
                            <div className="form-group mb-3 w-100">
                                
                                <input type="email" onChange={(e)=> setEmail(e.target.value)}  placeholder='Email' className="custom-form" id="email" />
                            </div>
                            <div className="form-group mb-3 w-100">
                               
                                <input type="password" onChange={(e)=> setPassword(e.target.value)}  placeholder='Password' className="custom-form" id="pwd" />
                            </div>
                            <button  type="submit" className="btn btn-default w-100 bg-white mb-3">Submit</button>
                            <div className="form-group">
                                <p>Already have account ? <Link to='/' className='text-decoration-none'>Login</Link></p>
                            </div>
                        </form>
                  </div>
        </div>

      

        <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"

/>

        </>
        
    )
}

export default Register