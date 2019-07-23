import React from 'react';
import axios from 'axios';


class Profile extends React.Component {
   constructor(props) {
      super(props);
      this.state={
         newName: '',
         newEmail: '',
         newAddress: ''
      }
      this.updateUserName = this.updateUserName.bind(this);
      this.updateUserEmail = this.updateUserEmail.bind(this);
      this.updateUserAddress = this.updateUserAddress.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleSubmit(e) {
      e.preventDefault()
      axios.put(`/api/profile/${this.props.user._id}`, {
         name: this.state.newName,
         email: this.state.newEmail,
         address: this.state.newAddress
      }).then((response) => {
         axios.get(`/api/profile/${this.props.user._id}`)
         .then((response) =>{
            console.log("Where are you eagle eye?!")
            this.props.liftToken({token: this.props.token, user: response.data})
         })
      })
   }

      // hit the backend route for profile put

   updateUserName(e) {
      this.setState ({
         newName: e.target.value
      })
   }

   updateUserEmail(e) {
      this.setState ({
         newEmail: e.target.value
      })
   }

   updateUserAddress(e) {
      this.setState ({
         newAddress: e.target.value
      })
   }


   render() {
      return (
         <>
            <h1>User Profile/Info</h1>
            <h2>Update Your User Info</h2>
            <form onSubmit={this.handleSubmit}>
               Name:<br />
               <input value={this.state.newName} onChange={this.updateUserName} type="text"/>
               <br />
               Email:<br />
               <input value={this.state.newEmail} onChange={this.updateUserEmail} type="text" />
               <br />
               Address:<br />
               <input value={this.state.newAddress} onChange={this.updateUserAddress} type="text" />
               <br />
               <input type='submit' value="Save" />
            </form>
               <button>My Calendar</button>
               <button>My Docs</button>
         </>
      )
   }
}

export default Profile;
