import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../shared/NavBar";
import styles from './../externalCSS/EditFeedbackAdmin.module.css';

export default function EditFeedbackAdmin() {
    const { id } = useParams();
    const [ editedFeedback, setEditedFeedback ] = useState('');
    const navigate = useNavigate();

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        try{
            const token = localStorage.getItem('token');

            const res = await axios.put(`http://localhost:3001/admin/feedback/${id}`, {
                message: editedFeedback
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            const data = res.data;
            alert(data.message);
            navigate('/admin');
        }
        catch(err){
            alert("Failed to update feedback. Please try again.");
        }
    }

    return (
        <>
            <NavBar/>
            <div className={styles.editFeedBack}>
                <h1 className={styles.title}>Edit Feedback</h1>
                <form onSubmit={ handleEditSubmit }>
                    <div className={styles.formGroup}>
                        <textarea 
                            id="feedbackText" 
                            name="feedbackText" 
                            value={editedFeedback} 
                            onChange={(e) => setEditedFeedback(e.target.value)} 
                            required>
                        </textarea>
                        <button type="submit" className={styles.submitButton}>Update Feedback</button>
                    </div>
                </form>
            </div>
        </>
    );
}