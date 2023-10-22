import React , {useEffect, useState} from 'react';
import '../css/PostDetail.css';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';


const PostDetail = ({item , toggleDetails}) => {

       var picLink = 'https://as2.ftcdn.net/v2/jpg/04/83/90/95/1000_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg';
 
       const navigate =useNavigate();
       const notifyA = (msg) => toast.error(msg)
       const notifyB = (msg) => toast.success(msg);
       const [comment, setComment] = useState('');
       const [data, setData] = useState(item);


       const removePost = (postId) => {
        if(window.confirm("Do you really want to delete this post ?")){
            fetch(`http://localhost:5000/deletePost/${postId}`,{
                method:"delete",
                headers:{
                    Authorization: "Bearer " + localStorage.getItem('jwt')
                }
             })
             .then((res)=>res.json())
             .then((result)=>{
                console.log(result);
                toggleDetails();
                navigate('/');
                notifyB(result.message);
             })
        }
               
                   
     }

     // function to make comment

  const makeComment = (text, id) => {
    console.log(text, id)
    fetch("http://localhost:5000/comment", {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        text: text,
        postId: id
      })
    }).then(res => res.json())
      .then((result) => {
        setData(result);
        setComment('');
        notifyB("Comment posted");
        window.location.reload();
        
      })
  }


  useEffect(()=>{
    console.log(data);
  },[])

   return (
    <div className='showComment'>
            <div className='container'>
              <div className='postPic'>
                <img src={data.photo}
                ></img>
                
              </div>
              <div className='details'>
                <div className='card-header' style={{ borderBottom: "1px solid black" }}>
                  {/* card header */}
                  <div className='card-header'>
                    <div className='card-pic'>
                      <img src={ data.postedBy.Photo ? data.postedBy.Photo : picLink} /> 
                      </div>
                    <h5>{data.postedBy.name}</h5>
                    <div className='deletePost' onClick={()=>{removePost(data._id)}}>
                    <span className="material-symbols-outlined">
                    delete
                    </span>
                    </div>
                  </div>
                </div>

                {/* comment section */}
                <div className='comment-section' style={{ borderBottom: "1px solid black" }}>
                   {data.comments.map((comment)=>{
                     return(
                      <p className='comm'>
                    <span className='commenter' style={{ fontWeight: 'bolder' }}>{comment.postedBy.name} </span>
                    <span className='commentText'>{comment.comment}</span>
                      </p>
                     )
                   })}
                  
                  
                </div>
                {/* card content */}
                <div className='card-content'>

                  <p>{data.likes.length} likes</p>
                  <p>"{data.body}"</p>
                </div>
                {/* add comment */}
                <div className='add-comment'>
                  <span className="material-symbols-outlined">mood </span>
                  <input 
                  value={comment} 
                  onChange={(e) => { setComment(e.target.value) }}
                   type='text' placeholder='Add a comment'></input>
                  <button
                    onClick={()=>{
                    makeComment(comment,data._id)
                    toggleDetails()
                    setData(data);
                    }}
                    className='comment'>
                    Post</button>
                </div>
              </div>
            </div>
            <div className='close-comment'>
              <span 
               onClick={() => { toggleDetails() }} 
               className="material-symbols-outlined material-symbols-outlined-comment">close</span>
            </div>
          </div>
  )
}

export default PostDetail;