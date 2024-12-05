import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { RiHome2Fill } from "react-icons/ri";
// import { FaUser } from "react-icons/fa";
// import { FaSearch } from "react-icons/fa";
// import { TbSquarePlus } from "react-icons/tb";
import { FaSquarePlus } from "react-icons/fa6";
import logo from '../assets/AuthImg/heart.png'
// import { FiLogOut } from "react-icons/fi";
import { FaSignOutAlt } from "react-icons/fa";
import { myContext } from '../App';
import emptyProfile from '../assets/emptyprofile.png'



const Navbar = ({ handleToggle }) => {
  const { setToken, userDetail } = useContext(myContext)
  console.log(userDetail);

  useEffect(() => {
  }, [userDetail])

  const handleLogout = () => {
    setToken('')
  }

  return (
    <div className='w-100 p-0 m-0 min-vh-100 navbar  d-flex flex-column align-items-center justify-content-between'>
      <div className="d-flex align-items-center jutify-content-between flex-column">
        <div className="logo d-flex align-items-center justify-content-center">
          <img src={logo} className='w-50 mt-3' alt="logo" />
        </div>
        <div className="nav d-flex flex-column align-items-start justify-content-start gap-2  mt-3">
          <Link onClick={handleToggle} className='text-decoration-none d-flex align-items-center justify-content-between gap-1 nav-links text-white' to='/home' ><RiHome2Fill fill='white' /> Home</Link>
          {/* <Link onClick={handleToggle} className='text-decoration-none d-flex align-items-center justify-content-between gap-1 nav-links' to='/home' ><FaSearch /> Search</Link> */}
          <Link onClick={handleToggle} className='text-decoration-none d-flex align-items-center justify-content-between gap-1 nav-links text-white' to='/newpost' ><FaSquarePlus fill='white' /> New</Link>
          {/* <Link onClick={handleToggle} className='text-decoration-none d-flex align-items-center justify-content-between gap-1 nav-links' to='/profile' ><TbSquarePlus /> New</Link> */}
        </div>
      </div>
      {/* profile? */}
      <div className="d-flex flex-column align-items-center justify-content-center mb-3">
        <Link onClick={handleToggle} to='/profile' className='d-flex align-items-center justify-content-center profile-img'>
        {userDetail.profilePhoto ? 
               <img style={{width:'100%', height:'100%', objectFit:"cover"}} src={userDetail.profilePhoto} className='' alt="profile" />
         :
                    <img style={{width:'100%', height:'100%', objectFit:"cover"}} src={emptyProfile} className='' alt="profile" />
            }
        </Link>
        <span className='text-white mt-1'>{userDetail.username}</span>
        <div onClick={handleLogout} className="div mt-3">
          <FaSignOutAlt fill='white' /><span className='text-white'> Logout</span>
        </div>
      </div>
    </div>
  )
}

export default Navbar