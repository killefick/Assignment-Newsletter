import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import MainPage from "./components/MainPage";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      username: "",
      newsletter: false,
      wantsToRegister: false,
    };
  }

  // all info about user
  setUserData = (userId, username, newsletter) => {
    this.setState({
      userId: userId,
      username: username,
      newsletter: newsletter,
      wantsToRegister: false,
    });
  };

  // set state of wantsToRegister
  setWantsToRegister = () => {
    this.setState({
      wantsToRegister: true,
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Newsletter</h1>
        <Header
          // send userData object to child
          setUserData={this.setUserData.bind(this)}
          // enable user registration on button
          callbackWantsToRegister={this.setWantsToRegister.bind(this)}
        />
        <MainPage
          // send props to child
          userId={this.state.userId}
          setUserData={this.setUserData}
          currentUserName={this.state.username}
          userNewsletter={this.state.newsletter}
          registration={this.state.wantsToRegister}
        />
      </div>
    );
  }
}
