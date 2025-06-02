import axios from "axios"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from "../shared/NavBar"
import styles from './../externalCSS/Register.module.css'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword ] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate();

  // Handle registration form submission
  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if password and confirm password match
    if(password !== confirmPassword){
      alert("Passwords do not match!");
      return;
    }

    try{
      const res = await axios.post(`http://localhost:3001/auth/signup`,{
        email,
        password
      },{
        headers : {
           "Content-Type": "application/json",
        }
      })

      localStorage.setItem('token', res.data.token);
      alert("Registered successfully");

      navigate('/')
    }
    catch(err){
      alert("Registration failed!");
    }
  }

  return (
    <>
    {/* TODO: Implement Register Page */}
      <NavBar/>
      <div className={styles.register}>
        <h1 className={styles.title}>Register Page</h1>
        <form onSubmit={handleRegister}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
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
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              id="password" 
              name="password"
              value={password}
              onChange = {(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword"
              value={confirmPassword}
              onChange = {(e) => setConfirmPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
} 