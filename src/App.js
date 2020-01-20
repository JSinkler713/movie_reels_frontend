import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Routes from './config/routes';
import NavBar from './components/Layout/NavBar';

import './App.css';

class App extends Component {
  state = {
    currentUser: localStorage.getItem('uid'),
    userId: ''
  };

  setCurrentUser = (data) => {
    // set user token
    // if pass in data can set token to data.signedJwt
    //
    //
    console.log("in app this is data passed up", data)
    this.setState({ currentUser: data.signedJwt })
    this.setState({ userId: data.id })
    localStorage.setItem('uid', data.signedJwt);
  };
  
  
  logout = () => {
    // handle logout
    localStorage.removeItem('uid');

    this.setState({currentUser: null});
    this.setState({userId: ''});
    this.props.history.push('/login')

  };

  render() {
    return (
      <>
        <NavBar currentUser={this.state.currentUser} logout={this.logout} />
        <div className="container">
          <Routes currentUser={this.state.currentUser} userId={this.state.userId}  setCurrentUser={this.setCurrentUser} />
        </div>
      </>
    );
  };
};

export default withRouter(App);

