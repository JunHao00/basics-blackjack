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

      if (cardName == "Ace"){
        score = 11;
      }
      if (cardName == "Jack"){
        score = 10;
      }
      if (cardName == "Queen"){
        score = 10;
      }
      if (cardName == "King"){
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

var displayBothHands = function(){
  var playerMessage = "Player Hand: <br>";
  var computerHand = "Computer Hand: <br>";
  for (i = 0; i < playerCards.length; i++){
    playerMessage = playerMessage + "- " + playerCards[i].Name + " of " + playerCards[i].suit + "<br>";
  }

  for (i = 0; i < computerCards.length; i++){
    computerHand = computerHand + "- " + computerCards[i].Name + " of " + computerCards[i].suit + "<br>";
  }
  return playerMessage + "<br>" + computerHand;
}

var calculateScores = function(array){
  var sumOfCards = 0;
  var aceCounter = 0;
  for (i = 0; i < array.length; i++){
    var currentCard = array[i];
    if (currentCard.Name == "Ace"){
      sumOfCards += 11;
      aceCounter +=1;
    } else{
      sumOfCards += currentCard.points;
    }
  } 

  for (i = 0; i < aceCounter; i++){
    if (sumOfCards > 21){
      sumOfCards = sumOfCards - 10;
    }
  }
  return sumOfCards;
}

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

var checkForBlackjack = function(array){
  var cardOne = array[0];
  var cardTwo = array[1];
  var blackJack = false;
  if((cardOne.Name == "Ace" && cardTwo.points >= 10) || (cardTwo.Name == "Ace" && cardOne.points >= 10)){
    blackJack = true;
  }
  return blackJack;
}

//make player choose hit or stand
var playerChooseCards = function(input){
  var displayHands = displayBothHands();
  if (input == "hit"){
    newCardDrawn = cardDeck.pop();
    playerCards.push(newCardDrawn);
    return "You have drawn " + newCardDrawn.Name + " of " + newCardDrawn.suit + "<br>"   + displayHands;
  } else if (input == "stand"){
    gameState = "output winner";
    return "You Chose stand! Computer is deciding whether to hit.... press submit to reveal the winner!<br> " + displayHands ;
  } else {
    return "Please only choose hit or stand.<br>" + displayHands;
  }
}

var outputWinner = function(){
  var totalPlayerValue = calculateScores(playerCards);
  var totalComputerValue = calculateScores(computerCards);
  while (totalComputerValue < 14){
    computerCards.push(cardDeck.pop());
    totalComputerValue = calculateScores(computerCards);
  }
  if(totalPlayerValue == totalComputerValue || totalComputerValue > 21 && totalPlayerValue > 21){
    gameState = "restart game"
    return displayBothHands() + "<br>Player Score: " + totalPlayerValue + "<br> Computer score: " + totalComputerValue + "<br>Its a tie!";
  } else if(totalComputerValue > 21 && totalPlayerValue < 21){
    gameState = "restart game"
    return displayBothHands() + "<br>Player Score: " + totalPlayerValue + "<br> Computer score: " + totalComputerValue + "<br> Computer Busted! You win!";
  } else if (totalPlayerValue > 21 && totalComputerValue < 21){
    gameState = "restart game"
    return displayBothHands() + "<br>Player Score: " + totalPlayerValue + "<br> Computer score: " + totalComputerValue + "<br> You Busted! Computer wins!";
  } else if (totalPlayerValue < totalComputerValue){
    gameState = "restart game"
    return displayBothHands() + "<br>Player Score: " + totalPlayerValue + "<br> Computer score: " + totalComputerValue + "<br> Computer wins!";
  } else if (totalPlayerValue > totalComputerValue){
    gameState = "restart game"
    return displayBothHands() + "<br>Player Score: " + totalPlayerValue + "<br> Computer score: " + totalComputerValue + "<br> Player wins!";
  } 
}
//need to add bust/BJ function
var main = function (input) {
  console.log(gameState);
  console.log("Player cards: ", playerCards);
  console.log("Computer cards: ", computerCards);
  if (gameState == "waiting input"){
    cardDeck = shuffledDeck();
    playerCards.push(cardDeck.pop());
    playerCards.push(cardDeck.pop());
    computerCards.push(cardDeck.pop()); 
    computerCards.push(cardDeck.pop());
    gameState = "blackjack";
  }

  if (gameState == "blackjack"){
    if (checkForBlackjack(playerCards) == true && checkForBlackjack(computerCards) == true){
      gameState = "restart game";
      return "Both of you got BlackJack! Its a tie! " + displayBothHands();
    }else if (checkForBlackjack(playerCards) == true && checkForBlackjack(computerCards) == false){
      gameState = "restart game";
      return "Congrats you got BlackJack! You Win! " + displayBothHands();
    } else if (checkForBlackjack(playerCards) == false && checkForBlackjack(computerCards) == true){
      gameState = "restart game";
      return "Computer got BlackJack! You lose! " + displayBothHands();
    } else {
      gameState = "choose";
      return displayBothHands() + "<br> No BlackJack, please choose hit or stand"
    }
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
    return "Game reset! Press submit to continue playing.";
  }
};