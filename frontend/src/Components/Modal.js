import React from 'react';
import { RiCloseLine} from 'react-icons/ri';
import "../css/Modal.css";
import { useNavigate } from 'react-router-dom';

const Modal = ({setModalOpen}) => {
    const navigate = useNavigate();
  return (
    <div onClick={()=>setModalOpen(false)}> 
       <div className='centered'>
           <div className='modal'>
       {/* modal header */}
       <div className='moadalHeader'>
        <h5 className='heading'>Confirm</h5>
       </div>
       <button className='closeBtn' onClick={()=>setModalOpen(false)}>
        <RiCloseLine></RiCloseLine>
       </button>
       {/* modal content */}
       <div className='modalContent'>
        Do you really want to logout ?
       </div>
       <div className='modalActions'>
        <div className='actionContainer'>
            <button onClick={()=>{
                setModalOpen(false);
                localStorage.clear();
                navigate('./signin')
            }} className='logOutBtn'>Log Out</button>
            <button onClick={()=>setModalOpen(false)} className='cancelBtn'>Cancel</button>
        </div>
       </div>
    </div>
    </div>
   
    </div>
  
  )
}

export default Modal