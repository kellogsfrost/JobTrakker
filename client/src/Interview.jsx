
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
        }
        this.updateInterviewDate = this.updateInterviewDate.bind(this);
        this.updateInterviewTime = this.updateInterviewTime.bind(this);
        this.updateInterviewInterviewer = this.updateInterviewInterviewer.bind(this);
        this.newInterviewLocation = this.newInterviewLocation.bind(this);
        this.updateInterviewNotes = this.updateInterviewNotes.bind(this);
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
    handleMap(e) {
        e.preventDefault()
        axios.get("/api/interview/:id", {
            location: this.state.location
        }).then((response) => {
            console.log(response.data)
            this.setState({
                location: response.data
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
        this.setState({
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
                <InterviewList interviews={this.state.interviews} />

            </>
        )
    }
}

export default Interview;