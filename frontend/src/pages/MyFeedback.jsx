import { useState } from 'react';
import axios from 'axios'
import NavBar from '../shared/NavBar';

export default function MyFeedback() {

  // const [myFeedBack, setMyFeedBack] = useState([])

  // const fetchFeedBack = async (e) => {
  //   e.preventDefault();

  //   try{
  //     const res = await axios.get('',{
  //       method: "GET",
  //       headers:{
  //         "Content-Type": "application/json",

  //       }
  //     })

  //     const feedbackData = await res.json();
  //   }
  //   catch(err){
  //     console.error("Error fetching feedback"); 
  //   }
  // }

  return (
    <>
    {/* TODO: Implement My Feedback Page */}
      <div>
        <NavBar/>
          <h2>My FeedBack</h2>
          <div>
            
          </div>
      </div>
    </>
  );
} 