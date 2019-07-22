import React from 'react';
import NewJob from './NewJob'

class Job extends React.Component {
   render() {
      return (
         <>
            <h1>Current Jobs:</h1>
            <div><button>My Calendar</button></div>
            <div><button>My Docs</button></div>
            <div><button>Update Your Info</button></div>
         </>
      )
   }
}

export default Job