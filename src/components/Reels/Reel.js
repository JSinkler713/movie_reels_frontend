import React, { Component } from 'react';
import { API_URL } from '../../constants/constants';
import MovieContainer from '../../containers/MovieContainer'

class Reel extends Component {
  state = { 
    movies: '', 
    reel_id:'',
    inputText: '',
    searchedMovies: '',
    addMovie: false
  }
  
  handleInput = (e) => {
    this.setState({inputText: e.target.value})
  }

  handleSearch = (e) => { 
    let url='http://www.omdbapi.com/?apikey=3a55a9e6&s='+this.state.inputText
    fetch(url, {method: 'get'})
      .then(response=> response.json())
      .then(body=> {
        this.setState({searchedMovies: body.Search})
        console.log(this.state.movies)
      })
  }
  
  searchAvailable = (e) => {
    this.setState({addMovie: true})
  }
  searchOff = () => {
    this.setState({addMovie: false})
  }

  fetchMovies = (reel_id) => {
    console.log(`fetching all movies with reel id ${reel_id}`)
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
        this.setState({movies: (data)})
       // sends user to profile page
       // this.props.history.push('/reels');
      })
      .catch(err => {
        this.setState({error: err.message })
      }); 
  }

  componentDidMount() {
    // console.log({ this.props.match.params.id })
    this.setState({ reel_id: this.props.match.params.id})
    this.fetchMovies(this.props.match.params.id)

  }

  render() {

  
    if (this.state.movies.length === 0 || this.state.addMovie === true) {
        return ( 
          <div className="Search">
              <p>Movie Search</p>  
        <input
          onChange={this.handleInput}
          value={this.state.inputText}
        />
        <button onClick={this.handleSearch}>click here</button>
        <div className="myMoviesContainer">
           {
           this.state.searchedMovies.length === 0
           ? "loading..."
           : <MovieContainer searchOff={this.searchOff} reel_id={this.props.match.params.id} movies={this.state.searchedMovies} />
           }
          </div>
          </div>
        )
      } else {
        let arrayOfMovies= this.state.movies.map((movie, i)=> {
          return <div className='myMovies'>
            <h3>Title:{movie.Movie}</h3>
            <img src={movie.Poster} alt='incorrect image' />
            </div>
        })  
        return (
          <div>
            <div className='myMoviesContainer'>
        {arrayOfMovies}
        Hey we are now looking at a specific reel
            </div>
            <button onClick={this.searchAvailable}>Add new movies!</button>
          </div>
      );
    }
  }
};

export default Reel;
