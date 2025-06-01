import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../shared/NavBar';
export default function AdminDashboard() {
  const [ allFeedBack, setAllFeedBack ] = useState([]);
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
        setAllFeedBack(data.feedback || []);
        console.log(data);
      } catch (err) {
        console.error("Error fetching admin data:", err);
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
