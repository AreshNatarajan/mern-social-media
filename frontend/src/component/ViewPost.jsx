import React, {useState, useEffect, useContext} from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import axios from 'axios';
import Loader from './Loader';
import { FaTrash} from 'react-icons/fa'
import { FaX } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { myContext } from '../App';


function ViewPost() {
    const [post, setPost] = useState('')
    const navigate = useNavigate()
    const {id, userid} = useParams();
    const {setUserDetail} = useContext(myContext)

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
  

    const fetchdata = async()=>{
      await  axios
        .get(`http://localhost:5000/app/singlepost`, {params : {id : id , userId : userid}})
        .then(res => {
            console.log(res);
            setPost(res.data.data)
        } )
        .catch(err => console.error(err));
    }

    const handleDeletePost  = async () =>{
     await  axios
        .delete("http://localhost:5000/app/deletepost", {params: {id : id , userId : userid}})
        .then(res =>{
          setUserDetail(res.data.data)
           if(res.status === 200){
            notifySuccess(res.data.message)
            setTimeout(() => {
              navigate('/profile')
            }, 2000);    
          }
        } )
        .catch(err => console.error(err));
    }

    useEffect(()=>{
       fetchdata()
    },[])

    console.log(post, 'single post');
    
     
    const PostDetails = ({post})=>{
      return <>
      <div className=' min-vh-100 d-flex align-items-center justify-content-center' >
        <div className="container  d-flex  align-items-center  flex-column p-3 ">
          <div className="cancel w-100 d-flex p-2  align-items-center justify-content-end">
            <Link className='text-decoration-none' to='/profile'><FaX fill='black' className='mx-3' /></Link>
          </div>
         <img className='singlepost-img ' src={post.image} alt="" />
         <div className="details mt-3 d-flex align-items-center justify-content-between">
            {/* <div className="likes d-flex align-items-center justify-content-start gap-2">
              <FaHeart style={{height:'24px'}} fill='red' /> <strong>{post.like}</strong>
            </div> */}
            <div className="likes d-flex align-items-center justify-content-start gap-2">
              <span>Posted at </span><strong>{post.createdAt.slice(0,7)}</strong>
            </div>
            <div  className="likes d-flex align-items-center justify-content-start gap-2">
              <FaTrash onClick={handleDeletePost} style={{height: '24px'}} fill='red' /> 
            </div>
         </div>
        </div>
      </div>
      </>
    }
  return (

    <div>
        {post ? <PostDetails post={post} /> : <Loader/>}
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
    </div>
  )
}

export default ViewPost