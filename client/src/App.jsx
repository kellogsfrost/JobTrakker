import React from 'react';
import axios from 'axios';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import Job from './Job';
import DisplayMap from './DisplayMap';
import Interview from './Interview';
import JobDetail from './JobDetail';
import './App.css';
import Home from './Home';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      user: null,
      errorMessage: '',
      apiData: null,
    }
    this.checkForLocalToken = this.checkForLocalToken.bind(this);
    this.liftToken = this.liftToken.bind(this);
    this.logout = this.logout.bind(this);
  }


  checkForLocalToken() {
    var token = localStorage.getItem('mernToken');
    if (!token || token === 'undefined') {
      // Token is invalid or missing
      localStorage.removeItem('mernToken');
      this.setState({
        token: '',
        user: null
      })
    } else {
      // we found a token in localStorage, verify it
      axios.post('/auth/me/from/token', {token})
        .then( res => {
          if (res.data.type === 'error') {
            localStorage.removeItem('mernToken')
            this.setState({
              token: '',
              user: null,
              errorMessage: res.data.message
            })
          } else {
            localStorage.setItem('mernToken', res.data.token);
            this.setState({
              token: res.data.token,
              user: res.data.user,
              errorMessage: ''
            })
          }
        })
    }
  }

  liftToken({token, user}) {
    this.setState({
      token,
      user
    })
  }

  logout(){
    //remove token from local storage
    localStorage.removeItem('Merntoken');
    // Remove user and token from state
    this.setState({
      token: '',
      user: null
    })
  }
  
  //on click pull interview location from database
  // send user to map page rendering 

  componentDidMount() {
    this.checkForLocalToken()
  }
  



  render() {
    var user = this.state.user
    var contents = ''
    if (user) {
      contents = (
        <>

        <div  style={{ backgroundImage: `url(require("../public/images/working.jpg"))` }}>
        <nav className="nav">
       
          <Link  style={{
                        textDecoration: 'none',
                        color: 'white',
                        margin: '5px',
                        padding: '5px',
                        fontSize: '25px'
                    }}to="/">Home</Link>{' '}
          <Link  style={{
                        textDecoration: 'none',
                        color: 'white',
                        margin: '5px',
                        padding: '5px',
                        fontSize: '25px'
                    }}to="/profile">Profile</Link>{' '}
          <Link  style={{
                        textDecoration: 'none',
                        color: 'white',
                        margin: '5px',
                        padding: '5px',
                        fontSize: '25px'
                    }}to="/jobs">Jobs</Link>{' '}
          <Link  style={{
                        textDecoration: 'none',
                        color: 'white',
                        margin: '5px',
                        padding: '5px',
                        fontSize: '25px'
                    }}to="/interviews">Interview</Link>{' '}
          <Link  style={{
                        textDecoration: 'none',
                        color: 'white',
                        margin: '5px',
                        padding: '5px',
                        fontSize: '25px'
                    }}to="/map">Map</Link>{' '}

          </nav>

        <p>Hello, {user.name}</p>
        <p onClick={this.logout}>Logout</p>
        <i className="far fa-user"></i>
        </div>
        </>
      );
    } else {
      contents = (
        <>
        <div style={{ backgroundImage: `url(require("../public/images/working.jpg"))` }}>
        <nav className="nav">
          <Link  style={{
                        textDecoration: 'none',
                        color: 'white',
                        margin: '5px',
                        padding: '5px'
                    }} to="/signup">Sign Up</Link>{' '}
          <Link  style={{
                        textDecoration: 'none',
                        color: 'white',
                        margin: '5px',
                        padding: '5px'
                    }} to="/login">LogIn</Link>{' '}
          <Link  style={{
                        textDecoration: 'none',
                        color: 'white',
                        margin: '5px',
                        padding: '5px'
                    }} to="/">Home</Link>{' '}
        </nav>
        <p>Please signup or login</p>
        {/* <Login liftToken={this.liftToken} /> */}
        {/* <Signup liftToken={this.liftToken} /> */}
        </div>
        </>
      );
    }
    return(
      <>
      <Router>
        {contents}
        <Route exact path='/' component={Home} />
        <Route exact path='/profile' 
                render={() => <Profile jobs={this.state.jobs} user={this.state.user} interviews={this.state.interviews} liftToken={this.liftToken} token={this.state.token}/>} />
        <Route exact path='/jobs'  render={() => <Job jobs={this.state.user.jobs} user={this.state.user} /> }/>

        <Route path='/jobs/:id' 
                render={(props) => <JobDetail jobs={this.state.user.jobs} token={this.state.token} {...props} />} />
        <Route exact path='/interviews'  render={() => <Interview jobs={this.state.jobs} interviews={this.state.interviews} user={this.state.user} token={this.state.token}/> }/>
        <Route exact path='/signup'  render={() => <Signup liftToken={this.liftToken} /> }/>
        <Route exact path="/login" render={() => ( (user) ? (<Redirect to="/"/>) : (<Login liftToken={this.liftToken} />)
)}/>
        <Route exact path='/map/:location' render={(props)=> <DisplayMap {...props} />} />

      </Router>
    </>
    );
  }
}

export default App;
