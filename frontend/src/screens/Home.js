import React, { useEffect, useState } from 'react';
import '../css/Home.css';
import { Link, json, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';



export const Home = () => {

  var picLink = 'https://as2.ftcdn.net/v2/jpg/04/83/90/95/1000_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg';

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState('');
  const [show, setShow] = useState(false);
  const [item,setItem] = useState([]);

   // Toast functions
   const notifyA = (msg) => toast.error(msg)
   const notifyB = (msg) => toast.success(msg);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      navigate("./signup");
    }
    // Fetching all posts
    fetch("http://localhost:5000/allposts", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('jwt')
      },
    }).then(res => res.json())
      .then(result => setData(result))
      .catch((err) => console.log(err))
  }, [])

  // to show and hide comments

  const toggleComment = (posts) => {
    if (show) {
      setShow(false);
    }
    else {
      setShow(true);
      setItem(posts);
    }
  }

  const likePost = (id) => {
    fetch("http://localhost:5000/like", {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result;
          }
          else {
            return posts;
          }
        })
        setData(newData);
        console.log(result)
      })
  }
  const unlikePost = (id) => {
    fetch("http://localhost:5000/unlike", {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result;
          }
          else {
            return posts;
          }
        })
        setData(newData);
        console.log(result)
      })
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
        const newData = data.map((posts) => {
          if (posts._id === result._id) {
            return result;
          }
          else {
            return posts;
          }
        })
        setData(newData);
        setComment('');
        notifyB("Comment posted");
        console.log(result);
      })
  }



  return (
    <div className='home'>
      {/* card */}
      {data.map((posts) => {
        return (
          <div className='card'>
            {/* card header */}
            <div className='card-header'>
              <div className='card-pic'>
                <img src={posts.postedBy.Photo ? posts.postedBy.Photo : picLink} alt='' />
              </div>
              <h5>
              <Link to={`/profile/${posts.postedBy._id}`}> {posts.postedBy.name}</Link>
               </h5>
            </div>
            {/* card image */}
            <div className='card-image'>
              <img src={posts.photo} alt='' />
            </div>
            {/* card content */}
            <div className='card-content'>
              {
                posts.likes.includes(JSON.parse(localStorage.getItem('user'))._id) ?
                  (
                    <span onClick={() => { unlikePost(posts._id) }} className="material-symbols-outlined material-symbols-outlined-red">favorite</span>

                  )
                  : (
                    <span onClick={() => { likePost(posts._id) }} className="material-symbols-outlined">favorite</span>
                  )
              }
              <p>{posts.likes.length} Likes</p>
              <p>{posts.body}</p>
              <p
                onClick={() => { toggleComment(posts) }} style={{ fontWeight: 'bold', cursor: 'pointer' }}>View all comments</p>
            </div>
            {/* add comment */}
            <div className='add-comment'>
              <span className="material-symbols-outlined">mood </span>
              <input value={comment} onChange={(e) => { setComment(e.target.value) }} type='text' placeholder='Add a comment'></input>
              <button onClick={() => { makeComment(comment, posts._id) }} className='comment'>Post</button>
            </div>
          </div>
        )
      })}
      {/* show comments */}
      {show &&
        (
          <div className='showComment'>
            <div className='container'>
              <div className='postPic'>
                <img src={item.photo} alt=''/>
              </div>
              <div className='details'>
                <div className='card-header' style={{ borderBottom: "1px solid black" }}>
                  {/* card header */}
                  <div className='card-header'>
                    <div className='card-pic'>
                      <img src={ item.postedBy.Photo ?item.postedBy.Photo : picLink} />   </div>
                    <h5>{item.postedBy.name}</h5>
                  </div>
                </div>
                {/* comment section */}
                <div className='comment-section' style={{ borderBottom: "1px solid black" }}>
                   {item.comments.map((comment)=>{
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

                  <p>{item.likes.length} likes</p>
                  <p>"{item.body}"</p>
                </div>
                {/* add comment */}
                <div className='add-comment'>
                  <span className="material-symbols-outlined">mood </span>
                  <input value={comment} onChange={(e) => { setComment(e.target.value) }} type='text' placeholder='Add a comment'></input>
                  <button
                    onClick={()=>{
                    makeComment(comment,item._id)
                    toggleComment()
                    }}
                    className='comment'>
                    Post</button>
                </div>
              </div>
            </div>
            <div className='close-comment'>
              <span  onClick={() => { toggleComment() }} className="material-symbols-outlined material-symbols-outlined-comment">close</span>
            </div>
          </div>
        )
      }


    </div>
  )
}
