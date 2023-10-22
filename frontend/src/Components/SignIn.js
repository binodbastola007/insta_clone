import React,{useState , useEffect , useContext} from 'react'
import "../css/SignIn.css";
import logo2 from "../img/logo2.png";
import { Link,useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import { LoginContext } from '../context/LoginContext';

export const SignIn = () => {
   
  const {setUserLogin} = useContext(LoginContext);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

    // Toast functions
    const notifyA = (msg) => toast.error(msg)
    const notifyB = (msg) => toast.success(msg);
    
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const postData=()=>{
    // checking email
       if (!emailRegex.test(email)){
           notifyA("Invalid email");
           return;
       }
       
    //sending data to server
      fetch("http://localhost:5000/signin",{
        method:"post",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email:email,
          password:password
        })
      }).then(res=>res.json())
      .then((data) => { 
        if(data.error){
          notifyA(data.error);
        }
        else{
          notifyB("Signed In Sucessfully");
          localStorage.setItem("jwt",data.token)
          localStorage.setItem("user",JSON.stringify(data.user))
          setUserLogin(true);
          navigate("/");
        }
        })
   }

  return (
    <div className='signIn'>
      <div>
        <div className='loginForm'>
         <img className='signUpLogo' src={logo2} alt=''/>
         <div>
              <input type='email' name='email' id='email' placeholder='Email' value={email}
              onChange={(e) => {setEmail(e.target.value)}}
              />
         </div>        
         <div>
         <input type='password' name='password' id='password' placeholder='Password'  value={password}
          onChange={(e)=>{setPassword(e.target.value)}} 
              />
         </div>  
         <input type='submit' value="Sign In" id='login-btn' onClick={()=>{postData()}}/>   
        </div>
        <div className='loginForm2'>
          Don't have an account ? 
          <Link to="/signup" >
          <span style={{color:"yellow",cursor:"pointer"}}> Sign Up</span>
        </Link>
        </div>
       </div>
    </div>
  )
}
