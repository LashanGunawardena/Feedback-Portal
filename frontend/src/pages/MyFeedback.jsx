import { useState, useEffect } from 'react';
import axios from 'axios'
import NavBar from '../shared/NavBar';
import styles from './../externalCSS/MyFeedback.module.css';

export default function MyFeedback() {
  const [myFeedBack, setMyFeedBack] = useState([])

  // Fetch feedback data for logged in user
  useEffect(() => {
    const fetchFeedBack = async () => {
      const token = localStorage.getItem('token')

      try{
        const res = await axios.get(`http://localhost:3001/feedback`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });
        setMyFeedBack(res.data);
      }
      catch(err){
        alert("Error fetching feedback");
      }
    }

    fetchFeedBack();
  }, []);

  return (
    <>
    {/* TODO: Implement My Feedback Page */}
    <NavBar/>
      <div className={styles.myFeedback}>
        <h2 className={styles.title}>My Feedback</h2>
        <div className={styles.feedbackList}>
          <ul>
            {myFeedBack.map((feedback) => (
              <li key={feedback.id}>{feedback.message}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
} 