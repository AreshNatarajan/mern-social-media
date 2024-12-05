import React, { useState, useContext } from 'react'
import axios from 'axios'
import { myContext } from '../App';
import { MdCloudUpload } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProfileUpdate = () => {
  const navigate = useNavigate();
  const namel = 15
  const biol = 200
  const { setUserDetail, userDetail } = useContext(myContext)
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [username, setUsername] = useState(userDetail.username)
  const [bio, setBio] = useState(userDetail.bio)
  const [imageUrl, setImageUrl] = useState('')

  const notifySuccess = (msg) => {
    toast.success(msg, {
        style: {
            width: '300px', margin :' 20px auto auto auto',  border :'1px solid black'
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


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageName(file.name);
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    }
  };

  const handleCnacelUpload = () => {
    setImage('')
    setImageName('')
    setBio('')
    setUsername('')
    navigate('/profile')
  }

  const addname = (e) => {
    let namevalue = e.target.value
    setUsername(namevalue.slice(0, namel))
  }

  const addbio = (e) => {
    let biovalue = e.target.value
    setBio(biovalue.slice(0, biol))
  }

  const handleImageUpload = async () => {
   
    if(!image){
      notifyError('Image required')
      return
    }

    if(!username){
      notifyError('Username is required')
      return
    }

    if(!bio){
      notifyError('Bio is required')
      return
    }
   
    const formData = new FormData();
    formData.append('image', image)
    formData.append('id', userDetail._id)
    formData.append('bio', bio)
    formData.append('username', username)
    // here if condtion !
    await axios
      .post("https://mern-social-media-backend-xqgq.onrender.com/app/profile", formData, { headers: { 'Content-Type': 'multipart/form-data', } })
      .then(res => {
        setUserDetail(res.data.user)
      
        if(res.status === 200){
          notifySuccess(res.data.message)
          setTimeout(() => {
            navigate('/profile')
          }, 2000);
        }

        if(res.status === 201){
          notifyError(res.data.message)
        }
        
      })
      .catch(err => console.error(err));
  }

  return (
    <>
    <div className=' min-vh-100 d-flex align-items-center justify-content-center flex-column'>
      
      <div className='d-flex align-items-center justify-content-center flex-column p-3  rounded-4 newpostdiv'>
      <div className='w-100 '>
          <h4 className='text-start'>Edit profile</h4>
        </div>
        {image ? <img className='img-fluid' src={imageUrl} alt="" /> : <div onClick={() => document.querySelector('.input-field').click()} className="form-div d-flex align-items-center justify-content-center flex-column rounded-4 w-100 ">
          <input type="file" className='input-field' onChange={handleImageChange} required hidden />
          <MdCloudUpload className='fs-2' />
          <span className='mt-2'>{imageName}</span>
        </div>}
        <div className='w-100' >
          <input placeholder='User name' onChange={(e) => addname(e)} value={username} type="text" className='upload-form w-100 mt-3' />
          <span className='mt-1'>Remaining {namel - username.length}</span>
        </div>
        <div className='w-100'>
          <textarea placeholder='Bio' style={{ height: '50px' }} type="text" onChange={(e) => addbio(e)} value={bio} className='upload-form w-100 mt-3' />
          <span>Remaining {biol - bio.length}</span>
        </div>
        <div className="btn-group w-100">
          <button className="btn w-100 mt-3 bg-warning" onClick={handleCnacelUpload}>Cancel</button>
          <button className='btn w-100  mt-3 bg-primary' onClick={handleImageUpload} >Edit</button>
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

export default ProfileUpdate