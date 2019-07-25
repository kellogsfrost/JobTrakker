import React from 'react';
import {Link} from "react-router-dom";

const InterviewList = props => {
   let interviews;
   console.log(props.interviews.length);
   if (props.interviews.length) {
      interviews = props.interviews.map((interview, index) => {
         return <Link to={`/interviews/${interview._id}`} className="interrow" key={index}>
         {interview.interviewer} |
         {interview.date} |
         {interview.time} |
         {interview.notes} </Link>
      })
   } else {
      interviews = <p>No Interview Data!</p>
   }
   return (
         <div className='InterviewList'>
            <h3>All your Interviews for this Job:</h3>
            {interviews}
            <hr/>
         </div>
      )
   
}


export default InterviewList
