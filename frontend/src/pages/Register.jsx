import React from 'react';
export default function Register() {
  return (
    <>
    {/* TODO: Implement Register Page */}
      <div>
        <h1>Register Page</h1>
        <form>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Register</button>
        </form>
        
      </div>
    </>
  );
} 