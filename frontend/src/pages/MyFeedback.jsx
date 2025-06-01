import { useState, useEffect } from 'react';
import axios from 'axios'
import NavBar from '../shared/NavBar';

export default function MyFeedback() {

  const [myFeedBack, setMyFeedBack] = useState([])

  useEffect(() => {
    const fetchFeedBack = async () => {
      const token = localStorage.getItem('token')
      if(!token){
        alert("You must be logged in to view feedback!");
        return;
      }

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
        alert("Error fetching feedback:");
      }
    }

    fetchFeedBack();
  }, []);

  return (
    <>
    {/* TODO: Implement My Feedback Page */}
      <div>
        <NavBar/>
          <h2>My FeedBack</h2>
          <div>
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