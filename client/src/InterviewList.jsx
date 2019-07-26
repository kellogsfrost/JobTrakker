import React from 'react';
import {Link} from "react-router-dom";

const InterviewList = props => {
   let interviews;
   // console.log(props.user);
   // console.log(req.user._id);
   // console.log(props.interviews.length);
   if (props.interviews.length) {
      console.log(props.interviews)
      interviews = props.interviews.map((interview, index) => {
         return (
            <>
               <Link to={`/interviews/${interview._id}`} className="interrow" key={index}>
               {interview.interviewer} |
               {interview.location} |
               {interview.date} |
               {interview.time} |
               {interview.notes} </Link>
               <Link to={`/map/${interview.location}`}> Show Location</Link>
            </>
         )
      })
   } else {
      interviews = <p>No Interview Data!</p>
   }
   return (
         <div className='InterviewList'>
            {interviews}
            <hr/>
         </div>
      )
}


export default InterviewList
