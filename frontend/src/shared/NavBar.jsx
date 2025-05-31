import { Link } from 'react-router-dom'
import styles from './../externalCSS/NavBar.module.css'

export default function NavBar() {
  return (
    <>
        <nav>
            <ul className={styles.navBar}>
                <li><Link to = '/my-feedback'>My Feed</Link></li>
                <li><Link to = '/submit'>Submit FeedBack</Link></li>
                <li><Link to = '/admin'>Admin Dashboard</Link></li>
                <li><Link to = '/login'>Login</Link></li>
                <li><Link to = '/register'>Register</Link></li>
            </ul>
        </nav>
    </>
  )
}
