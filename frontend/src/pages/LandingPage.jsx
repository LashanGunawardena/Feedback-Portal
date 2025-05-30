import React from 'react'
import { Link } from 'react-router-dom'
import styles from './../externalCSS/LandingPage.module.css';

export default function LandingPage() {
  return (
    <>
        <div>
            <nav>
                <ul className={styles.navBar}>
                    <li><Link to = '/my-feedback'>My Feed</Link></li>
                    <li><Link to = '/submit'>Submit FeedBack</Link></li>
                    <li><Link to = '/admin'>Admin Dashboard</Link></li>
                    <li><Link to = '/login'>Login</Link></li>
                    <li><Link to = '/register'>Register</Link></li>
                </ul>
            </nav>
            <div>
                <h1 className={styles.title}>Welcome to the Feedback System</h1>
                <p>Your feedback is valuable to us!</p>
            </div>
        </div>
    </>
  )
}