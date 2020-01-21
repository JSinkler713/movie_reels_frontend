import React, { Component } from 'react';


//when using a functional component we need to manually pass down the props to that component


class ReelCard extends Component {
  state = {
    movies: []
  }
  
  getMovies = (event) => {
    event.preventDefault()
    console.log(`fetching all movies with reel id ${this.props.reel_id}`)
    this.props.fetchMovies(this.props.reel_id)
  }
  
  render() {
    return (
      <div>
        { this.props.reelTitle }
        <button type="Submit" onClick={this.getMovies}>Check out Reel</button>
      </div>
    )
  }
};

export default ReelCard;
