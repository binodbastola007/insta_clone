import React, { useContext } from 'react'
import logo from '../img/logo.png';
import '../css/Navbar.css'
import { Link } from 'react-router-dom';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import { Profile } from '../screens/Profile';
import { LoginContext } from '../context/LoginContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ login }) => {
  const { setModalOpen } = useContext(LoginContext);
  const navigate = useNavigate();

  const loginStatus = () => {
    const token = localStorage.getItem('jwt');
    if (login || token) {
      return [
        <>
          <Link to="/profile"><li>Profile</li> </Link>
          <Link to="/createPost"><li>Create post</li> </Link>
          <Link to="/followingpost"><li>My Following</li> </Link>
          <Link to={''}>
            <button onClick={() => setModalOpen(true)} className='primaryBtn' >
              Log Out
            </button>
          </Link>
        </>
      ]
    }
    else {
      return [
        <>
          <Link to="/signup"> <li>SignUp</li> </Link>
          <Link to="/signin"> <li>SignIn</li></Link>
        </>
      ]
    }
  }

  const loginStatusMobile = () => {
    const token = localStorage.getItem('jwt');
    if (login || token) {
      return [
        <>
          <Link to="/">
            <li>
              <span class="material-symbols-outlined">home</span>
            </li>
          </Link>


          <Link to="/profile"><li><span class="material-symbols-outlined">
            account_circle
          </span></li>
          </Link>

          <Link to="/createPost"><li><span class="material-symbols-outlined">
            add_box
          </span></li> </Link>

          <Link to="/followingpost"><li><span class="material-symbols-outlined">
            explore
          </span></li> </Link>
          <Link to={''}>
            <li onClick={() => setModalOpen(true)} >
              <span class="material-symbols-outlined">
                logout
              </span>
            </li>
          </Link>
        </>
      ]
    }
    else {
      return [
        <>
          <Link to="/signup"> <li>SignUp</li> </Link>
          <Link to="/signin"> <li>SignIn</li></Link>
        </>
      ]
    }
  }

  return (
     <>
      <img id='insta-mobilelogo' src={logo} alt='' onClick={() => { navigate('/') }} />
      <div className='navbar'>
      <img id='insta-logo' src={logo} alt='' onClick={() => { navigate('/') }} />
      <ul className='nav-menu'>
        {loginStatus()}
      </ul>
      <ul className='nav-mobile'>
        {loginStatusMobile()}
      </ul>
    </div>
     </>
   
  )
}

export { Navbar };
