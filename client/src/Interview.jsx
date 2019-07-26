
import React from 'react';
import axios from 'axios';
import InterviewList from './InterviewList'

class Interview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            interviews: [],
            newDate: '',
            newTime: '',
            newInterviewer: '',
            newNotes: '',
            newLocation: '',
            token: ''
        }
        this.newInterviewDate = this.newInterviewDate.bind(this);
        this.newInterviewTime = this.newInterviewTime.bind(this);
        this.newInterviewInterviewer = this.newInterviewInterviewer.bind(this);
        this.newInterviewLocation = this.newInterviewLocation.bind(this);
        this.newInterviewNotes = this.newInterviewNotes.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      

    }
    componentDidMount() {
        var token = localStorage.getItem('mernToken');
        // let interviewId = this.props.user._id;
        // axios.defaults.headers.common['Authorization'] = `Bearer ${mernToken}` 
        let config = {
            headers: {
                Authorization: `Bearer ${this.props.token}`
            }
        }
        axios.get(`/api/interviews/`, config)
            .then(res => {
                this.setState({
                    interviews: res.data
                })
            })
    }
    handleSubmit(e) {
        e.preventDefault()
        let userId = this.props.user._id;
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.props.token}` 
        axios.post(`/api/profile/${userId}/interviews/`, {
            date: this.state.newDate,
            time: this.state.newTime,
            interviewer: this.state.newInterviewer,
            location: this.state.newLocation,
            notes: this.state.newNotes
        }).then((response) => {
            axios.get(`/api/profile/${userId}/interviews`).then((response) => {
                this.setState({
                    interviews: response.data
                })
            })
        })
    }
    handleMap(e) {
        e.preventDefault()
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.props.token}` 
        axios.get("/api/interviews/:id", {
            location: this.state.location
        }).then((response) => {
            console.log(response.data)
            this.setState({
                location: response.data
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
                <h1>Current Interviews:</h1>
                <InterviewList interviews={this.state.interviews} />
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

export default Interview;