import React, { useContext } from 'react'
import register from '../assets/AuthImg/heart.png'
import { myContext } from '../App'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {
  const { email, setEmail, password, setPassword, token, setToken, setUserDetail } = useContext(myContext)
  const navigate = useNavigate()

  const notifySuccess = (msg) => {
    toast.success(msg, {
        style: {
            width: '300px', margin :' 20px auto auto auto',  border :'1px solid black'
          },
        position: "top-center",
        autoClose: 1000,
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
            width: '300px', margin :'20px auto auto auto' , border :'1px solid black' 
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


  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("https://mern-social-media-backend-xqgq.onrender.com/app/login", { email: email, password: password })
      .then(res => {
        console.log(res, token);
        localStorage.removeItem('areshSocialMedia')
        localStorage.setItem('areshSocialMedia', res.data.token)
        setToken(localStorage.getItem('areshSocialMedia'))
        setUserDetail(res.data.userDetail);
        
        if (res.status === 200) {
          notifySuccess(res.data.message)
          setTimeout(()=>{
            navigate('/home')
          },2000)
        }
          
        if(res.status === 201){
          notifyError(res.data.message)
        }

      })
      .catch(err => console.error(err));
  }

  return (
    <>
    <div className="container-fluid min-vh-100 p-0 d-flex align-items-center justify-content-center">
     
     <div className="container d-flex align-items-center justify-content-center">
     <form className='form mt-3 mt-md-0 p-4 rounded-5 d-flex flex-column align-items-start justify-content-center' onSubmit={(e) => handleLogin(e)}>
     <img className='img-fluid auth-img' src={register} alt="auth" />
         <h2 className='mb-2'>Login</h2>
         <span className='fw-5 mb-2'>Hi, welcome back</span>
         <div className="form-group mb-3 w-100">
           <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Email' className="custom-form" id="email" />
         </div>
         <div className="form-group mb-3 w-100">
           <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} className="custom-form" id="pwd" />
         </div>
         <button type="submit" className="btn btn-default w-100 bg-white mb-3">Submit</button>
         <div className="form-group">
           <p>Don't have an account ? <Link to='/register' className='text-decoration-none'>Create account</Link></p>
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

export default Login
