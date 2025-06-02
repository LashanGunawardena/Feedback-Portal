import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../shared/NavBar';
import styles from './../externalCSS/AdminDashboard.module.css';

export default function AdminDashboard() {
  const [ allFeedBack, setAllFeedBack ] = useState([]);
  const [ message, setMessage ] = useState('');
  const navigate = useNavigate();

  // Fetch all feedback data for admin
  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem('token');

      try {
        const res = await axios.get('http://localhost:3001/admin/feedback', {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });

        const data = res.data;

        // If the request was not successful(admin restrictions)
        if (!data.success) {
          setMessage(data.message);
        } 
        //If there are no feedbacks available
        else if (data.feedback.length === 0) {
          setMessage(data.message);
        } 
        //If there are feedbacks available
        else {
          setAllFeedBack(data.feedback);
        }
      } 
      catch (err) {
        alert("Error fetching admin data:");
      }
    };

    fetchAdminData();
  }, []);

  // Handle delete feedback button
  const handleDeleteButton = async (feedBackId) => {
    const token = localStorage.getItem('token');

    try{
      const res = await axios.delete(`http://localhost:3001/admin/feedback/${feedBackId}`,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      const data = res.data;

      // If the request was not successful(admin restrictions)
      if(data.success){
        // Filter out the deleted feedback from the state
        setAllFeedBack(allFeedBack.filter(feedback => feedback.id !== feedBackId));
        alert("Feedback deleted successfully!");
      }
    }
    catch(err){
      alert(`Error deleting feedback`);
    }
  }

  return (
    <>
    {/* TODO: Implement Admin Dashboard Page */}
      <NavBar/>
      <div className={styles.adminDashboard}>
        <h1 className={styles.title}>Admin Dashboard</h1>
        {message && <p className={`${styles.restrictedMessage}`}>{message}</p>} 
        <div className={styles.feedbackList}>
          <table className={styles.feedbackTable}>
            <thead>
              <tr>
                <th>Index</th>
                <th>Email</th>
                <th>Message</th>
                <th>Submitted At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allFeedBack.map((feedback, index) => (
                <tr key={feedback.id}>
                  <td>{index + 1}</td>
                  <td>{feedback.user.email}</td>
                  <td>{feedback.message}</td>
                  <td>{new Date(feedback.createdAt).toLocaleString()}</td>
                  <td>
                    <button className={styles.editButton} onClick={() => navigate(`/admin/edit-feedback/${feedback.id}`)}>Edit</button>
                    <button className={styles.deleteButton} onClick={() => handleDeleteButton(feedback.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
} 
