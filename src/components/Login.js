import React, {useState} from 'react'
import axios from 'axios';
import Cookies from "universal-cookie"
import "./login.css"

function Login ({setIsAuth}) {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    
    const cookies=new Cookies();
    
    const login = () =>{

      axios.post("http://localhost:3002/login",{
        username,
        password,
      }).then((res) => {
        const { firstName, lastName, username, token, userId } = res.data;
            cookies.set("token", token);
            cookies.set("userId", userId);
            cookies.set("username", username);
            cookies.set("firstName", firstName);
            cookies.set("lastName", lastName);
            
            setIsAuth(true);
            
      });

    };

  return (
    <div className="login">
        <label>Login</label>
       

        <input className="inp" placeholder="Username"  onChange= {(event)=>{
            setUsername(event.target.value);
        } } 
        />

        <input className="inp" placeholder="Password" type="password" onChange= {(event)=>{
            setPassword(event.target.value);
        } } 
        />
    
    <button onClick ={login} >Login</button>
    
    
        
      
    </div>
  )
}

export default Login;
