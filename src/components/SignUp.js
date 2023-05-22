import React, {useState} from 'react'
import  axios  from 'axios';
import Cookies from "universal-cookie"
import "./signup.css"

function SignUp ({setIsAuth}) {
    const cookies =new Cookies();
    const[user,setUser] = useState(null);
    const signup =()=>{

        axios.post("http://localhost:3002/signup",user).then(res =>
        {
            const {token,userId,firstName,lastName,username,hashedPassword} = 
            res.data;
            cookies.set("token", token);
            cookies.set("userId", userId);
            cookies.set("firstName", firstName);
            cookies.set("lastName", lastName);
            cookies.set("username", username);
            cookies.set("hashedPassword", hashedPassword);
            setIsAuth(true);
        });
    };
  return ( 
    
    <div className="signUp">
        <label>Sign Up to Play</label>
        <input className="inp" placeholder="First Name" onChange= {(event)=>{setUser({...user,firstName: event.target.value});
    }
        } />

        <input className="inp" placeholder="Last Name" onChange= {(event)=>{setUser({...user,lastName: event.target.value});
    }
        } />

        <input className="inp" placeholder="Username" onChange= {(event)=>{setUser({...user,username: event.target.value});
    }
        } />

        <input className="inp" placeholder="Password" type="password" onChange= {(event)=>{setUser({...user,password: event.target.value});
    }
        } />

    <button onClick={signup}>Signup</button>
        
      
    </div>
  )
}

export default SignUp;
