import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Routes from './config/routes';
import NavBar from './components/Layout/NavBar';
import { API_URL } from './constants/constants';

import './App.css';

class App extends Component {
  state = {
    currentUser: localStorage.getItem('uid'),
    userId: '',
    moviesOfReelSelected: [],
    reel_id:''
  };

  componentDidMount() {
    this.hydrateUserId()
  }
  
  hydrateUserId = () => {
    if (this.state.currentUser) {
      return this.setState({ userId: JSON.parse(atob(localStorage.getItem('uid').split('.')[1])).id })
    }
  }

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
  
  fetchMovies = (reel_id) => {
    console.log(this.state.reel_id)
    console.log(`fetching all movies with reel id ${reel_id}`)
    this.setState({ reel_id: reel_id })  
    console.log("if this all works then I need to write my fetch request")
    fetch(`${API_URL}/reels/${reel_id}/movies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res=> res.json())
      .then(data=> {
        console.log("Success we got the movie data", data);
        this.setState({moviesOfReelSelected: (data)})
       // sends user to profile page
       // this.props.history.push('/reels');
      })
      .catch(err => {
        this.setState({error: err.message })
      }); 
  }

  render() {
    return (
      <>
        <NavBar currentUser={this.state.currentUser} logout={this.logout} />
        <div className="container">
          <Routes fetchMovies={this.fetchMovies} moviesOfReelSelected={this.state.moviesOfReelSelected} currentUser={this.state.currentUser} userId={this.state.userId}  setCurrentUser={this.setCurrentUser} />
        </div>
      </>
    );
  };
};

export default withRouter(App);

