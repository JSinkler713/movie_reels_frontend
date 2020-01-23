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
  deleteReel = (reelid) => {
    console.log("trying to delete reel" + reelid)
    fetch(`${API_URL}/reels/${reelid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res=> {
        console.log(res)
        this.props.history.push('/reels');
      })
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
        <div className='top-of-reels'>
        <section className="new-reel-form">
          <div className='inner-new-reel-form'>
          <h2>New Reel</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Reel Name</label>
              <input type="text" id="newReel" name="newReelTitle" value={this.state.newReelTitle}  onChange={this.handleChange} placeholder="Everything Hobbit"/>
            </div>
            <button type="Submit" onClick={this.makeReel}>Add Reel</button>
          </form>
          </div>
        </section>
          <div className='top-of-reels-info'>
            <p>Make a new reel on your left. If you want to browse one of your already created reels, just click the reel title, above it's poster. Make sure to contribute by making new Reels of Movies that you think should belongtogether. We count on your contributoin to make Movie_Reels great!
            </p>
          </div>
        </div>
        <div className="my-reels-container">
        {this.state.arrayOfReels.map((reel, i) =><ReelCard key={i} reel_id={reel.Reel_id} deleteReel={this.deleteReel} reelTitle={reel.Reel} fetchMovies={this.props.fetchMovies} movies={this.state.moviesOfReelSelected} />)}
        </div>
          
      </div>
    );  
  }
};

export default Reels;
