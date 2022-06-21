var cardDeck = []
var gameState = "waiting input";
var playerCards = [];
var computerCards = [];

var makeDeck = function(){
  var suit = ["♦️", "♣️", "❤️", "♠️"];
  for(i = 0; i < suit.length; i++){
    currentsuit = suit[i];
    for(j = 1; j <= 13; j++){
      var cardName = j
      var score = j
      if (cardName == 1){
        cardName = "Ace";
      }
      if (cardName == 11){
        cardName = "Jack";
      }
      if (cardName == 12){
        cardName = "Queen";
      }
      if (cardName == 13){
        cardName = "King";
      }

      if (score == 1){
        score = 1;
      }
      if (score == 11){
        score = 10;
      }
      if (score == 12){
        score = 10;
      }
      if (score == 13){
        score = 10;
      }

      var card = {
        Name: cardName,
        suit: currentsuit,
        rank: j,
        points: score,
      }

      cardDeck.push(card);
    }
  }
  return cardDeck;
}

var getRandomIndex = function(){
  var randoDecimal = Math.random() * 51;
  var randomNumber = Math.floor(randoDecimal);
  return randomNumber;
}

var shuffledDeck = function(cardDeck){
  var cardDeck = makeDeck();
  for (i = 0; i < cardDeck.length; i++){
    var randomIndex = getRandomIndex(cardDeck.length);
    var currentCard = cardDeck[i];
    var randomCard = cardDeck[randomIndex];
    cardDeck[i] = randomCard;
    cardDeck[randomIndex] = currentCard;
  }
  return cardDeck;
}

var showInitialCards = function(){
  cardDeck = shuffledDeck();
  for (i = 0; i < 2; i++){
    playerCards.push(cardDeck.pop());
    computerCards.push(cardDeck.pop());
  }
  return "Player hand: " + playerCards[0].Name + " of " + playerCards[0].suit + " and " + playerCards[1].Name + " of " + playerCards[1].suit + "<br> Computer hand: " + computerCards[0].Name + " of " + computerCards[0].suit + " and " + computerCards[1].Name + " of " +computerCards[1].suit + "<br> Please choose to hit or stand. ";
}

// var showUpdatedCards = function(){
//   for (i = 0; i < playerCards.length; i++){
//     gameState = "choose"
//     playerCards[playerCards.length].Name + playerCards[playerCards.length].suit;
//   }
//   return "Player current card is: " 
// }

var chooseCards = function(input){
  var output =  "Please only choose hit or stand";
  if (input == "hit"){
    newCardDrawn = cardDeck.pop();
    playerCards.push(newCardDrawn);
    return "You have drawn " + newCardDrawn.Name + " of " + newCardDrawn.suit;
  } else if (input == "stand"){
    gameState = "output winner";
    output = "Calculating scores.... click submit to reveal the winner."
  }  
 return output;
}

var main = function (input) {
  console.log(gameState);
  if (gameState == "waiting input"){
    gameState = "choose"
    return showInitialCards();
  }

  if (gameState == "choose"){
    return chooseCards(input);
  }

  if (gameState == "output winner"){
    return "the winner is...."
  }
  return myOutputValue;
};