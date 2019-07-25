import React from 'react';
import axios from 'axios';

class JobDetail extends React.Component {
   state = {
      jobInfo: []
   }
   componentDidMount() {
      var jobId = this.props.match.params.id


      console.log("hello" + this.props.match.params.id)
      axios.get(`/api/jobs/${jobId}`)
         .then(res => {
            var jobInfo = res.data
            this.setState({
               jobInfo
            })
            console.log("job details" + res.data.position)
         })
   }
   render() {
      return (
         <>
            <h1>Here is your Job Details:</h1>
            {this.state.jobInfo.company}
            {this.state.jobInfo.position}
            {this.state.jobInfo.location}
            {this.state.jobInfo.phone}
            {this.state.jobInfo.email}
         </>
      )
   }
}

export default JobDetail;