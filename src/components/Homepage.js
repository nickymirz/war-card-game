import React, { Component } from "react";
import history from "../History";

export default class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      show: false
    };
  }

  updateName = e => {
    this.setState({ name: e.target.value });
  };

  checkTheName = () => {
    if (this.state.name.length > 0) {
      this.props.startTheGame(this.state.name);
      history.push("/gameplay");
    } else {
      //   alert("Enter valid name");
      this.setState({ show: true });
      return <p> "enter valid name" </p>;
    }
  };

  render() {
    return (
      <div className="homeContainerBox">
        <div className="whiteBox">
          <h3> are you ready to</h3>
          <h1 className="ready">WAR?</h1>
          <div>
            <input
              className="input"
              onChange={this.updateName}
              type="text"
              placeholder="Enter your name"
            />
            {this.state.show && (
              <span className="error"> * name can not be blank </span>
            )}
          </div>
          <div>
            <button className="play beat" onClick={this.checkTheName}>
              Let's Play!
            </button>
          </div>
        </div>
      </div>
    );
  }
}
