import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import NavBar from '../shared/NavBar';
import styles from './../externalCSS/Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try{
      const res = await axios.post(`http://localhost:3001/auth/login`,{
        email,
        password
      },{
        headers: {
          "Content-Type": "application/json",
        }
      });

      localStorage.setItem('token', res.data.token);
      alert("Login successfully");
      navigate('/')
    }
    catch(err){
      alert("Login failed!")
    }
  }

  return (
    <>
    {/* TODO: Implement Login Page */}
      <NavBar/>
      <div className={styles.login}>
        <h1 className={styles.title}>Login Page</h1>
        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}