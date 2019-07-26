import React from 'react';
import axios from 'axios';
import InterviewList from './InterviewList';
import UpdateJob from './UpdateJob';

class JobDetail extends React.Component {
   state = {
      jobInfo: {interviews:[]}
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
            console.log(this.state.jobInfo)
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
            <UpdateJob />
            <h1>Here are your Interviews for this job:</h1>
            < InterviewList interviews={this.state.jobInfo.interviews}/>
         </>
      )
   }
}

export default JobDetail;