import React, { useState } from 'react';
import './Signup.css';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth, googleProvider, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update Firebase Auth profile
      await updateProfile(user, {
        displayName: name,
        photoURL: '',
      });

      // Save to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        photoURL: '',
        createdAt: new Date().toISOString(),
      });

      navigate('/Dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL || '',
        createdAt: new Date().toISOString(),
      });

      await updateProfile(user, {
        displayName: user.displayName,
        photoURL: user.photoURL || '',
      });

      navigate('/Dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create your account</h2>
        <p className="subtitle">Join Xvent and start your event journey!</p>

        <form className="signup-form" onSubmit={handleSignup}>
          <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>

        {error && <p className="error-text">{error}</p>}

        <div className="divider">or</div>

        <button className="google-signup" onClick={handleGoogleSignup}>
          <FcGoogle className="google-icon" />
          Sign up with Google
        </button>

        <p className="signin-link">Already have an account?</p>
        <div className="center-btn-container">
          <button onClick={() => navigate('/Login')}>Sign in</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
