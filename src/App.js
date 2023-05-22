import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Play from "./pages/PlayMode/Play";
import Single from "./SinglePlay/Single";
//import Friend from "./FriendPlay/Friend";
import JoinGame from "./components/JoinGame";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Mplay from "./pages/Mplay/Mplay";
//import JoinGame from "./components/JoinGame";
//import Game from "./components/Game";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";

import Cookies from "universal-cookie";
import Quick from "./pages/QuickPlay/Quick";

function App() {
  const api_key = "z86yhp59u5se";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);

  const [isAuth, setIsAuth] = useState(false);
  
  const logout = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser();

    setIsAuth(false);
  };

  if (token) {
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          firstName: cookies.get("firstName"),
          lastName: cookies.get("lastName"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      )
      .then((user) => {
        setIsAuth(true);
      });
  }

  return (
    
    <div className="App">
    { isAuth ? (
      <Chat client={client}>
        <JoinGame />
        <button className="logout" onClick={logout}> Log Out</button>
      </Chat>
    ) : (
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/play" element={<Play />} />
          <Route path="/single" element={<Single />} />
          <Route path="/signup" element={ <SignUp setIsAuth = {setIsAuth} />} />
          <Route path="/login" element={ <Login  setIsAuth = {setIsAuth}/>} />
          <Route path="/joingame" element={<JoinGame />} />
          <Route path="/quick" element={<Quick />} />
          <Route path="/mplay" element={<Mplay />} />
          </Routes>
      </BrowserRouter>
      
    )}
  </div>
    
  );
};

export default App;

//////////////this is not the original //////////
