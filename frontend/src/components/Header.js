import React, { Component } from "react";
import axios from "axios";

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
    axios
      .post("http://localhost:9000/loginuser", {
        user: {
          username: username,
          password: password,
        },
      })
      .then((response) => {
        this.setState({
          userId: response.data.id,
          username: response.data.username,
          newsletter: response.data.newsletter,
        });
        // send values to App
        this.props.sendUserData(
          this.state.userId,
          this.state.username,
          this.state.newsletter
        );
      });
  };

  // log out user
  logoutUser = () => {
    this.setState({
      userId: "",
    });
    // tell App that user logged out
    this.props.sendUserData(this.state.userId);
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
