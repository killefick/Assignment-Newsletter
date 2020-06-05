import React, { Component } from "react";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      username: "",
      password: "",
      newsletter: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // callback to App's callbackWantsToRegister, setting
  // "wantsToRegister" true in App's state
  registerUser = () => {
    this.props.callbackWantsToRegister();
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // create new user
  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    };

    fetch("http://localhost:9000/loginuser", requestOptions)
      .then(async (response) => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
        this.setState({
          userId: data.id,
          username: data.username,
          newsletter: data.newsletter,
        });
        // send values to App by callback
        this.props.setUserData(
          this.state.userId,
          this.state.username,
          this.state.newsletter
        );
      })
      .catch((error) => {
        this.setState({ errorMessage: error.toString() });
        console.error("There was an error!", error);
      });
  };

  // log out user
  logoutUser = () => {
    this.setState({
      userId: "",
    });
    // tell App that user logged out
    this.props.setUserData(this.state.userId);
    window.location.reload(false);
  };

  render() {
    // user is logged in
    if (this.state.userId) {
      return (
        <div>
          <button id="btn-logout" className="btn" onClick={this.logoutUser}>
            Logout
          </button>
        </div>
      );
    }

    // user is not logged in
    else {
      const { username, password } = this.state;
      return (
        <div>
          <form className="login-form" onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="username"
              value={username}
              id="username"
              placeholder="Username..."
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="password"
              value={password}
              id="password"
              placeholder="Password..."
              onChange={this.handleChange}
            />
            <button type="submit" id="btn-login" className="btn">
              Login
            </button>
          </form>
          <button id="btn-register" className="btn" onClick={this.registerUser}>
            Register user
          </button>
        </div>
      );
    }
  }
}
