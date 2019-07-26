
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

    // handleSubmit(e) {
    //     e.preventDefault()
    //     let userId = this.props.user._id;
    //     axios.defaults.headers.common['Authorization'] = `Bearer ${this.props.token}`
    //     axios.post(`/api/profile/${userId}/interviews/`, {
    //         date: this.state.newDate,
    //         time: this.state.newTime,
    //         interviewer: this.state.newInterviewer,
    //         location: this.state.newLocation,
    //         notes: this.state.newNotes
    //     }).then((response) => {
    //         axios.get(`/api/profile/${userId}/interviews`).then((response) => {
    //             this.setState({
    //                 interviews: response.data
    //             })
    //         })
    //     })
    // }
    // handleMap(e) {
    //     e.preventDefault()
    //     axios.defaults.headers.common['Authorization'] = `Bearer ${this.props.token}`
    //     axios.get("/api/interviews/:id", {
    //         location: this.state.location
    //     }).then((response) => {
    //         console.log(response.data)
    //         this.setState({
    //             location: response.data
    //         })
    //     })
    
    // }

    render() {
        return (

            <>
            <h1>Current Interviews:</h1>
            <InterviewList interviews={this.state.interviews} />
            <hr />
            </>
        )
    }
}

export default Interview;