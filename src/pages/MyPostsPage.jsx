import React, { useState, useEffect } from 'react';
import './MyPostsPage.css';
import CreatePost from '../components/CreatePost';
import Topbar from '../components/Topbar';
import { FaEdit, FaTrash, FaPlus, FaEye } from 'react-icons/fa';
import { db, auth } from '../firebase';
import { collection, query, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const MyPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Newest');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [editPostId, setEditPostId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    const postsRef = collection(db, 'posts');
    const q = query(postsRef, where('userId', '==', currentUser.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        time: doc.data().time?.toDate()
      }));
      setPosts(userPosts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deleteDoc(doc(db, 'posts', id));
    }
  };

  const handleFilterChange = (e) => setFilter(e.target.value);
  const handleSortChange = (e) => setSort(e.target.value);

  const handleCreatePostClick = () => {
    setShowCreatePost(!showCreatePost);
    if (!showCreatePost) setEditPostId(null);
  };

  const handleEditPostClick = (id) => {
    setEditPostId(id);
    setShowCreatePost(true);
  };

  const filteredPosts = posts
    .filter((post) => filter === 'All' || post.category === filter)
    .sort((a, b) => {
      return sort === 'Newest'
        ? b.time - a.time
        : a.time - b.time;
    });

  return (
    <div className="myposts-container">
      <Topbar />
      <div className="myposts-wrapper">
        <div className="myposts-header">
          <h2>My Posts</h2>
          <button className="create-post-btn" onClick={handleCreatePostClick}>
            {showCreatePost ? 'Close' : <><FaPlus /> Create New Post</>}
          </button>
        </div>

        {showCreatePost && (
          <CreatePost
            editPostId={editPostId}
            setEditPostId={setEditPostId}
            setPosts={setPosts}
          />
        )}

        <div className="myposts-controls">
          <div className="control">
            <label>Filter by Category:</label>
            <select value={filter} onChange={handleFilterChange}>
              <option>All</option>
              <option>Tech</option>
              <option>Music</option>
              <option>Art</option>
              <option>Sports</option>
            </select>
          </div>

          <div className="control">
            <label>Sort by:</label>
            <select value={sort} onChange={handleSortChange}>
              <option>Newest</option>
              <option>Oldest</option>
            </select>
          </div>
        </div>

        <div className="myposts-grid">
          {loading ? (
            <p className="loading-msg">Loading your posts...</p>
          ) : filteredPosts.length === 0 ? (
            <div className="no-posts-message">
              <img src="/images/empty-posts.svg" alt="No posts" />
              <h3>No posts yet</h3>
              <p>Start sharing your first post with the community!</p>
              <button className="create-first-post" onClick={handleCreatePostClick}>
                <FaPlus /> Create Post
              </button>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div key={post.id} className="post-card">
                {post.image && <img src={post.image} alt="post" className="post-image" />}
                <div className="post-info">
                  <h3>{post.title || post.content}</h3>
                  <p className="post-meta">
                    {post.time?.toLocaleDateString()} | {post.category || 'General'} | {post.visibility || 'Public'}
                  </p>
                  <div className="post-actions">
                    <button className="edit-btn" onClick={() => handleEditPostClick(post.id)}><FaEdit /></button>
                    <button className="delete-btn" onClick={() => handleDelete(post.id)}><FaTrash /></button>
                    <button className="view-btn"><FaEye /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPostsPage;
