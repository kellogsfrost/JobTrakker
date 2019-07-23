import React from 'react'

const JobList = props =>  {
   // let jobs;
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
            <form onSubmit={props.handleSubmit}>
               <input onChange={props.handleJobPositionChange} type="text" name="position" value={props.position}/>
               <input onChange={props.handleJobCompanyChange} type="text" name="company" value={props.company}/>
               <input onChange={props.handleJobLocationChange} type="text" name="location" value={props.location}/>
               <input onChange={props.handleJobPhoneChange} type="text" name="phone" value={props.phone}/>
               <input onChange={props.handleJobEmailChange} type="text" name="email" value={props.email}/>
               <input type="submit" value="Add Job"/>
            </form>
         </div>
      )
}


export default JobList;
