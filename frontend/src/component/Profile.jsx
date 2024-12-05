import React, { useContext, useEffect } from 'react'
import { myContext } from '../App'
import { Link } from 'react-router-dom'
import emptyProfile from '../assets/emptyprofile.png'


const Profile = () => {
    const { userDetail } = useContext(myContext)
    useEffect(()=>{
        
    },[userDetail])
    const NoprofileExist = () => {
        return <>
            <div className="w-100 d-flex align-items-center justify-content-center">
                <h4 className='mt-3'>No post yet</h4>
            </div>
        </>
    }

    const PostList = ({ data }) => {
        console.log(data, 'data');

        return (<div className="container-fluid">
            <div className="photo-container">
                {data.map((item) => (
                     <Link key={item._id} to={`/post/${item._id}/${userDetail._id}`}>
                        <img className='post-images' src={item.image} alt={data.image} />
                    </Link>
                ))}
            </div>
        </div>)
    }
    return (
        <div className='w-100' >
            <div className="profile-content  d-flex flex-column flex-md-row gap-3 align-items-center  justify-content-evenly    w-100">
                <div className=' d-flex flex-column align-items-center  flex-column justify-content-center  p-3 '>
                    <div className="profile-image d-flex align-items-center  justify-content-center">

                        {userDetail.profilePhoto ? (<img style={{ width: '100%', height: '100%', objectFit: "cover" }} className='m-auto' src={userDetail.profilePhoto} alt="" />
                        ) : (<img style={{ width: '100%', height: '100%', objectFit: "cover" }} className='m-auto' src={emptyProfile} alt="" />
                        )}

                    </div>
                    <h4 className='display-3 mt-3 fw-4'>{userDetail.username}</h4>
                    <span><strong>{userDetail.bio}</strong></span>
                    <div className="edit-option mt-3  w-100 ">
                        <Link to='/updteprofile' className='btn btn-primary w-100'>
                            Edit Profile
                        </Link>
                    </div>
                </div>


            </div>
            <div className="post-list w-100">
                {userDetail.posts ? <PostList data={userDetail.posts} /> : <NoprofileExist />}
            </div>
        </div>
    )
}

export default Profile