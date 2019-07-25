
import React from 'react';
import axios from 'axios';

class Interview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newDate: '',
            newTime: '',
            newInterviewer: '',
            newNotes: '',
            newLocation: '',
        }
        this.updateInterviewDate = this.updateInterviewDate.bind(this);
        this.updateInterviewTime = this.updateInterviewTime.bind(this);
        this.updateInterviewInterviewer = this.updateInterviewInterviewer.bind(this);
        this.newInterviewLocation = this.newInterviewLocation.bind(this);
        this.updateInterviewNotes = this.updateInterviewNotes.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault()
        axios.put("/api/interview/:id", {
            date: this.state.newDate,
            time: this.state.newTime,
            interviewer: this.state.newInterviewer,
            location: this.state.newLocation,
            notes: this.state.newNotes,
        }).then((response) => {
            axios.get("/api/interview/:id").then((response) => {
                this.setState({
                    interview: response.data
                })
            })
        })
    }

    interviewLocation() {
        // axios get interview.address
        axios.get("/api/interview/:id").then((response) => {
          console.log(response)
          this.setState({
            location: response.data.location
          })
        })
      }


    updateInterviewDate(e) {
        this.setState({
            newDate: e.target.value
        })
    }

    updateInterviewTime(e) {
        this.setState({
            newTime: e.target.value
        })
    }

    updateInterviewInterviewer(e) {
        this.setState({
            newInterviewer: e.target.value
        })
    }
    newInterviewLocation(e) {
        this.setState ({
           newLocation: e.target.value
        })
    }

    updateInterviewNotes(e) {
        this.setState({
            newNotes: e.target.value
        })
    }

    render() {
        return (

           <>
              <h1>Current Interviews:</h1>
              <h2>Update Your User Info</h2>
              <form onSubmit={this.handleSubmit}>
                 Date:<br />
                 <input value={this.state.newDate} onChange={this.updateInterviewDate} type="text"/>
                 <br />
                 Time:<br />
                 <input value={this.state.newTime} onChange={this.updateInterviewTime} type="text" />
                 <br />
                 Location:<br />
                <input value={this.state.newLocation} onChange={this.newInterviewLocation} type="text" />
                 <br />
                 Interviewer:<br />
                 <input value={this.state.newInterviewer} onChange={this.updateInterviewInterviewer} type="text" />
                 <br />
                 Notes:<br />
                 <input value={this.state.newNotes} onChange={this.updateInterviewNotes} type="text" />
                 <br />
                 <input type='submit' value="Save" />
              </form>
           </>
        )
    }
}
  
export default Interview;