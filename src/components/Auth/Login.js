import React, { Component } from 'react';
import { API_URL } from '../../constants/constants';

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: null,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    // handle submit here
    event.preventDefault();
    const user = this.state
    fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res=> res.json())
      .then(data=> {
        console.log("Success", data);
        this.props.setCurrentUser(data);
       // sends user to reels page
        this.props.history.push('/reels');
      })
      .catch(err => {
        this.setState({error: err.message })
      });     

  };

  render() {
    return (
      <div className="login-container">
        {this.state.error && (
          <div className="alert alert-danger alert-dismissible fade show" style={{width: '100%'}} role="alert">
            {this.state.error}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
        <section id="login" className="col-md-6 offset-md-3">
          <form  className="login-form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className='email-login'>Email </label>
              <input type="email" className='login-input' id="email" name="email" value={this.state.email} onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email" className='password-login'>Password </label>
              <input type="password" id="password" className='login-input' name="password" value={this.state.password} onChange={this.handleChange} />
            </div>
            <div className="login-button-container">
                <button type="submit" className="login-button">Login</button>
            </div>
          </form>
        </section>
      </div>
    );
  };
};

export default Login;
