import React, {useContext, useState, useEffect} from 'react';
import { API_URL } from '../../constants/constants';
import {UserContext} from '../../UserContext'
import MovieContainer from '../../containers/MovieContainer'

function Reel() {
  const [foundMovies, setFoundMovies] = useState([])
  const [reelMovies, setReelMovies] = useState([])
  const [user, setUser] = useContext(UserContext)
  const [movieToSearch, setMovieToSearch] = useState('')
  const [newSearch, setNewSearch] = useState('false')


  useEffect(()=> {
    console.log('user info', user)
    fetchMovies(user.reel_id)
  },[])

  /* 
  state = { 
    movies: '', 
    reel_id:'',
    reelName:'',
    inputText: '',
    searchedMovies: '',
    addMovie: false
  } */
  
  const handleInput = (e) => {
    setMovieToSearch(e.target.value)
  }

  const handleSearch = (e) => { 
    let url='http://www.omdbapi.com/?apikey=3a55a9e6&s='+ movieToSearch
    fetch(url, {method: 'get'})
      .then(response=> response.json())
      .then(body=> {
        setFoundMovies(body.Search)
      })
  }
  
/*   searchAvailable = (e) => {
    this.setState({addMovie: true})
  }
  searchOff = () => {
    this.setState({addMovie: false})
  } */

  const fetchMovies = (reel_id) => {
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
        setReelMovies(data)
        //this.setState({movies: (data)})
        //this.setState({reelName: (data[0].Reel)})
       // sends user to profile page
       // this.props.history.push('/reels');
      })
      .catch(err => {
        //this.setState({error: err.message })
      }); 
  }

  /* componentDidMount() {
    // console.log({ this.props.match.params.id })
    this.setState({ reel_id: this.props.match.params.id})
    this.fetchMovies(this.props.match.params.id)

  } */

  let arrayOfMovies= reelMovies.map((movie, i)=> {
    return <div className='myMovies'>
      <h3>Title:{movie.Movie}</h3>
      <img src={movie.Poster} alt='incorrect image' />
      </div>
  })  

  //render() {
    return (
      <div>
      <div className="Search">
          <p>Movie Search</p>  
    <input
      onChange={handleInput}
      value={movieToSearch}
    />
    <button onClick={handleSearch}>click here</button>
    <div className="myMoviesContainer">
       {
//       this.state.searchedMovies.length === 0
       (foundMovies.length === 0 && newSearch)
       ? "Search for your movies to add"
       : <MovieContainer reel_id={user.reel_Id} setNewSearch={()=>setNewSearch(!newSearch)} movies={foundMovies} />
       }
      </div>
      </div>
      <h2>My Movies</h2>
      <div className='myMoviesContainer'>
        {arrayOfMovies}
      </div>
      </div>
    )

  /* 
    if (this.state.movies.length !== 0 || this.state.addMovie === true) {
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
            <h3 className='reel-name-header'> {this.state.reelName} Reel</h3>
            <button className='button-search-movies' onClick={this.searchAvailable}>Add new movies!</button>
            <div className='myMoviesContainer'>
        {arrayOfMovies}
            </div>
          </div>
      );
    } */
};

export default Reel;
