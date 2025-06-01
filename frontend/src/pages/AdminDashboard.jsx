import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../shared/NavBar';
export default function AdminDashboard() {
  const [ allFeedBack, setAllFeedBack ] = useState([]);
  const [ message, setMessage ] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        alert("You must be logged in to access the admin dashboard!");
        navigate('/login');
      }

      try {
        const res = await fetch('http://localhost:3001/admin/feedback', {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();

        if (!data.success) {
          setMessage(data.message || 'Access denied.');
        } 
        else if (data.feedback.length === 0) {
          setMessage(data.message || 'No feedback available.');
        } 
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

  return (
    <>
    {/* TODO: Implement Admin Dashboard Page */}
      <div>
        <NavBar/>
        <h1>Admin Dashboard</h1>
        <p>Welcome to the Admin Dashboard. Here you can manage users, view feedback, and perform administrative tasks.</p>
        {message && <p style={{ color: 'red' }}>{message}</p>} 
        <div>
          <ul>
            {allFeedBack.map((feedback) => (
              <li key={feedback.id}>
                {feedback.user.email}
                {feedback.message}
                {feedback.createdAt}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
} 
