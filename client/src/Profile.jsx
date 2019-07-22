import React from 'react';
import NewJob from './NewJob'

class Profile extends React.Component {
   render() {
      return (

         <>
            <h1>User Profile/Info:</h1>

         </>

         <div>
            <h1>Current Jobs:</h1>
            {/* <NewJob /> */}
            {/* <Link to="/newjob"><button className='btn'>Add A New Job Post</button></Link> */}
            <button>My Calendar</button>
            <button>My Docs</button>
            <button>Update Your Info</button>
            
         </div>
      )
   }
}

export default Profile
