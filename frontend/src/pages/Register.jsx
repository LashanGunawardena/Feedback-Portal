import axios from "axios"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from "../shared/NavBar"

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword ] = useState('')
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

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

      navigate('/login')
    }
    catch(err){
      console.log();
    }
  }

  return (
    <>
    {/* TODO: Implement Register Page */}
      <div>
        <NavBar/>
        <h1>Register Page</h1>
        <form onSubmit={handleRegister}>
          <div>
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
          <div>
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
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
} 