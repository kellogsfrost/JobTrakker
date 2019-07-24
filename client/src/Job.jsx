
import React from 'react';
import JobList from './JobList';
import axios from 'axios';

class Job extends React.Component {
   constructor(props) {
      super(props);
      this.state={
         newPosition: '',
         newCompany: '',
         newLocation: '',
         newEmail: '',
         newPhone: ''
      }
      this.newJobPosition = this.newJobPosition.bind(this);
      this.newJobCompany = this.newJobCompany.bind(this);
      this.newJobLocation = this.newJobLocation.bind(this);
      this.newJobEmail = this.newJobEmail.bind(this);
      this.newJobPhone = this.newJobPhone.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }
   componentDidMount() {
      axios.get('/api/jobs')
         .then(res => {
            this.setState({
               jobs: res.data
            })
         })
   }
   handleSubmit(e) {
      e.preventDefault()
      axios.post(`/api/job/${this.props.job._id}`, {
         position: this.state.position,
         company: this.state.company,
         location: this.state.location,
         phone: this.state.phone,
         email: this.state.email
      }).then((response) => {
         axios.get(`/api/job/${this.props.job._id}`)
         .then((response) =>{
            // this.props.liftToken({toke: this.props.token, job: response.data})
            console.log("Where is THIS")
            this.props.liftToken({token: this.props.token, user: response.data})
            })
         })
      
   }
   newJobPosition(e) {
      this.setState ({
         newPosition: e.target.value
      })
   }
   newJobCompany(e) {
      this.setState ({
         newCompany: e.target.value
      })
   }
   newJobLocation(e) {
      this.setState ({
         newLocation: e.target.value
      })
   }
   newJobPhone(e) {
      this.setState ({
         newPhone: e.target.value
      })
   }
   newJobEmail(e) {
      this.setState ({
         newEmail: e.target.value
      })
   }

   render() {
      return (
         <>
            <h1>Current Jobs:</h1>
            <JobList jobs={this.props.jobs}/>
            <h2>Create a New Job</h2>
            <form onSubmit={this.handleSubmit}>
               Position:<br />
               <input value={this.state.newPosition} onChange={this.updateJobPosition} type="text"/>
               <br />
               Company:<br />
               <input value={this.state.newCompany} onChange={this.updateJobCompany} type="text" />
               <br />
               Location:<br />
               <input value={this.state.newLocation} onChange={this.updateJobLocation} type="text" />
               <br />
               Phone:<br />
               <input value={this.state.newPhone} onChange={this.updateJobPhone} type="text" />
               <br />
               Email:<br />
               <input value={this.state.newEmail} onChange={this.updateJobEmail} type="text" />
               <br />
               <input type='submit' value="Save" />
            </form>
            <div><button>My Calendar</button></div>
            <div><button>My Docs</button></div>
            <div><button>Update Your Info</button></div>
         </>
      )
   }
}

export default Job;