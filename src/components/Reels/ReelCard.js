import React, { Component } from 'react';
import { Link } from 'react-router-dom'

//when using a functional component we need to manually pass down the props to that component


class ReelCard extends Component {
  state = {
    movies: []
  }
  render() {
    return (
      <div>
        <Link onClick={this.props.fetchMovies} to={`/reels/${this.props.reel_id}`}>
          { this.props.reelTitle } 
        </Link><br/>
      </div>
    )
  }
};

export default ReelCard;
