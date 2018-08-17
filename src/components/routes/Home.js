import React, { Component } from "react";
import MainMenu from "../MainMenu.js";
import Welcome from "../Welcome.js";

class Home extends Component {
  render() {
    return (
      <div>
        <MainMenu />
        <Welcome />
      </div>
    );
  }
}

export default Home;
