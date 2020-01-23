import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { API_URL } from '../../constants/constants';

//when using a functional component we need to manually pass down the props to that component


class ReelCard extends Component {
  state = {
    movies: []
  }
  
  componentDidMount() {
    fetch(`${API_URL}/reels/${this.props.reel_id}/movies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res=> res.json())
      .then(data=> {
        console.log("Success we got the data", data);
        this.setState({movies: (data)})
       // sends user to profile page
       // this.props.history.push('/reels');
      })
      .catch(err => {
        this.setState({error: err.message })
      }); 
  }
  
  
  render() {
    if (this.state.movies.length == 0) {
      return ( 
      <div>
        <Link onClick={this.props.fetchMovies} to={`/reels/${this.props.reel_id}`}>
          { this.props.reelTitle } 
        </Link><br/>
      </div>
    )} else {
    return (
      
      <div className='reel-card'> 
        <Link onClick={this.props.fetchMovies} to={`/reels/${this.props.reel_id}`}>
          { this.props.reelTitle } 
        </Link><br/>
           <img src={this.state.movies[0].Poster} alt='no movies yet' />
      </div>
      )}
   }
};

export default ReelCard;
