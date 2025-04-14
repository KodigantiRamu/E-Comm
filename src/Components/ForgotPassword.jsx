import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`https://localhost:7046/api/User/${email}`, {
        password: password,
      });

      if (response.status === 200) {
        setMessage('Password updated successfully!');
      }
    } catch (error) {
      setMessage('Error updating password. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Forgot Password</h2>
        {message && <div style={styles.message}>{message}</div>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            style={styles.input}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            required
            style={styles.input}
          />
          <button type="submit" style={styles.submitButton}>Update Password</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    height: "100vh", 
    backgroundColor: "#CEE3D5" 
  },
  card: { 
    backgroundColor: "#fff", 
    padding: "30px", 
    borderRadius: "10px", 
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", 
    textAlign: "center", 
    width: "350px" 
  },
  title: { 
    fontSize: "24px", 
    marginBottom: "20px", 
    color: "#333" 
  },
  input: { 
    width: "100%", 
    padding: "12px", 
    margin: "10px 0", 
    border: "1px solid #ccc", 
    borderRadius: "5px", 
    fontSize: "16px" 
  },
  submitButton: {
    background: '#5E5DF0',
    borderRadius: '999px',
    boxShadow: '#5E5DF0 0 10px 20px -10px',
    boxSizing: 'border-box',
    color: '#FFFFFF',
    cursor: 'pointer',
    fontFamily: 'Inter, Helvetica, "Apple Color Emoji", "Segoe UI Emoji", NotoColorEmoji, "Noto Color Emoji", "Segoe UI Symbol", "Android Emoji", EmojiSymbols, -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", sans-serif',
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: '24px',
    opacity: 1,
    outline: '0 solid transparent',
    padding: '8px 18px',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    touchAction: 'manipulation',
    width: 'fit-content',
    wordBreak: 'break-word',
    border: 0,
  },
  message: { 
    color: "green", 
    marginBottom: "10px" 
  },
};

export default ForgotPassword;