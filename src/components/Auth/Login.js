import React, { useState, useContext, useEffect} from 'react';
import {UserContext} from '../../UserContext'
import { API_URL } from '../../constants/constants';
import { useHistory} from 'react-router-dom'
const Login = (props)=>{
  //state = {
    //email: '',
    //password: '',
    //error: null,
  //};
  const history = useHistory()
  const [user, setUser] = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [badRequest, setBadRequest] = useState(false)

  const error = !badRequest ? '' : 'red'

  useEffect(()=> {setUser({
      uid: '',
      userId: '',
      username: '',
      email: '',
      moviesOfReelSelected: [],
      reel_id:'',
      arrayOfReels: [],
    })
  }, [])

  
  const handleChange = (event) => {
    if (event.target.name == 'password'){
      setPassword(event.target.value)
    } else if (event.target.name == 'email') {
      setEmail(event.target.value)
    }
  };

//  handleChange = (event) => {
//    this.setState({
//      [event.target.name]: event.target.value,
//    });
//  };

  const handleSubmit = (event) => {
    // handle submit here
    event.preventDefault();
 //   const user = this.state
    const userForm = {
      email: email,
      password: password,
      error: null
    }
    fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userForm)
    })
      .then(res=> res.json())
      .then(data=> {
        if (data.status != 200) {
          setBadRequest(true)
        } else {
        console.log("Success from Auth/login", data);
        //set user in context and in localstorage
        localStorage.setItem('uid', data.signedJwt);
        localStorage.setItem('userId', data.id)
        localStorage.setItem('email' , data.email) 
        localStorage.setItem('username', data.username)
        setUser({
          ...user,
          currentUser: data.signedJwt,
          userId: data.id,
          username: data.username,
          email: data.email 
        })
        // with useHistory hook
        if (data.signedJwt) {
          history.push('/reels')
        }
        }
      })
      .catch(err => {
      //  this.setState({error: err.message })
      //        setError(err.message)
      console.log(err.message)
      setBadRequest(true)
      });     

  };

  //render() {
    return (
      <div className="login-container">
        <section id="login">
          <form  className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className='email-login'>Email </label>
              <input type="email" className={badRequest?'login-input red':'login-input'} id="email" name="email" value={email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email" className='password-login error'>Password </label>
              <input type="password" id="password" className={badRequest?'login-input red':'login-input'} name="password" value={password} onChange={handleChange} />
            </div>
            <div className="login-button-container">
                <button type="submit" className="login-button error">Login</button>
            </div>
          </form>
        </section>
      </div>
    );
  //};
};

export default Login;
