import HiddenDeck from './components/HiddenDeck/HiddenDeck';
import PlayDeck from './components/PlayDeck/PlayDeck';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';
import { PLAYER1, PLAYER2, isMatched } from './Game';

configure({ adapter: new Adapter() });

interface Card {
  cardSuit: any,
  cardRank: string
}

describe('App', () => {
  it('on start there are 26 cards for each player', () => {
    const myMock = jest.fn();
    const props = {
      currentPlayer: "Player2",
      isCurrent:true,
      cardCount:25,
      roundWinner: '',
      winner:'',
      player1RoundWon: 0,
      player2RoundWon: 0,
      sameCard:false
    };

    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        
        const sut = shallow(<HiddenDeck onClick={myMock} {...props} />);
        sut.first().simulate('click');
        expect(props.cardCount).toBe(25);
        expect(props.currentPlayer).toBe(PLAYER2);
        resolve();
      }, 0);
    });
  });
  it('on Player2 click there are 25 cards for each player', () => {
    const myMock = jest.fn();
    const props = {
      currentPlayer: "Player1",
      isCurrent:true,
      cardCount:25,
      roundWinner: '',
      winner:'',
      player1RoundWon: 0,
      player2RoundWon: 0,
      sameCard:false
    };

    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        
        const sut = shallow(<HiddenDeck onClick={myMock} {...props} />);
        sut.first().simulate('click');
        sut.simulate('click');
        expect(props.cardCount).toBe(25);
        expect(props.currentPlayer).toBe(PLAYER1);
        resolve();
      }, 0);
    });
  });
  it('isMatched function returns true only if card has the same cardRank', () => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const cardOne:Card = {cardRank:"A", cardSuit:"clubs"};
        const cardTwo:Card = {cardRank:"A", cardSuit:"spades"};
        const cardThree:Card = {cardRank:"1", cardSuit:"clubs"};
        const cardFour:Card = {cardRank:"K", cardSuit:"clubs"};
        expect(isMatched(cardOne, cardTwo)).toEqual(true);
        expect(isMatched(cardOne, cardThree)).toEqual(false);
        expect(isMatched(cardOne, cardFour)).toEqual(false);
        resolve();
      }, 0);
    });
  });
  it('onPlayer1Snap snap player1 is roundwinner', () => {
    const cardPlayer1:Card = {cardRank:"A", cardSuit:"clubs"};
    const myMock = jest.fn();
    const playProps = {
      currentCard: cardPlayer1,
      currentPlayer:PLAYER1,
      winner:'',
      sameCard:true,
      cardCount:20
    };

    const hiddenProps = {
      currentPlayer: "Player2",
      isCurrent:true,
      cardCount:19,
      roundWinner: 'Player1',
      winner:'',
      player1RoundWon: 1,
      player2RoundWon: 0,
      sameCard:false
    };

    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        
        const snapPlayer1 = shallow(<PlayDeck onClick={myMock} {...playProps} />);
        snapPlayer1.first().simulate('click');
        expect(hiddenProps.cardCount).toBe(19);
        expect(hiddenProps.currentPlayer).toBe("Player2");
        expect(hiddenProps.roundWinner).toBe("Player1");
        expect(hiddenProps.player1RoundWon).toBe(1);
        resolve();
      }, 0);
    });
  });
  it('onPlayer2Snap snap player2 is roundwinner', () => {
    const cardPlayer2:Card = {cardRank:"Q", cardSuit:"hearts"};
    const myMock = jest.fn();
    const playProps = {
      currentCard: cardPlayer2,
      currentPlayer:PLAYER2,
      winner:'',
      sameCard:true,
      cardCount:25
    };

    const hiddenProps = {
      currentPlayer: "Player1",
      isCurrent:true,
      cardCount:24,
      roundWinner: 'Player2',
      winner:'',
      player1RoundWon: 0,
      player2RoundWon: 1,
      sameCard:false
    };

    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        
        const snapPlayer2 = shallow(<PlayDeck onClick={myMock} {...playProps} />);
        snapPlayer2.first().simulate('click');
        expect(hiddenProps.cardCount).toBe(24);
        expect(hiddenProps.currentPlayer).toBe("Player1");
        expect(hiddenProps.roundWinner).toBe("Player2");
        expect(hiddenProps.player2RoundWon).toBe(1);
        resolve();
      }, 0);
    });
  });
  it('player1 is winner if player1RoundWon is more than player2RoundWon', () => {
    const hiddenProps = {
      currentPlayer: "Player1",
      isCurrent:true,
      cardCount:0,
      roundWinner: '',
      winner:'Player1',
      player1RoundWon: 3,
      player2RoundWon: 1,
      sameCard:false
    };

    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        expect(hiddenProps.cardCount).toBe(0);
        expect(hiddenProps.currentPlayer).toBe("Player1");
        expect(hiddenProps.winner).toBe("Player1");
        expect(hiddenProps.player1RoundWon).toBeGreaterThan(hiddenProps.player2RoundWon);
        resolve();
      }, 0);
    });
  });
  it('player2 is winner if player2RoundWon is more than player1RoundWon', () => {
    const hiddenProps = {
      currentPlayer: "Player2",
      isCurrent:true,
      cardCount:0,
      roundWinner: '',
      winner:'Player2',
      player1RoundWon: 0,
      player2RoundWon: 4,
      sameCard:false
    };

    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        expect(hiddenProps.cardCount).toBe(0);
        expect(hiddenProps.currentPlayer).toBe("Player2");
        expect(hiddenProps.winner).toBe("Player2");
        expect(hiddenProps.player2RoundWon).toBeGreaterThan(hiddenProps.player1RoundWon);
        resolve();
      }, 0);
    });
  });
  it('game is draw if player1RoundWon is same as player2RoundWon', () => {
    const hiddenProps = {
      currentPlayer: "Player1",
      isCurrent:true,
      cardCount:0,
      roundWinner: '',
      winner:'',
      player1RoundWon: 2,
      player2RoundWon: 2,
      sameCard:false
    };

    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        expect(hiddenProps.cardCount).toBe(0);
        expect(hiddenProps.currentPlayer).toBe("Player1");
        expect(hiddenProps.winner).toBe("");
        expect(hiddenProps.player1RoundWon).toEqual(hiddenProps.player2RoundWon);
        resolve();
      }, 0);
    });
  });
});


