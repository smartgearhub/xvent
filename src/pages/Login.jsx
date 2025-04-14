import React, { useState } from 'react';
import './Login.css';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Access user info (displayName and photoURL)
      console.log("Logged in as:", user.displayName, user.photoURL);  // This line is for debugging purposes
      navigate('/Dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      // Access user info (displayName and photoURL)
      console.log("Logged in as:", user.displayName, user.photoURL);  // This line is for debugging purposes
      navigate('/Dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p className="subtitle">Sign in to your Xvent account</p>

        <form className="login-form" onSubmit={handleLogin}>
          <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="login-btn">Login</button>
        </form>

        {error && <p className="error-text">{error}</p>}

        <div className="divider">or</div>

        <button className="google-login" onClick={handleGoogleLogin}>
          <FcGoogle className="google-icon" />
          Sign in with Google
        </button>

        <p className="signup-link">Don't have an account?</p>
        <div className="center-btn-container">
          <button onClick={() => navigate('/Signup')}>Sign up</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
