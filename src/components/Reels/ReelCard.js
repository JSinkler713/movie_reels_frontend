import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../../UserContext'
import { Link } from 'react-router-dom'
import { API_URL } from '../../constants/constants';

//when using a functional component we need to manually pass down the props to that component


const ReelCard = (props)=> {
  const [movies, setMovies] = useState([])
  const [image, setImage] = useState('')
  const [user, setUser] = useContext(UserContext)

  const setReelId =()=> {
    setUser({
      ...user,
      reel_id: props.reel_id
    })
    
  }

  useEffect(()=> {
    fetch(`${API_URL}/reels/${props.reel_id}/movies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res=> res.json())
      .then(data=> {
        console.log("Success we got the data", data);
        if (data.length > 0) {
          const length = data.length
          let random = Math.floor(Math.random() * length)
          setMovies(data[random])
          setImage(data[random].Poster)
        }else {
          setImage('https://placebear.com/g/200/300')
        }
       // sends user to profile page
       // this.props.history.push('/reels');
      })
      .catch(err => {
        //this.setState({error: err.message })
      }); 
  }, [])

  /*
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
  deleteReel = (reelId) => {
    let id = this.props.reel_id
    this.props.deleteReel(id)
  }
  */  
  return ( 
    <div className='reel-card'>
      <Link onClick={setReelId} to={`/reels/${props.reel_id}`}>
        { props.reelTitle } 
      </Link><br/>
        {image 
          ? (<img src={image} alt='no movies yet' />)
          : (
          <div className='poster-standin'>
          </div>
          )
        }
      <button className='delete-reel-button' onClick={()=> console.log('delete')}>Delete Reel </button>
    </div>
  )
};

export default ReelCard;
