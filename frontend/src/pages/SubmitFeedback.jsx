import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NavBar from '../shared/NavBar';
import styles from './../externalCSS/SubmitFeedback.module.css';

export default function SubmitFeedback() {
  const [feedBack, setFeedBack] = useState('');
  const navigate = useNavigate();

  const handleSendFeedBack = async (e) => {
    e.preventDefault();

    try{
      const token = localStorage.getItem('token');

      if(!token){
        alert("You must be logged in to submit feedback!");
        navigate('/login');
        return; 
      }

      const res = await axios.post(`http://localhost:3001/feedback`, {
        message: feedBack
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })

      alert("Feedback sent successfully!");
      setFeedBack('');
    }
    catch(err){
      alert("Error sending feedback:");
    }
  }

  return (
    <>
    {/* TODO: Implement Submit Feedback Page */}
      <NavBar/>
      <div className={styles.submitFeedBack}>  
        <h1 className={styles.title}>Submit Feedback</h1>
        <form onSubmit={handleSendFeedBack}>
          <div className={styles.formGroup}>
            {/* <label htmlFor="feedback">Your Feedback:</label> */}
            <textarea 
              id="feedback" 
              name="feedback" 
              value={feedBack}
              onChange={(e) => setFeedBack(e.target.value)}
              required>
            </textarea>
            <button className={styles.submitButton} type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
} 