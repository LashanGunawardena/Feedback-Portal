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
                <li><Link to = '/'>Home</Link></li>
                <li><Link to = '/my-feedback'>My Feed</Link></li>
                <li><Link to = '/submit'>Submit FeedBack</Link></li>
                <li><Link to = '/admin'>Admin Dashboard</Link></li>
                {isLoggedIn ? (
                  <>
                    <button onClick={handleLogOut}>Logout</button>
                  </>
                ) : (
                  <>
                    <li><Link to = '/login'>Login</Link></li>
                    <li><Link to = '/register'>Register</Link></li>
                  </>
                )}
            </ul>
        </nav>
    </>
  )
}
