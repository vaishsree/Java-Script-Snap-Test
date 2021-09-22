import React, { Component } from "react";
import './HiddenDeck.css';

interface IHiddenCardProps {
  onClick: () => void;
  currentPlayer: string;
  isCurrent:boolean;
  cardCount:number;
  roundWinner: string;
  winner:string;
  player1RoundWon: number;
  player2RoundWon: number;
  sameCard:boolean;
}

class HiddenDeck extends Component<IHiddenCardProps>{

  private constructor(props:IHiddenCardProps) {
    super(props);
  }

  render() {
    return (
      <div className="cardContainer">
        {this.props.isCurrent && this.props.cardCount !== 1 && <label className={this.props.currentPlayer ? "currentPlayer" : ""}>{this.props.currentPlayer}</label>}
        {this.props.roundWinner && this.props.roundWinner === this.props.currentPlayer   && <label className={this.props.roundWinner ? "roundWinner" : ""}></label>}
        <div className={`hiddenCard ${this.props.cardCount === 0 ? "disabled" : ""} back`} onClick={this.props.onClick}>
        </div>
      </div>
    );
  }
}

export default HiddenDeck;
