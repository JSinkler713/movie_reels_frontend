import React, { Component } from 'react';
import Reel from '../components/Reels/Reel' 
import ReelCard from '../components/Reels/ReelCard'
import { API_URL } from '../constants/constants';
import { Switch, Route } from 'react-router-dom';

class Reels extends Component {
  state = { 
    userId: this.props.userId,
    newReelTitle: '',
    arrayOfReels: [],
    moviesOfReelSelected: ''
  }
  
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  /* 
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
        this.setState({moviesOfReelSelected: (data)})
       // sends user to profile page
       // this.props.history.push('/reels');
      })
      .catch(err => {
        this.setState({error: err.message })
      }); 
  }
  */
  makeReel = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    let newReelId = this.state.arrayOfReels.length
    console.log(this.props.userId)
    console.log("Want to add new reel with title " + this.state.newReelTitle)
    let newReel = {
      title: this.state.newReelTitle,
      user_id: this.state.userId
    } 
    fetch(`${API_URL}/users/${this.state.userId}/reels`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newReel)
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
  }

  componentDidMount() {
    console.log("running componenet didmount")
    console.log("state.userId")
    console.log(this.state.userId)
    console.log("props.userId")
    console.log(this.props.userId)
    let userId = this.state.userId
    fetch(`${API_URL}/users/${userId}/reels`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res=> res.json())
      .then(data=> {
        console.log("Success we got the data", data);
        this.setState({arrayOfReels: (data)})
       // sends user to profile page
       // this.props.history.push('/reels');
      })
      .catch(err => {
        this.setState({error: err.message })
      }); 
  }
  render() {
    return (
      <div>
        <h3> {this.props.userId} 's MovieReels</h3>
        {this.state.arrayOfReels.map((reel, i) =><ReelCard key={i} reel_id={reel.Reel_id} reelTitle={reel.Reel} fetchMovies={this.props.fetchMovies} movies={this.state.moviesOfReelSelected} />)}
        <section>
          <h2>New Reel</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Reel Name</label>
              <input type="text" id="newReel" name="newReelTitle" value={this.state.newReelTitle}  onChange={this.handleChange} placeholder="Everything Hobbit"/>
            </div>
            <button type="Submit" onClick={this.makeReel}>Add Reel</button>
          </form>
        </section>
          
      </div>
    );  
  }
};

export default Reels;
