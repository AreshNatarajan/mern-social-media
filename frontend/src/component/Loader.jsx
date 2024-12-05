import React from 'react'

function Loader() {
  return (
    <div className='min-vh-100 d-flex align-items-center justify-content-center w-100  '>
        <div>
          <div className="loader"></div>
          <span className='mt-2'><strong>Loading...</strong></span>
        </div>
    </div>
  )
}

export default Loader

// d-flex 