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
      reel_id: props.reel_id,
      reel_title: props.reelTitle
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
          setImage('https://placebear.com/g/300/445')
        }
      })
      .catch(err => {
        console.log(err)
      }); 
  }, [setUser])

  return ( 
    <div className='reel-card'>
      <div>
       <button className='reel-card-title'>
        <Link  onClick={setReelId} to={`/reels/${props.reel_id}`}>
          { props.reelTitle } 
        </Link>
        </button> 
      </div>
        {image 
          ? (<img src={image} alt='no movies yet' />)
          : (
          <div className='poster-standin'>
          </div>
          )
        }
    </div>
  )
};

export default ReelCard;
