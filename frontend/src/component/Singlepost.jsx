
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { myContext } from '../App';
import emptyProfile from '../assets/emptyprofile.png'
import Loader from './Loader';





function Singlepost() {
  const { userid } = useParams();  // Destructure the userid from URL params
  const { allusers } = useContext(myContext);
  const [seletectedUser, SetSeletectedUser] = useState(null)

  useEffect(() => {
    console.log(allusers, 'allusers');
    console.log(userid, 'user id');

    const user = allusers.filter((user) => user._id === userid)
    SetSeletectedUser(user)


  }, [allusers, userid])

  console.log(seletectedUser, 'seletected user');

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
          <div key={item._id}>
            <img  className='post-images' src={item.image} alt={data.image} />
            <div className="likes d-flex align-items-center justify-content-between gap-2  ">
             <span className='createdby'>Created at <strong>{item.createdAt.slice(0,7)}</strong></span>
             <strong className='content'>{item.content}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>)
  }

  const UserDetails = ({ data }) => {
    return (
      <>
        <div className='w-100' >
          <div className="profile-content  d-flex flex-column flex-md-row gap-3 align-items-center  justify-content-evenly    w-100">
            <div className=' d-flex flex-column align-items-center  flex-column justify-content-center  p-3 '>
              <div className="profile-image d-flex align-items-center  justify-content-center">

                {data.profilePhoto ? (<img style={{ width: '100%', height: '100%', objectFit: "cover" }} className='m-auto' src={data.profilePhoto} alt="" />
                ) : (<img style={{ width: '100%', height: '100%', objectFit: "cover" }} className='m-auto' src={emptyProfile} alt="" />
                )}

              </div>
              <h4 className='display-3 mt-3 fw-4'>{data.username}</h4>
              <span><strong>{data.bio}</strong></span>

            </div>
          </div>
          <div className="post-list w-100">
            {data.posts ? <PostList data={data.posts} /> : <NoprofileExist />}
          </div>
        </div>
      </>
    )
  }


  return (
    <>

      {seletectedUser ? <UserDetails data={seletectedUser[0]} /> : <Loader />}

    </>
  );
}

export default Singlepost;
