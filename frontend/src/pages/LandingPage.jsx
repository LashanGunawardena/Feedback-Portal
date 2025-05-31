import NavBar from './../shared/NavBar';
import styles from './../externalCSS/LandingPage.module.css';

export default function LandingPage() {
  return (
    <>
        <div>
            <NavBar/>
            <div>
                <h1 className={styles.title}>Welcome to the Feedback System</h1>
                <p>Your feedback is valuable to us!</p>
            </div>
        </div>
    </>
  )
}