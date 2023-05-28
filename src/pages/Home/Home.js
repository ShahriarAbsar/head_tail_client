import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="over">
      <div className="background">
        <button className="button" onClick={() => navigate("/Play")}>
          {" "}
        </button>

        <div className="ball"></div>
        <div>
          <button className="settings"></button>
        </div>

        <div>
          <button className="HTP" onClick={() => setIsOpen(true)}></button>

          {isOpen && (
            <div className="popup">
              <div>
                <h4>
                  <br />

                  <br />

                  <p>
                    {" "}
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    
                  </p>
                </h4>
              </div>
              <button className="close-btn" onClick={() => setIsOpen(false)}>
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
