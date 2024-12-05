import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { myContext } from '../App'
import { MdCloudUpload } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Post = () => {

  const { userDetail, setUserDetail } = useContext(myContext)
  const [image, setImage] = useState(null)
  const [content, setContent] = useState('')
  const conentLength = 100
  const [imagename, setImageName] = useState('')
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate()
  useEffect(() => { }, [userDetail])

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


  const handleSetImage = (e) => {
    let file = e.target.files[0]

    console.log(file.type);
    
    if (file) {
      const isImage = /image\//.test(file.type);
      if (isImage) {
        setImage(file)
        setImageName(file.name)
        const imageUrl = URL.createObjectURL(file);
        setImageUrl(imageUrl);
      }else{
        notifyError('Only image files are allowed!')
      }
     
    }
  }
  const handleContent = (e) => {
    let contentvalue = e.target.value;
    setContent(contentvalue.slice(0, conentLength));
  }
  const handleUpload = () => {

     if(!image){
      notifyError('Image requierd')
      return
     }

     if(!content){
      notifyError('Content required ')
      return
     }

    const formData = new FormData()
    formData.append('image', image);
    formData.append('content', content)
    formData.append('id', userDetail._id)
    axios
      .post("http://localhost:5000/app/newpost", formData, { headers: { 'Content-Type': 'multipart/form-data', } })
      .then(res => {
        console.log(res.data);
        setUserDetail(res.data.data)
        if (res.status === 200) {
          notifySuccess(res.data.message)
          setTimeout(() => {
            navigate('/profile')
          }, 1000);
        }

        if(res.status === 201){
          notifyError(res.data.message)
        }
        
      })
      .catch(err => console.error(err));
  }

  const handleCancel = () => {
    setImage('')
    setImageUrl('')
    setImageUrl('')
    setImageName('')
  }

  return (

    <>
     <div className='min-vh-100 d-flex align-items-center flex-column justify-content-center '>

<div className="div newpostdiv">
  <div className='w-100 '>
    <h4 className='text-start'>New Post</h4>
  </div>
  {image ? (<div className='mb-3'>
    <img className='img-fluid' src={imageUrl} alt="" />
  </div>) : (<div className="div mb-3 form-div d-flex align-items-center justify-content-center flex-column rounded-4 w-100" onClick={() => document.querySelector('.post-file').click()}>
    <input onChange={handleSetImage} className='post-file' type="file" hidden />
    <MdCloudUpload className='fs-2' />
  </div>)}
  <span className='mt-3'><strong>{imagename}</strong></span>
  <textarea value={content} onChange={handleContent} className='newposttextarea mt-3' placeholder='Content here...' id=""></textarea>
  <div className="btn-group w-100 mt-3">
    <button className='btn btn-primary' onClick={handleUpload}>upload</button>  <button className='btn btn-warning' onClick={handleCancel}>Cancel</button>
  </div>
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

export default Post