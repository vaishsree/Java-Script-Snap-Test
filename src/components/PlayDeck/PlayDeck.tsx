import React, { Component } from "react";
import "./PlayDeck.css";
import { Card } from '../../Game';

interface IPlayCardProps {
  onClick: () => void;
  currentCard?: Card;
  currentPlayer:string;
  winner:string;
  sameCard:boolean;
  cardCount:number;
}

class PlayDeck extends Component<IPlayCardProps> {

  private constructor(props:IPlayCardProps) {
    super(props);
  }


  render() {
    return ( 
      <div className="cardContainer" onClick={this.props.onClick}>
        {(!this.props.currentCard) &&
          <div className="playCard face" />
        }
        {(this.props.currentCard) &&
          <div className={`playCard ${this.props.sameCard ? "snap" : ""} rank${this.props.currentCard.cardRank} ${this.props.cardCount === 0 && !this.props.sameCard ? "disabled" : ""}`} ><div className={`face ${this.props.currentCard.cardSuit}`} /></div>
        }
      </div>
    );
  }
}

export default PlayDeck;
