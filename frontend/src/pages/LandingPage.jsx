import NavBar from './../shared/NavBar';
import styles from './../externalCSS/LandingPage.module.css';

export default function LandingPage() {
  return (
    <>
        <div>
            <NavBar/>
            <div className={styles.homePage}>
                <h1 className={styles.title}>“We're <span>Listening</span> - Tell Us What You <span>Think</span>”</h1>
                <p className={styles.description}>
                    Welcome to our feedback platform! We value your opinions and suggestions. 
                    Whether you have a comment, question, or idea, we want to hear from you. 
                    Your feedback helps us improve and serve you better.
                </p>
                <img src='./../assets/homepage.jpg' alt='Feedback' className={styles.image}/>
            </div>
        </div>
    </>
  )
}