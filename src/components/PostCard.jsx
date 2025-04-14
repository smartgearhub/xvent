import React, { useState, useEffect } from 'react';
import './PostCard.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FaThumbsUp, FaCommentDots, FaShare, FaCalendarAlt, FaMapMarkerAlt,
  FaUser, FaMedal, FaPlay, FaFacebookF, FaTwitter, FaLinkedinIn
} from 'react-icons/fa';
import { db } from '../firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { auth } from '../firebase';

const PostCard = ({ post, onLike, onAddComment }) => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [likes, setLikes] = useState(post.likes || 0);
  const [comments, setComments] = useState(post.comments || []);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();
  const userId = post.userId;



  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setCurrentUser({
        name: user.displayName || 'User',
        email: user.email
      });
    }
  }, []);

  const handleLike = async () => {
    const postRef = doc(db, 'posts', post.id);
    await updateDoc(postRef, {
      likes: likes + 1
    });
    setLikes(likes + 1);
  };



  const handleAddComment = async () => {
    if (commentText.trim() !== '' && currentUser) {
      const postRef = doc(db, 'posts', post.id);
      const newComment = {
        username: currentUser.name,
        content: commentText,
        time: new Date().toISOString()
      };

      await updateDoc(postRef, {
        comments: arrayUnion(newComment)
      });

      setComments([...comments, newComment]);
      setCommentText('');
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const postTime = new Date(timestamp);
    const now = new Date();
    const diff = (now - postTime) / 1000;

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return postTime.toLocaleDateString();
  };
  

  const renderPostContent = () => {
    switch (post.type) {
      case 'event':
        return (
          <div className="event-details">
            <p>{post.content}</p>
            <p><FaCalendarAlt /> Date: {post.eventDate}</p>
            <p><FaMapMarkerAlt /> Venue: {post.venue}</p>
            <p><FaUser /> Organizer: {post.organizer}</p>
            <p>Category: {post.category}</p>
            {post.image && <img src={post.image} alt="Event" className="post-image" />}
          </div>
        );
      case 'achievement':
        return (
          <div className="achievement-details">
            <p>{post.content}</p>
            <p><FaMedal /> Competition: {post.competition}</p>
            <p>Placement: {post.placement}</p>
            {post.image && <img src={post.image} alt="Achievement" className="post-image" />}
          </div>
        );
      case 'video':
        return (
          <div className="video-post">
            <p>{post.content}</p>
            {post.video && (
              <video className="post-video" controls>
                <source src={URL.createObjectURL(post.video)} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        );
      default:
        return (
          <div className="normal-post">
            <p>{post.content}</p>
            {post.image && <img src={post.image} alt="Post" className="post-image" />}
          </div>
        );
    }
  };

  return (
    <motion.div
      className="post-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="post-header">
        <button className="profile-pic-letter" onClick={() => navigate(`/profile/${userId}`)}>
          {post.username?.charAt(0)?.toUpperCase() || 'U'}
        </button>
        <div className="post-user-info" onClick={() => navigate(`/profile/${userId}`)}  >
         
          <h3 >{post.username || 'Anonymous'}</h3>
         
          <span>{formatTime(post.time)}</span>
        </div>
      </div>

      <div className="post-content">
        {renderPostContent()}
      </div>

      <div className="post-actions">
        <button onClick={handleLike}><FaThumbsUp /> Like ({likes})</button>
        <button onClick={() => setShowCommentBox(!showCommentBox)}><FaCommentDots /> Comment</button>
        <button onClick={() => setShowSharePopup(!showSharePopup)}><FaShare /> Share</button>
      </div>

      {showCommentBox && (
        <div className="comment-section">
          <input
            type="text"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button onClick={handleAddComment}>Post</button>
          <div className="comment-list">
            {comments.map((comment, index) => (
              <div key={index} className="comment">
                <strong>{comment.username}</strong> · <span>{formatTime(comment.time)}</span>
                <p>{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {showSharePopup && (
        <div className="share-popup">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
        </div>
      )}
    </motion.div>
  );
};

export default PostCard;
