import React, { useState, useRef } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import './CreatePost.css';
import { FaRegImage, FaCalendarAlt, FaMedal, FaVideo } from 'react-icons/fa';

const CreatePost = () => {
  const [postType, setPostType] = useState('post');
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [eventDate, setEventDate] = useState('');
  const [venue, setVenue] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [category, setCategory] = useState('');
  const [competition, setCompetition] = useState('');
  const [placement, setPlacement] = useState('');
  const [achievementImage, setAchievementImage] = useState(null);

  const postImageRef = useRef();
  const videoRef = useRef();
  const eventImageRef = useRef();
  const achievementImageRef = useRef();

  const handleFileClick = (ref) => {
    if (ref.current) ref.current.click();
  };

  const handlePost = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    const newPost = {
      username: user?.displayName || 'Anonymous',
      profilePic: user?.photoURL || null,
      userId: user?.uid, // ✅ Add this line!
      time: serverTimestamp(),
      type: postType,
      content: text,
      likes: 0,
      likedByUser: false,
      comments: []
    };
  
    if (postType === 'post') newPost.image = image;
    if (postType === 'video') newPost.video = video;
    if (postType === 'event') {
      newPost.eventDate = eventDate;
      newPost.venue = venue;
      newPost.organizer = organizer;
      newPost.category = category;
      newPost.image = image;
    }
    if (postType === 'achievement') {
      newPost.competition = competition;
      newPost.placement = placement;
      newPost.image = achievementImage;
    }
  
    try {
      await addDoc(collection(db, 'posts'), newPost);
      console.log('Post created successfully');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  
    // Clear inputs
    setText('');
    setImage(null);
    setVideo(null);
    setEventDate('');
    setVenue('');
    setOrganizer('');
    setCategory('');
    setCompetition('');
    setPlacement('');
    setAchievementImage(null);
  };
  
  const renderFormFields = () => {
    switch (postType) {
      case 'post':
        return (
          <>
            <textarea
              className='textareas'
              placeholder="What's on your mind?"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              ref={postImageRef}
              onChange={(e) => setImage(e.target.files[0])}
              className="hidden"
            />
            <button onClick={() => handleFileClick(postImageRef)} className="upload-btn">Upload Image</button>
          </>
        );
      case 'video':
        return (
          <>
            <textarea
              className='textareas'
              placeholder="Describe your video post"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <input
              type="file"
              accept="video/*"
              ref={videoRef}
              onChange={(e) => setVideo(e.target.files[0])}
              className="hidden"
            />
            <button onClick={() => handleFileClick(videoRef)} className="upload-btn">Upload Video</button>
          </>
        );
      case 'event':
        return (
          <>
            <textarea
              className='textareas'
              placeholder="Describe the event"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
            <input type="text" placeholder="Venue" value={venue} onChange={(e) => setVenue(e.target.value)} />
            <input type="text" placeholder="Organizer" value={organizer} onChange={(e) => setOrganizer(e.target.value)} />
            <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
            <input
              type="file"
              accept="image/*"
              ref={eventImageRef}
              onChange={(e) => setImage(e.target.files[0])}
              className="hidden"
            />
            <button onClick={() => handleFileClick(eventImageRef)} className="upload-btn">Upload Event Image</button>
          </>
        );
      case 'achievement':
        return (
          <>
            <textarea
              className='textareas'
              placeholder="Describe your achievement"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <input
              type="text"
              placeholder="Competition Name"
              value={competition}
              onChange={(e) => setCompetition(e.target.value)}
            />
            <input
              type="text"
              placeholder="Placement"
              value={placement}
              onChange={(e) => setPlacement(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              ref={achievementImageRef}
              onChange={(e) => setAchievementImage(e.target.files[0])}
              className="hidden"
            />
            <button onClick={() => handleFileClick(achievementImageRef)} className="upload-btn">Upload Achievement Image</button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="create-post">
      <div className="post-options">
        <div className={`option ${postType === 'post' ? 'active' : ''}`} onClick={() => setPostType('post')}><FaRegImage /> Post</div>
        <div className={`option ${postType === 'event' ? 'active' : ''}`} onClick={() => setPostType('event')}><FaCalendarAlt /> Event</div>
        <div className={`option ${postType === 'achievement' ? 'active' : ''}`} onClick={() => setPostType('achievement')}><FaMedal /> Achievement</div>
        <div className={`option ${postType === 'video' ? 'active' : ''}`} onClick={() => setPostType('video')}><FaVideo /> Video</div>
      </div>

      {renderFormFields()}

      <button onClick={handlePost}>Post</button>
    </div>
  );
};

export default CreatePost;
