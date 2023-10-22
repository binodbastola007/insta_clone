import {React , useState, useEffect} from 'react';
import "../css/Createpost.css";
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export const Createpost = () => {
   const [body, setBody] = useState("");
   const [image, setImage] = useState("");
   const [url, setUrl] = useState("");
   const navigate = useNavigate();

// Toast functions
const notifyA = (msg) => toast.error(msg)
const notifyB = (msg) => toast.success(msg);


   useEffect(() =>{

      if(url){
        fetch("http://localhost:5000/createPost",{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
        "Authorization":"Bearer "+ localStorage.getItem('jwt')
      },
      body:JSON.stringify({
        body,  // body here means caption of the posts
        pic:url  // url here is the url of our image that is provided by the cloudinary
      })
     }).then(res=>res.json())
     .then(data=>{if(data.error){
      notifyA(data.error)
     }
      else{
        notifyB("Sucessfully Posted")
        navigate("/")
      }
    })
     .catch(err => console.log(err))
      }
             // saving post to mongodb
     
   },[url])
   // posting image to cloudinary
   const postDetails = () =>{
    const data = new FormData();
    data.append("file",image);
    data.append("upload_preset","instaclone");
    data.append("cloud_name","cantacloud7");
    fetch("https://api.cloudinary.com/v1_1/cantacloud7/image/upload",{
      method : "POST",
      body:data
    }).then(res=>res.json())
    .then(data=> setUrl(data.url))
    .catch(err => console.log(err))

    
   }

    const loadfile = (event) =>{
        var output = document.getElementById('output');
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function() {
          URL.revokeObjectURL(output.src) // free memory
        }
    }
  return (
    <div className='createPost'>
     {/* // Header */}
         <div className='post-header'>
            <h4>Create New Post</h4>
            <button id='post-btn' onClick={()=> {postDetails()}}>Share</button>
         </div>   
         {/* image preview */}
         <div className='main-div'>
             <img id='output' src='https://freepngimg.com/thumb/instagram/118546-logo-instagram-free-hd-image.png'/>
            <input type='file' accept='image' onChange={(event) =>{loadfile(event)
              setImage(event.target.files[0])
            }}></input>
         </div>
       <div className='details'>
            <div className="card-header">
                 <div className='card-pic'>
                 <img src='https://images.unsplash.com/photo-1691389694412-266f872999c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=534&q=80' alt=''/>
                </div>
                <h5>Ramesh</h5>
            </div>
            <textarea value={body} onChange={(e)=>{
              setBody(e.target.value)
            }} type="text" placeholder='Write a caption'></textarea>
       </div>
    </div>
  )
}
