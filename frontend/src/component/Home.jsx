import React, { useEffect, useState, useContext } from 'react'
import axios from "axios";
import Loader from './Loader'
import { Link } from 'react-router-dom'

import { myContext } from '../App';

const Home = () => {

 
  
  const [allpost, setAllpost] = useState(null)
  const { setAllusers } = useContext(myContext)
 
  const fetchData = async () => {
    axios
      .get("https://mern-social-media-backend-xqgq.onrender.com/app/getallpost")
      .then(res => {
        setAllpost(res.data.data)
        setAllusers(res.data.users)
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    fetchData()
  }, [])


  // const handleLike = () => {
  //   setLiked(!isLiked)
  // }


  const AllPost = ({ data }) => {
    

    return <>
      <div className="container-fluid">
        <div className="photo-container">
          {data.map((item) => (
            <div key={item._id} className="home-images text-decoration-none">
              <Link to={`/singlepost/${item.userID}`} key={item._id}>
                <img className='img-fluid' src={item.image} alt={item.image} />
              </Link>
              <div className="content-likes mt-2 d-flex align-items-start flex-column justify-content-start gap-1">
                <div className="user-profile d-flex align-items-start justify-content-start gap-2 ">
                  <span>Created by</span><strong>{item.username}</strong>
                </div>
                <div className="content"><span><strong>{item.content}</strong></span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  }

  return (
    <>
      {allpost ? <AllPost data={allpost} /> : <Loader />}
    </>
  )
}

export default Home


// home-images