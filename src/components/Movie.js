import React, { Component } from "react";
import { API_URL } from '../constants/constants';

class Movie extends Component {
  state = {
    movie:'',
    actors: '',
    plot:''
  }



  componentDidMount() {
    this.setState({actors: '', plot: ''})
  }

  onClickadd = ()=> {
    let url='http://www.omdbapi.com/?apikey=3a55a9e6&i='+this.props.imdbId
    console.log(url);
    console.log(this.props.imdbId)
    console.log(this.props.movie.Poster)
    console.log(this.props.title)
    let newMovie = {
      external_id : this.props.imdbId,
      title : this.props.title,
      poster : this.props.movie.Poster
    }
    fetch(`${API_URL}/reels/${this.props.reel_id}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newMovie)
    })
      .then(res=> res.json())
      .then(data=> {
        console.log("added data", data);
        //this will re-up the page to update with new reel
        this.props.history.push('/reels');
        
      })
      .catch(err => {
        this.setState({error: err.message })
      });
    this.props.searchOff()
  }
    
render() {
    return (
      <div className='myMovies'>
        <h3>Title:{this.props.title} </h3>
        <p>{this.props.year}</p>
        <img src={this.props.imgSrc} alt="poster" />
        <div><button onClick={this.onClickadd}><strong>Add to Reel!</strong></button>
      </div>
      </div>
    )
  }
}

export default Movie;
