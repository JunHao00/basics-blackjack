var cardDeck = [];
var gameState = "waiting input";
var playerCards = [];
var computerCards = [];

//make a deck in order
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

//generate numbers from 0 to deck size
var getRandomIndex = function(input){
  var randoDecimal = Math.random() * input;
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

//show the first 2 cards
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
//computer to choose hit or stand and displays array of cards
var computerChooseCards = function(){
  var computerSumOfCards = 0;
  for (i = 0; i < computerCards.length; i++){
    for (j = 0; j < computerCards.length; j++){
      computerSumOfCards += computerCards[j].points;
    }
    if (computerSumOfCards < 14){
      computerCards.push(cardDeck.pop());
    }
  }
  
  var computerHand = [];
  for (i = 0; i < computerCards.length; i++){
    var output = computerCards[i].Name + " of " + computerCards[i].suit;
    computerHand.push(output);
  }
  return computerHand;
}

//make player choose hit or stand
var playerChooseCards = function(input){
  var currentHand = showUpdatedCards();
  var computerUpdatedCards = computerChooseCards();
  var output =  "Please only choose hit or stand. " + "<br>Your hand is: " + currentHand;
  if (input == "hit"){
    newCardDrawn = cardDeck.pop();
    playerCards.push(newCardDrawn);
    return "You have drawn " + newCardDrawn.Name + " of " + newCardDrawn.suit + ". <br>Your current hand is: " + currentHand + "<br>Please choose hit or stand.";
  } else if (input == "stand"){
    gameState = "output winner";
    output = "Your hand is: " + currentHand + "<br>Computer hand is: " + computerUpdatedCards;
  } 
 return output;
}

//calculate the scores
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
    gameState = "restart game"
    return "Player Score: " + playerSumOfCards + "<br> Computer score: " + computerSumOfCards + "<br> Player wins!";
  } else if (playerSumOfCards < computerSumOfCards){
    gameState = "restart game"
    return "Player Score: " + playerSumOfCards + "<br> Computer score: " + computerSumOfCards + "<br> Computer wins!"
  } else if (playerSumOfCards > 21 || computerCards < 21){
    gameState = "restart game"
    return "Player Score: " + playerSumOfCards + "<br> Computer score: " + computerSumOfCards + "<br> Computer wins!"
  } else{
    gameState = "restart game"
    return "Its a tie!"
  }
}

//need to add bust function
var main = function (input) {
  console.log(gameState);
  console.log("Player cards: ", playerCards);
  console.log("Computer cards: ", computerCards);
  if (gameState == "waiting input"){
    gameState = "choose"
    return showInitialCards();
  }

  if (gameState == "choose"){
    return playerChooseCards(input);
  }

  if (gameState == "output winner"){
    return outputWinner();
  }

  if (gameState == "restart game"){
    output = "";
    gameState = "waiting input";
    playerCards = [];
    computerCards = [];
    return "Game reset! Press submit to continue playing."
  }
};