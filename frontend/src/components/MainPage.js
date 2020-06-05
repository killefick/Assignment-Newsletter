import React, { Component } from "react";
import axios from "axios";

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      username: this.props.username,
      newsletter: this.props.newsletter,
      email: "",
      registration: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // set state values to input values
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    // don't reload page
    e.preventDefault();
    // set variables from state
    const { username, password, email } = this.state;
    axios
      .post("http://localhost:9000/registerUser", {
        user: {
          username: username,
          password: password,
          email: email,
          newsletter: true,
        },
      })
      .then(() => {
        // refresh page
        window.location.reload();
      });
  };

  changeNewsletterStatus = () => {
    axios.put("http://localhost:9000/userPage/" + this.props.userId, {
      user: {
        id: this.props.userId,
        newsletter: this.props.userNewsletter === true ? false : true,
      },
    });
    window.location.reload();
  };

  render() {
    // show registration page
    if (this.props.registration) {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="username"
              value={this.state.username}
              placeholder="Username"
              onChange={this.handleChange}
            />
            <br />
            <input
              type="password"
              name="password"
              value={this.state.password}
              placeholder="Password"
              onChange={this.handleChange}
            />
            <br />
            <input
              type="text"
              name="email"
              value={this.state.email}
              placeholder="Email"
              onChange={this.handleChange}
            />
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    }

    // if user is logged in
    if (this.props.userId) {
      // if user has newsletter
      if (this.props.userNewsletter) {
        return (
          <div className="main-page">
            <div>Välkommen {this.props.currentUserName}</div>
            Newsletter:{" "}
            <input
              type="checkbox"
              checked
              onChange={this.changeNewsletterStatus}
            />
          </div>
        );
      }

      // if user has no newsletter
      else {
        return (
          <div className="main-page">
            <div>Välkommen {this.props.currentUserName}</div>
            Newsletter:{" "}
            <input type="checkbox" onChange={this.changeNewsletterStatus} />
          </div>
        );
      }

      // user not logged in
    } 
    
    else {
      return (
        <div className="main-page">
          <div>Please log in...</div>
        </div>
      );
    }
  }
}
