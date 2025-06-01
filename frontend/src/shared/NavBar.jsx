import { Link, useNavigate } from 'react-router-dom'
import styles from './../externalCSS/NavBar.module.css'
import { useState, useEffect } from 'react'

export default function NavBar() {
  const navigate = useNavigate();
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  }

  return (
    <>
        <nav>
            <ul className={styles.navBar}>
                <li><Link to = '/'><a>Home</a></Link></li>
                {isLoggedIn ? (
                  <>
                    <li><Link to = '/submit'><a>Submit FeedBack</a></Link></li>
                    <li><Link to = '/my-feedback'><a>My Feedback</a></Link></li>
                    <li><Link to = '/admin'><a>Admin Dashboard</a></Link></li>
                    <button onClick={handleLogOut} className={styles.logOutButton}>Logout</button>
                  </>
                ) : (
                  <>
                    <li><Link to = '/login'><a>Login</a></Link></li>
                    <li><Link to = '/register'><a>Register</a></Link></li>
                  </>
                )}
            </ul>
        </nav>
    </>
  )
}
