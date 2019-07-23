import React from 'react';


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

   handleSubmit(e) {
      // hit the backend route for profile put

   }



   render() {
      return (
         <>
            <h1>User Profile/Info</h1>
            <h2>Update Your User Info</h2>
            <form onSubmit={this.handleSubmit}>
               Name:<br />
               <input value={this.state.newName} onChange={this.updateUserName} type="text" placeholder={this.props.user.name}/>
               <br />
               Email:<br />
               <input value={this.state.newEmail} onChange={this.updateUserEmail} type="text" placeholder={this.props.user.email}/>
               <br />
               Address:<br />
               <input value={this.state.newAddress} onChange={this.updateUserAddress} type="text" placeholder={this.props.user.address}/>
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
