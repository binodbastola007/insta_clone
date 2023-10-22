import React ,{useEffect,useContext, useState} from 'react';
import '../css/Profile.css';
import PostDetail from '../Components/PostDetail';
import ProfilePic from '../Components/ProfilePic';

export const Profile = () => {
    var picLink = 'https://as2.ftcdn.net/v2/jpg/04/83/90/95/1000_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg';
    const [pic,setPic]=useState([]);
    const [show,setShow] = useState(false);
    const [posts,setPosts] = useState([]);
    const [changePic,setChangePic] = useState(false);
    const [user, setUser] = useState("")

  const toggleDetails = (posts) => {
    if (show) {
      setShow(false);
      setPosts(posts);
    }
    else {
      setShow(true);
      setPosts(posts);
    }
  }

  const changeprofile = ()=>{
    if(changePic){
      setChangePic(false);
    }
    else{
      setChangePic(true);
    }
  }

  
  useEffect(() => {
    fetch(`http://localhost:5000/user/${JSON.parse(localStorage.getItem("user"))._id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        setPic(result.post);
        setUser(result.user);
      });
  }, []);
  return (
    <div className='profile'>
        {/* Profile frame */}
        <div className='profile-frame'>
         {/* Profile-pic */}
          <div className='profile-pic'>
              <img
               onClick={changeprofile}
               src= {user.Photo ? user.Photo : picLink} alt='' />
        
          </div>
          {/* Profile-data */}
        <div className='profile-data'>
          <h1>{JSON.parse(localStorage.getItem('user')).name}</h1>
          <div className='profile-info'>
               <p>{ pic ? pic.length : "0"} posts</p>
               <p>{user.followers? user.followers.length : "0"} followers</p>
               <p>{user.following? user.following.length : "0"} following</p>
          </div>
        </div>
        </div>
        <hr style = {{width:"90%",opacity:"0.8", margin:"25px auto"}}/>
        {/* Gallery */}
        <div className='gallery'>
       {pic.map((pics)=>{
        return (
          <>
          <img key={pics._id} src={pics.photo}
           onClick={()=>toggleDetails(pics)}
           className='item'></img>
          </>
        )
       })}
        </div>
        {
          show && 
          (
            <PostDetail item={posts} toggleDetails={toggleDetails}/>
          )
        }
        {
          changePic && (<ProfilePic changeprofile={changeprofile}/>)
        }
    </div>
  )
}
