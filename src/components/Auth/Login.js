import React, { useState, useContext} from 'react';
import { API_URL } from '../../constants/constants';

const Login = (props)=>{
  //state = {
    //email: '',
    //password: '',
    //error: null,
  //};
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

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
    const user = {
      email: email,
      password: password,
      error: null
    }
    fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res=> res.json())
      .then(data=> {
        console.log("Success from Auth/login", data);
        //
        props.setCurrentUser(data);
       // sends user to reels page
        props.history.push('/reels');
      })
      .catch(err => {
      //  this.setState({error: err.message })
        setError(err.message)
      });     

  };

  //render() {
    return (
      <div className="login-container">
        {error && (
          <div className="alert alert-danger alert-dismissible fade show" style={{width: '100%'}} role="alert">
            {error}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
        <section id="login" className="col-md-6 offset-md-3">
          <form  className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className='email-login'>Email </label>
              <input type="email" className='login-input' id="email" name="email" value={email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email" className='password-login'>Password </label>
              <input type="password" id="password" className='login-input' name="password" value={password} onChange={handleChange} />
            </div>
            <div className="login-button-container">
                <button type="submit" className="login-button">Login</button>
            </div>
          </form>
        </section>
      </div>
    );
  //};
};

export default Login;
