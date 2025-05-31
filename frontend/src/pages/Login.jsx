import { useState } from 'react';
import axios from 'axios'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault;

    try{
      const res = await axios.post(`http://localhost:3001/auth/login`,{
        email,
        password
      },{
        headers: {
          "Content-Type": "application/json",
        }
      })
    }
    catch(err){
      console.log("Login failed!")
    }
  }

  return (
    <>
    {/* TODO: Implement Login Page */}
      <div>
        <h1>Login Page</h1>
        <form onSubmit={handleLogin}>
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