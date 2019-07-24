import React from 'react'

const JobList = props =>  {
   let jobs;
   console.log(props.jobs);
   if ( props.jobs.length) {
      jobs = props.jobs.map((job, index) => {
         return <p className="jobrow" key={index}>{job.position} | {job.company} | {job.location} | {job.phone} | {job.email}</p>
      })
   } else {
      jobs = <p>No Job Data!</p>
   }
   return (
         <div className='JobList'>
            <h3>All Your Current Jobs:</h3>
            {jobs}
            <hr/>
            
         </div>
      )
}


export default JobList;
