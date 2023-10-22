import React, { useEffect , useState } from 'react';
import logo from '../img/logo.png';
import '../css/SignUp.css';
import { Link ,useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';

export const SignUp = () => {
     const navigate = useNavigate();
     const [name,setName] = useState("");
     const [email,setEmail] = useState("");
     const [userName,setUsername] = useState("");
     const [password,setPassword] = useState("");
    
    // Toast functions
    const notifyA = (msg) => toast.error(msg);
    const notifyB = (msg) => toast.success(msg);
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

    const postData=()=>{
      // checking email
         if (!emailRegex.test(email)){
             notifyA("Invalid email");
             return;
         }
         else if(!passRegex.test(password)){
             notifyA("Password must be 7 to 15 characters with at least an uppercase letter , a number and a special character.");
             return;
         }
         
      //sending data to server
        fetch("http://localhost:5000/signup",{
          method:"post",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            name:name,
            email:email,
            userName:userName,
            password:password
          })
        }).then(res=>res.json())
        .then((data) => { 
          if(data.error){
            notifyA(data.error);
          }
          else{
            notifyB(data.message);
            navigate("/signin");
          }
          console.log(data);
          })
     }
  return (
    <div className='signUp'>
        <div className='form-container'>
          <div className='form'>
          <img className='signUpLogo' src={logo} alt=''/>
          <p className='loginPara'>
            Sign up to see photos and videos <br/> from your friends
          </p>
          <div>
            <input type='email' name='email' id='email' placeholder='Email' value={email}
              onChange={(e) => {setEmail(e.target.value)}}
            />
          </div>
          <div>
            <input type='text' name='name' id='name' placeholder='Name' value={name} onChange={(e)=>{setName(e.target.value)}} />
          </div>
          <div>
            <input type='text' name='username' id='username' placeholder='Username'  value={userName}
             onChange={(e)=>{setUsername(e.target.value)}}
             />
          </div>
          <div>
            <input type='password' name='password' id='password' placeholder='Password'  value={password}
             onChange={(e)=>{setPassword(e.target.value)}}
              />
          </div>
          <p className='LoginPara' style={{fontSize:"12px",margin:"3px"}}>
            By signing up, you agree to our Terms, <br/>
             privacy policy and 
            cookies policy.
          </p>

          <input type='submit' id='submit-btn' value="Sign up" onClick={()=>{postData()}}/>
          </div>
          <div className='form2'>
            Already have an account?
            <Link to="/signin">
            <span style={{color: "yellow", cursor:"pointer"}}> Sign in</span>
            </Link>
          </div>
        </div>
    
    </div>
  )
}
