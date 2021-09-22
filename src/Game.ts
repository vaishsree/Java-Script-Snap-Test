const CardRank = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const CardSuit = ['hearts', 'spades', 'diamonds', 'clubs'];
export const PLAYER1 = "Player1";
export const PLAYER2 = "Player2";
export let players = [];
export const deck: Card[] = [];
export let player1Cards: Card[] = [];
export let player2Cards: Card[] = [];
let openDeck: Card[] = [];
let playCard: Card[] = [];
let matchCard = false;
let gameWinner = '';

export interface Card {
    cardSuit: any,
    cardRank: string
}

export interface DealState {
    openedDeck: any;
    cardCount: number,
    player1Cards: Card[],
    player2Cards: Card[],
    sameCard: boolean,
    executionCount:number;
    winner: string,
    player1RoundWon : number;
    player2RoundWon : number;
    roundWinner: string,
    nextTurn: string
}

export const isMatched = (prevCard: Card, currentCard: Card) => {
  if(!prevCard || !currentCard) return false;
  if(prevCard.cardRank === currentCard.cardRank) return true;
  else return false;
}

const isWinner = (player1Score: number, player2Score: number) => {
  if (player1Score > player2Score) {
    return PLAYER1;
  }
  else{
    return PLAYER2;
  }
}

const addToTop = (card: Card, cards: Card[]) => {
  cards.pop();
  cards.push(card);
  return cards;
}

const removeFromTop = (card: Card, cards: Card[]) =>{ 
  if(!card && cards.length === 0) return cards;
  cards.splice(0, 1);
  return cards;
}

const BuildDeck = (): any => {
    CardSuit.forEach(cardSuit => {
        CardRank.forEach(cardRank => {
            deck.push({cardSuit, cardRank});
        })
    });
}

const shuffleDeck = (deck: Card[]) => {
    for (let i = 0; i < 100; i++) {
        const location1 = Math.floor((Math.random() * deck.length));
        const location2 = Math.floor((Math.random() * deck.length));
        const tmp = deck[location1];

        deck[location1] = deck[location2];
        deck[location2] = tmp
    }
    return deck;
};

const dealCards = (): any => {
    if(deck.length === 0) {
      BuildDeck();
    }
    const shuffleCards = shuffleDeck(deck);
    player1Cards  = shuffleCards.slice(0, (deck.length/2));
    player2Cards  = shuffleCards.slice((deck.length/2), deck.length);
    
    return{
        player1Cards: player1Cards,
        player2Cards: player2Cards
    }

}

export const initialDealCard = (): DealState => {
    const {player1Cards, player2Cards} = dealCards();
    
    return{
        player1Cards,
        player2Cards,
        openedDeck: [],
        sameCard: false,
        cardCount: player1Cards.length,
        executionCount: 0,
        player1RoundWon:0,
        player2RoundWon:0,
        winner: '',
        roundWinner: '',
        nextTurn: PLAYER1
    }
}

export const Player1Deal = (prevDeal: DealState) => {
  if(prevDeal.executionCount === 0){
    matchCard=false;
    if(prevDeal.winner){
        return prevDeal;
    }
    const lastPlayedCard = prevDeal.openedDeck[0];
    const currentPlayedCard = prevDeal.player1Cards[0];

    if (lastPlayedCard) {
      matchCard = isMatched(lastPlayedCard, currentPlayedCard);
    }

    if (prevDeal.cardCount === 1) { 
     gameWinner = isWinner(prevDeal.player1RoundWon, prevDeal.player2RoundWon);
    }

    openDeck = addToTop(currentPlayedCard, prevDeal.openedDeck);
    playCard = removeFromTop(currentPlayedCard, player1Cards);
    prevDeal.executionCount = 1;
  }

  return {
    openedDeck: openDeck,
    player1Cards: playCard,
    player2Cards: prevDeal.player2Cards,
    sameCard: matchCard,
    cardCount:player2Cards.length,
    executionCount: 0,
    player1RoundWon: prevDeal.player1RoundWon,
    player2RoundWon:prevDeal.player2RoundWon,
    winner: gameWinner,
    roundWinner: '',
    nextTurn: PLAYER2,
  };
}

export const Player2Deal = (prevDeal: DealState) => {
  if(prevDeal.executionCount === 0){
    matchCard=false;
    if(prevDeal.winner){
        return prevDeal;
    }

    const lastPlayedCard = prevDeal.openedDeck[0];
    const currentPlayedCard = prevDeal.player2Cards[0];
  
    if (lastPlayedCard) {
      matchCard = isMatched(lastPlayedCard, currentPlayedCard);
    }

    if (prevDeal.cardCount === 1) { 
      gameWinner = isWinner(prevDeal.player1RoundWon, prevDeal.player2RoundWon);
    }

    openDeck = addToTop(currentPlayedCard, prevDeal.openedDeck);
    playCard = removeFromTop(currentPlayedCard, player2Cards);
    prevDeal.executionCount = 1;
  }

  return {
    openedDeck: openDeck,
    player2Cards: playCard,
    player1Cards: prevDeal.player1Cards,
    sameCard: matchCard,
    cardCount:player1Cards.length,
    executionCount: 0,
    player1RoundWon: prevDeal.player1RoundWon,
    player2RoundWon:prevDeal.player2RoundWon,
    winner: gameWinner,
    roundWinner: '',
    nextTurn: PLAYER1,
  };  
}

export const onPlayer1Snap = (prevDeal: DealState) => {
  if(prevDeal.cardCount === 1) return prevDeal;
  if(prevDeal.executionCount === 0){
    prevDeal.player1RoundWon = prevDeal.player1RoundWon + 1;
    prevDeal.executionCount = 1;
  }
  return{
    player1Cards: [...prevDeal.player1Cards, ...prevDeal.openedDeck],
    openedDeck: [],
    sameCard: false,
    roundWinner: PLAYER1,
    player2Cards: prevDeal.player2Cards,
    cardCount:player1Cards.length,
    executionCount: 0,
    player1RoundWon: prevDeal.player1RoundWon,
    player2RoundWon:prevDeal.player2RoundWon,
    winner: '',
    nextTurn: PLAYER2
  }
}

export const onPlayer2Snap = (prevDeal: DealState) => {
  if(prevDeal.cardCount === 1) return prevDeal;
  if(prevDeal.executionCount === 0){
    prevDeal.player2RoundWon = prevDeal.player2RoundWon + 1;
    prevDeal.executionCount = 1;
  }
  return{
    player2Cards: [...prevDeal.player2Cards, ...prevDeal.openedDeck],
    openedDeck: [],
    sameCard: false,
    roundWinner: PLAYER2,
    player1Cards: prevDeal.player1Cards,
    cardCount:player1Cards.length,
    executionCount: 0,
    player1RoundWon: prevDeal.player1RoundWon,
    player2RoundWon:prevDeal.player2RoundWon,
    winner: '',
    nextTurn: PLAYER1
  }
}
