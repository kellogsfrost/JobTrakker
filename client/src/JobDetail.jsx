import React from 'react';
import axios from 'axios';
import InterviewList from './InterviewList';
import UpdateJob from './UpdateJob';

class JobDetail extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         interviews: [],
         newDate: '',
         newTime: '',
         newInterviewer: '',
         newNotes: '',
         newLocation: '',
         token: '',
         jobInfo: { interviews: [] }
      }
      this.newInterviewDate = this.newInterviewDate.bind(this);
      this.newInterviewTime = this.newInterviewTime.bind(this);
      this.newInterviewInterviewer = this.newInterviewInterviewer.bind(this);
      this.newInterviewLocation = this.newInterviewLocation.bind(this);
      this.newInterviewNotes = this.newInterviewNotes.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
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
   handleSubmit(e) {
      e.preventDefault()
      let jobId = this.props.match.params.id;
      console.log(this.props.token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.props.token}`
      axios.post(`/api/jobs/${jobId}/`, {
         date: this.state.newDate,
         time: this.state.newTime,
         interviewer: this.state.newInterviewer,
         location: this.state.newLocation,
         notes: this.state.newNotes
      }).then((response) => {
         axios.get(`/api/jobs/${jobId}/`).then((response) => {
            this.setState({
               interviews: response.data
            })
         })
      })
   }

   newInterviewDate(e) {
      this.setState({
         newDate: e.target.value
      })
   }

   newInterviewTime(e) {
      this.setState({
         newTime: e.target.value
      })
   }

   newInterviewInterviewer(e) {
      this.setState({
         newInterviewer: e.target.value
      })
   }
   newInterviewLocation(e) {
      this.setState({
         newLocation: e.target.value
      })
   }

   newInterviewNotes(e) {
      this.setState({
         newNotes: e.target.value
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
            < InterviewList interviews={this.state.jobInfo.interviews} />
            <hr />
            <h2>Create a New Interview!</h2>
            <form onSubmit={this.handleSubmit}>
               Location:<br />
               <input value={this.state.newLocation} onChange={this.newInterviewLocation} type="text" />
               <br />
               Interviewer:<br />
               <input value={this.state.newInterviewer} onChange={this.newInterviewInterviewer} type="text" />
               <br />
               Date:<br />
               <input value={this.state.newDate} onChange={this.newInterviewDate} type="text" />
               <br />
               Time:<br />
               <input value={this.state.newTime} onChange={this.newInterviewTime} type="text" />
               <br />
               Notes:<br />
               <input value={this.state.newNotes} onChange={this.newInterviewNotes} type="text" />
               <br />
               <input type='submit' value="Save" />
            </form>
         </>
      )
   }
}

export default JobDetail;