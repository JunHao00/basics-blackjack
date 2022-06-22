var cardDeck = [];
var gameState = "waiting input";
var playerCards = [];
var computerCards = [];

var makeDeck = function(){
  var suit = ["🔶", "♣️", "❤️", "♠️"];
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

//show player hand after they had selected hit
var showUpdatedCards = function(){
  var arrayPlayerHand = [];
  for (i = 0; i < playerCards.length; i++){
    var output = playerCards[i].Name + " of " + playerCards[i].suit;
    arrayPlayerHand.push(output);
    console.log("player hand: ", arrayPlayerHand);
  }
  gameState = "choose"
  return arrayPlayerHand;
}

var chooseCards = function(input){
  var currentHand = showUpdatedCards();
  var output =  "Please only choose hit or stand. " + "<br>Your hand is: " + currentHand;
  if (input == "hit"){
    newCardDrawn = cardDeck.pop();
    playerCards.push(newCardDrawn);
    return "You have drawn " + newCardDrawn.Name + " of " + newCardDrawn.suit + ". <br>Your current hand is: " + currentHand;
  } else if (input == "stand"){
    gameState = "output winner";
    output = "Calculating scores.... click submit to reveal the winner."
  }  
 return output;
}

var outputWinner = function(){
  var playerSumOfCards = 0;
  var computerSumOfCards = 0;
  for (i = 0; i < playerCards.length; i++){
    playerSumOfCards += playerCards[i].points;
  }

  for (i = 0; i < computerCards.length; i++){
    computerSumOfCards += computerCards[i].points;
  }

  if (playerSumOfCards > computerSumOfCards){
    return "Player Score: " + playerSumOfCards + "<br> Computer score: " + computerSumOfCards + "<br> Player wins!";
  } else if (playerSumOfCards < computerSumOfCards){
    return "Player Score: " + playerSumOfCards + "<br> Computer score: " + computerSumOfCards + "<br> Computer wins!"
  } else{
    return "Its a tie!"
  }
}

var main = function (input) {
  console.log(gameState);
  console.log("Player cards: ", playerCards);
  console.log("Computer cards: ", computerCards);
  if (gameState == "waiting input"){
    gameState = "choose"
    return showInitialCards();
  }

  if (gameState == "choose"){
    return chooseCards(input);
  }

  if (gameState == "output winner"){
    return "Player score is: " + outputWinner();
  }
  return myOutputValue;
};