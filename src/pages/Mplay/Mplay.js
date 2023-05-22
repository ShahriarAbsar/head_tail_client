import React from 'react'
import { useNavigate } from 'react-router-dom';
function Mplay () {
  const navigate = useNavigate();
  return (
    <div className='container'>
      <button className="button1" onClick={() => navigate('/signup')}>
        Signup
      </button>

      <button className="button1" onClick={() => navigate('/quick')}>
        Quick Play
      </button>
      
      <button className="button1" onClick={() => navigate('/login')}>
        Play with a Friend
      </button>
    </div>
  )
}

export default Mplay
