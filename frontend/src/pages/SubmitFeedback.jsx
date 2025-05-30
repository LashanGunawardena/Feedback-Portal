import axios from 'axios';

export default function SubmitFeedback() {
  const [feedBack, setFeedBack] = useState('');

  const handleSendFeedBack = async (e) => {
    e.preventDefault();

    try{
      const res = await axios.post('', {
        content: "feedBack",
          // headers: {
            
          // }
      })

      alert("Feedback sent successfully!");
      setFeedBack('');
    }
    catch(err){
      console.error("Error sending feedback:", err);
    }
  }

  return (
    <>
    {/* TODO: Implement Submit Feedback Page */}
      <div>
        <h1>Submit Feedback</h1>
        <form onSubmit={handleSendFeedBack}>
          <div>
            <label htmlFor="feedback">Your Feedback:</label>
            <textarea 
              id="feedback" 
              name="feedback" 
              value={feedBack}
              onChange={(e) => setFeedBack(e.target.value)}
              required>
            </textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
} 