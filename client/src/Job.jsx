
import React from 'react';
import JobList from './JobList';
import axios from 'axios';

class Job extends React.Component {
   constructor(props) {
      super(props);
      this.state={
         jobs: [],
         newLocation: '',
         newPosition: '',
         newCompany: '',
         newEmail: '',
         newPhone: ''
      }
      this.newJobLocation = this.newJobLocation.bind(this);
      this.newJobPosition = this.newJobPosition.bind(this);
      this.newJobCompany = this.newJobCompany.bind(this);
      this.newJobEmail = this.newJobEmail.bind(this);
      this.newJobPhone = this.newJobPhone.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }
   componentDidMount() {
      let userId = this.props.user._id;
      axios.get(`/api/profile/${userId}/jobs`)
         .then(res => {
            this.setState({
               jobs: res.data
            })
         })
   }
   handleSubmit(e) {
      e.preventDefault()
      let userId = this.props.user._id;
      axios.post(`/api/profile/${userId}/jobs/`, {
         location: this.state.newLocation,
         position: this.state.newPosition,
         company: this.state.newCompany,
         phone: this.state.newPhone,
         email: this.state.newEmail
      }).then((response) => {
         axios.get(`/api/profile/${userId}/jobs`)
         .then(res => {
            this.setState({
               jobs: res.data
            })
            // // this.props.liftToken({toke: this.props.token, job: response.data})
            // console.log("Where is THIS")
            // this.props.liftToken({token: this.props.token, user: response.data})
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
   newJobPhone(e) {
      this.setState ({
         newPhone: e.target.value
      })
   }
   newJobLocation(e) {
      this.setState ({
         newLocation: e.target.value
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
            <JobList jobs={this.state.jobs}/>
            <h2>Create a New Job</h2>
            <form onSubmit={this.handleSubmit}>
            Location:<br />
                <input value={this.state.newLocation} onChange={this.newJobLocation} type="text" />
                 <br />
               Position:<br />
               <input value={this.state.newPosition} onChange={this.newJobPosition} type="text"/>
               <br />
               Company:<br />
               <input value={this.state.newCompany} onChange={this.newJobCompany} type="text" />
               <br />
               Phone:<br />
               <input value={this.state.newPhone} onChange={this.newJobPhone} type="text" />
               <br />
               Email:<br />
               <input value={this.state.newEmail} onChange={this.newJobEmail} type="text" />
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