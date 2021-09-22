import React, { useState } from 'react';
import './App.css';
import HiddenDeck from './components/HiddenDeck/HiddenDeck';
import PlayDeck from './components/PlayDeck/PlayDeck';
import { PLAYER1, PLAYER2, initialDealCard, Player1Deal, Player2Deal, onPlayer1Snap, onPlayer2Snap } from './Game';

function App() {

  //useState hook to set state
  const[currentTurn, setNextTurn] = useState(initialDealCard);

  //Function on Open Card click
  const flippedCardClick = () => {
    if(currentTurn.nextTurn === PLAYER1) {
      currentTurn.executionCount =0;
      setNextTurn(onPlayer1Snap);
    }
    if(currentTurn.nextTurn === PLAYER2) { 
      currentTurn.executionCount =0;
      setNextTurn(onPlayer2Snap);
    }
  }

  //Function on Hidden Card click
  const hiddenCardClick = () => { 
    if(currentTurn.nextTurn === PLAYER1) {
      currentTurn.executionCount =0;
      setNextTurn(Player1Deal);
    }
    if(currentTurn.nextTurn === PLAYER2) { 
      currentTurn.executionCount =0;
      setNextTurn(Player2Deal);
    }
  }

  return (
    <div>
      <h3>{currentTurn.winner && (currentTurn.player1RoundWon > 0 || currentTurn.player2RoundWon > 0) && 
          <div className="winnerTitle">
            <label>👏</label>
            <label>{currentTurn.winner} Won</label>
            <label>👏</label>
        </div>}
      </h3>
      <h3>{currentTurn.cardCount === 1 && currentTurn.player1RoundWon === currentTurn.player2RoundWon && (currentTurn.player1RoundWon > 0 || currentTurn.player2RoundWon > 0) &&
          <div className="winnerTitle">
            <label>👏</label>
            <label>The game was a Draw</label>
            <label>👏</label>
        </div>}
      </h3>
      <div> 
      {currentTurn.cardCount !==0 && (currentTurn.player1RoundWon > 0 || currentTurn.player2RoundWon > 0) && <label className={currentTurn.cardCount !==0 ? "winnerTitle" : ""}>Rounds Won </label>}
      </div> 
      <div> 
      {currentTurn.cardCount !==0 && (currentTurn.player1RoundWon > 0 || currentTurn.player2RoundWon > 0) && <label className={currentTurn.cardCount !==0 ? "winnerTitle" : ""}>Player 1: {currentTurn.player1RoundWon} Player 2: {currentTurn.player2RoundWon}</label>}
      </div> 
      <div className="CardLayout">
      <HiddenDeck 
      onClick={hiddenCardClick}
      currentPlayer={PLAYER1}
      isCurrent={currentTurn.nextTurn === PLAYER1 }
      sameCard={currentTurn.sameCard}
      cardCount={currentTurn.cardCount}
      roundWinner={currentTurn.roundWinner}
      player1RoundWon={currentTurn.player1RoundWon}
      player2RoundWon={currentTurn.player2RoundWon}
      winner={currentTurn.winner}
      />
      <PlayDeck 
      onClick={flippedCardClick}
      currentCard={currentTurn.openedDeck[0]}
      sameCard={currentTurn.sameCard}
      cardCount={currentTurn.cardCount}
      currentPlayer={currentTurn.nextTurn}
      winner={currentTurn.winner}
      />
      <HiddenDeck
      onClick={hiddenCardClick}
      currentPlayer={PLAYER2}
      isCurrent={currentTurn.nextTurn === PLAYER2}
      sameCard={currentTurn.sameCard}
      cardCount={currentTurn.cardCount}
      roundWinner={currentTurn.roundWinner}
      player1RoundWon={currentTurn.player1RoundWon}
      player2RoundWon={currentTurn.player2RoundWon}
      winner={currentTurn.winner}
      />
      </div>
    </div>
  );
}

export default App;
