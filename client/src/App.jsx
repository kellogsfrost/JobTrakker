import React from 'react';
import axios from 'axios';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import Job from './Job';
import DisplayMap from './DisplayMap';
// import NewJob from './NewJob';
// import Edit from './Edit';
import Home from './Home';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      user: null,
      errorMessage: '',
      apiData: null
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

  componentDidMount() {
    this.checkForLocalToken()
  }

  render() {
    var user = this.state.user
    var contents = ''
    if (user) {
      contents = (
        <>
        <nav>
          <Link to="/">Home</Link>{' '}
          <Link to="/profile">Profile</Link>{' '}
          <Link to="/jobs">Jobs</Link>{' '}
          

          {/* <Link to="/map">Map</Link>{' '} */}
          </nav>
        <p>Hello, {user.name}</p>
        <p onClick={this.logout}>Logout</p>
        </>
      );
    } else {
      contents = (
        <>
        <nav>
          <Link to="/signup">Sign Up</Link>{' '}
          <Link to="/login">LogIn</Link>{' '}
          <Link to="/">Home</Link>{' '}
        </nav>
        <p>Please signup or login</p>
        <Login liftToken={this.liftToken} />
        <Signup liftToken={this.liftToken} />
        </>
      );
    }
    return(
      <>
      <Router>
        
        <Route exact path='/' component={Home} />
        {contents}
        <Route exact path='/profile' 

                render={() => <Profile jobs={this.state.user.jobs} user={this.state.user} />} />
        <Route exact path='/jobs'  render={() => <Job jobs={this.state.user.jobs} /> }/>

        <Route path='/jobs/:name' 
                render={(props) => <Job jobs={this.state.user.jobs} {...props} />} />
        {/* <Route exact path='/signup'  component={Signup} /> */}
        {/* <Route exact path='/login'  component={Login} /> */}
        <Route exact path='/signup'  component={Signup} />
        <Route exact path='/login'  component={Login} />
        {/* <Route exact path='/map' component={DisplayMap} />  */}

      </Router>
    </>
    );
  }
}



export default App;
