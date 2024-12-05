import React, { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { myContext } from '../App'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { FaBarsStaggered } from "react-icons/fa6";

const Producted = () => {
  const { token } = useContext(myContext);
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  // Toggle function to open/close the Navbar
  const handleToggle = () => setToggle(!toggle);

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <div className="container-fluid" style={{ minHeight: '100vh' }}>
      {/* Mobile Navbar toggle button */}
      <div  className="toggler d-flex d-md-none align-items-center justify-content-end p-1 m-0" onClick={handleToggle}>
          <div className='bg-toggler  d-flex d-md-none align-items-center justify-content-center'>
          <FaBarsStaggered />
          </div>
      </div>

      <div className="row" style={{ minHeight: '100vh' }}>
        {/* Sidebar (Navbar) */}
        <div 
          className={`col-4 col-md-2 col-lg-1 bg-dark ${toggle ? 'd-flex' : 'd-none'} d-md-flex nav-bar bg-info`}
          style={{ height: '100vh', position: 'fixed', top: 0 }}
        >
          <Navbar handleToggle={handleToggle} />
        </div>

        {/* Main content area */}
        <div className="col-12 col-md-10 col-lg-11 content " 
          style={{
            marginLeft: 'auto',
            overflowY: 'auto',
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Producted;
