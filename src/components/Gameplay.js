import React, { Component } from "react";

export default class Gameplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerName: props.name,
      playerDeck: props.userCards,
      computerDeck: props.cards,
      playerCard: "",
      computerCard: "",
      winnings: 0,
      losses: 0,
      flag: true
    };
  }

  show = () => {
    if (this.state.flag === true) {
      this.handlePlayerCard();
      this.setState({ flag: false });
    }
  };

  handlePlayerCard = () => {
    {
      let randomCard = parseInt(
        this.state.playerDeck[
          Math.floor(Math.random() * this.state.playerDeck.length)
        ]
      );
      this.setState({ playerCard: randomCard });
      let cardUserIndex = this.state.playerDeck.indexOf(randomCard);
      this.state.playerDeck.splice(cardUserIndex, 1);
    }
    this.handleComputerCard();
  };

  handleComputerCard = () => {
    if (this.state.computerDeck.length !== 0) {
      let randomCardComp = parseInt(
        this.state.computerDeck[
          Math.floor(Math.random() * this.state.computerDeck.length)
        ]
      );
      this.setState({ computerCard: randomCardComp });
      let cardCompIndex = this.state.computerDeck.indexOf(randomCardComp);
      this.state.computerDeck.splice(cardCompIndex, 1);
    }
    this.whoIsBigger();
  };

  whoIsBigger = () => {
    if (this.state.computerCard > this.state.playerCard) {
      this.setState({ losses: this.state.losses + 1 });
    }
    if (this.state.computerCard < this.state.playerCard) {
      this.setState({ winnings: this.state.winnings + 1 });
    }
    if (
      this.state.playerDeck.length === 0 &&
      this.state.computerDeck.length === 0
    ) {
      this.setState({ winnings: this.state.winnings });
      this.props.winningsAmount(this.state.winnings);
      this.setState({ losses: this.state.losses });
      this.props.lossesAmount(this.state.losses);
    }
  };

  render() {
    return (
      <div className="homeContainerBox">
        <div className="grid-title">
          <div className="computer"> Computer </div>
          <div className="computerStatus"> {this.state.losses} </div>
             <div className="vs"> vs  </div>
            <div className="title"> {this.state.playerName} </div>
            <div className="playerStatus"> {this.state.winnings} </div>
          </div>
        <div className="grid-cards">
          <div className="card1">
            <div className="card-war">{this.state.computerCard}</div>
            <div className="computerName"> Computer </div>
          </div>

          <div className="card2">
            <div className="card-war">{this.state.playerCard}</div>
            <div className="playerName"> {this.state.playerName}</div>
          </div>
        </div>
        {this.show()}
        <button className="next" onClick={this.handlePlayerCard} to="/final">
          Next
        </button>
      </div>
    );
  }
}
