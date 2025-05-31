import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SubmitFeedback() {
  const [feedBack, setFeedBack] = useState('');
  const navigate = useNavigate();

  const handleSendFeedBack = async (e) => {
    e.preventDefault();

    try{
      const token = localStorage.getItem('token');

      const res = await axios.post(`http://localhost:3001/feedback/`, {
        method: "POST",
        message: feedBack,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })

      alert("Feedback sent successfully!");
      setFeedBack('');
      navigate('/')
    }
    catch(err){
      console.error("Error sending feedback:", err);
    }
  }

  return (
    <>
    {/* TODO: Implement Submit Feedback Page */}
      <div>
        <h1>Submit Feedback</h1>
        <form onSubmit={handleSendFeedBack}>
          <div>
            <label htmlFor="feedback">Your Feedback:</label>
            <textarea 
              id="feedback" 
              name="feedback" 
              value={feedBack}
              onChange={(e) => setFeedBack(e.target.value)}
              required>
            </textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
} 