import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Play.css';

const Play = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='container'>
      
      <button className="single" onClick={() => navigate('/Single')}></button>
      
      <button className="multi" onClick={() => navigate('/mplay')}>
      </button>

      <div>
          <button className="set"></button>
      </div>

      <div>
          <button className="htp" onClick={() => setIsOpen(true)}></button>

          {isOpen && (
            <div className="popup">
              <div>
                <h4>
                  
                 <p> Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                </h4>
              </div>
              <button className="close-btn" onClick={() => setIsOpen(false)}>
                Close Pop-up
              </button>
            </div>
          )}
        </div>

    </div>
  );
};

export default Play;