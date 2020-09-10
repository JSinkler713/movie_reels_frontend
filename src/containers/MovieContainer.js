import React, { Component } from 'react'
import Movie from '../components/Movie.js'

class MovieContainer extends Component {

  render() {
    return (
      this.props.movies.map((movie, i)=> {
        return <Movie 
        year={movie.Year}
        imdbId={movie.imdbID}
        title={movie.Title}
        imgSrc={movie.Poster}
        movie={movie}
          reel_id={this.props.reel_id}
          //searchOff={this.props.searchOff}
          className='myMovies'
          />
      })  
    )   
  }
}

export default MovieContainer
