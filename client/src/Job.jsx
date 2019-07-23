
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
      this.updateJobPosition = this.updateJobPosition.bind(this);
      this.updateJobCompany = this.updateJobCompany.bind(this);
      this.updateJobLocation = this.updateJobLocation.bind(this);
      this.updateJobEmail = this.updateJobEmail.bind(this);
      this.updateJobPhone = this.updateJobPhone.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }
   componentDidMount() {
      axios.get('/jobs')
         .then(res => {
            this.setState({
               jobs: res.data
            })
         })
   }
   handleSubmit(e) {
      e.preventDefault()
      axios.put("/api/job/:id", {
         position: this.state.position,
         company: this.state.company,
         location: this.state.location,
         phone: this.state.phone,
         email: this.state.email
      }).then((response) => {
         axios.get("/api/job/:id").then((response) =>{
            this.setState ({
               job: response.data
            })
         })
      })
   }
   updateJobPosition(e) {
      this.setState ({
         newPosition: e.target.value
      })
   }
   updateJobCompany(e) {
      this.setState ({
         newCompany: e.target.value
      })
   }
   updateJobLocation(e) {
      this.setState ({
         newLocation: e.target.value
      })
   }
   updateJobPhone(e) {
      this.setState ({
         newPhone: e.target.value
      })
   }
   updateJobEmail(e) {
      this.setState ({
         newEmail: e.target.value
      })
   }

   render() {
      return (
         <>
            <h1>Current Jobs:</h1>
            <JobList />
            <h2>Update Your Job Info</h2>
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