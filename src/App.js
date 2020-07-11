import { Router, Switch, Route } from "react-router-dom";
import React, { Component } from "react";
import "./App.css";
import Gameplay from "./components/Gameplay";
import Homepage from "./components/Homepage";
import Final from "./components/Final";
import history from "./History";
import "bootstrap/dist/css/bootstrap.min.css";

export default class App extends Component {
  state = {
    name: "",
    winning: 0,
    loses: 0,
    theWinner: "",
    playercards: [],
    cards: [1,1,1,1,
      2,2,2,2,
      3,3,3,3,
      4,4,4,4,
      5,5,5,5,
      6,6,6,6,
      7,7,7,7,
      8,8,8,8,
      9,9,9,9,
      10,10,10,10,
      11,11,11,11,
      12,12,12,12,
      13,13,13,13]
  };

  randomcard = () => {
    let usercards = [];
    for (let i = 1; i <= 26; i++) {
      let card = this.state.cards[Math.floor(Math.random() * 26)];
      usercards.push(card);
      this.state.cards.splice(card, 1);
    }
    this.setState({ playercards: [...usercards] });
  };

  userName = e => {
    this.setState({ name: e });
    this.randomcard();
  };

  winnings = win => {
    this.setState({ winning: win }, () =>
      console.log(`your wins: ${this.state.winning}`)
    );
  };

  losses = lose => {
    this.setState({ loses: lose }, () =>
      console.log(`your loses:${this.state.loses}`)
    );
    this.checkWinner();
  };

  checkWinner = () => {
    if (this.state.winning && this.state.loses) {
      if (this.state.winning > this.state.loses) {
        this.setState({ theWinner: this.state.name }, () =>
          console.log(this.state.theWinner)
        );
        history.push("/final");
      }
      if (this.state.winning === this.state.loses) {
        this.setState({ theWinner: "Tie" }, () =>
          console.log(this.state.theWinner)
        );
        history.push("/final");
      }
      if (this.state.winning < this.state.loses) {
        this.setState({ theWinner: "computer" }, () =>
          console.log(this.state.theWinner)
        );
        history.push("/final");
      }
    }
  };

  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Switch>
            <Route
              exact
              path="/war-game"
              component={() => {
                return <Homepage startTheGame={this.userName} />;
              }}
            />
            <Route
              exact
              path="/gameplay"
              component={() => {
                return (
                  <Gameplay
                    winningsAmount={this.winnings}
                    lossesAmount={this.losses}
                    checkWinner={this.checkWinner}
                    name={this.state.name}
                    userCards={this.state.playercards}
                    cards={this.state.cards}
                  />
                );
              }}
            />
            <Route
              exact
              path="/final"
              component={() => {
                return <Final theWinner={this.state.theWinner} />;
              }}
            />
          </Switch>
          <div className="nicky"> simple war game by Nicky Mirz </div>
        </Router>
      </div>
    );
  }
}
