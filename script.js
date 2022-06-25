var cardDeck = [];
var gameState = "waiting bet";
var playerCards = [];
var dealerCards = [];
var playerPoints = 100;
var dealerPoints = 100;
var bet = 0;

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

var placeBet = function (input){

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
  var dealerHand = "Dealer Hand: <br>";
  for (i = 0; i < playerCards.length; i++){
    playerMessage = playerMessage + "- " + playerCards[i].Name + " of " + playerCards[i].suit + "<br>";
  }

  for (i = 0; i < dealerCards.length; i++){
    dealerHand = dealerHand + "- " + dealerCards[i].Name + " of " + dealerCards[i].suit + "<br>";
  }
  return playerMessage + "<br>" + dealerHand;
}

var displayOneComputerHand = function(){
  var playerMessage = "Player Hand: <br>";
  var dealerHand = "Dealer Hand: <br>";
  for (i = 0; i < playerCards.length; i++){
    playerMessage = playerMessage + "- " + playerCards[i].Name + " of " + playerCards[i].suit + "<br>";
  }

  for (i = 0; i < 1; i++){
    dealerHand = dealerHand + "- " + dealerCards[i].Name + " of " + dealerCards[i].suit + "<br>";
  }
  return playerMessage + "<br>" + dealerHand;
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

var dealerChooseCards = function(){
  var dealerSumOfCards = 0;
  for (i = 0; i < dealerCards.length; i++){
    for (j = 0; j < dealerCards.length; j++){
      dealerSumOfCards += dealerCards[j].points;
    }
    if (dealerSumOfCards < 14){
      dealerCards.push(cardDeck.pop());
    }
  }
  
  var dealerHand = [];
  for (i = 0; i < dealerCards.length; i++){
    var output = dealerCards[i].Name + " of " + dealerCards[i].suit;
    dealerHand.push(output);
  }
  return dealerHand;
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
  var displayOneHand = displayOneComputerHand();
  if (input == "hit"){
    newCardDrawn = cardDeck.pop();
    playerCards.push(newCardDrawn);
    return "You have drawn " + newCardDrawn.Name + " of " + newCardDrawn.suit + "<br>"   + displayOneHand;
  } else if (input == "stand"){
    gameState = "output winner";
    return "You Chose stand! dealer is deciding whether to hit.... press submit to reveal the winner!<br> " + displayOneHand ;
  } else {
    return "Please only choose hit or stand.<br>" + displayOneHand;
  }
}

var outputWinner = function(){
  var totalPlayerValue = calculateScores(playerCards);
  var totalDealerValue = calculateScores(dealerCards);
  while ((totalDealerValue < totalPlayerValue && totalPlayerValue <= 21) || (totalDealerValue < 16)){
    dealerCards.push(cardDeck.pop());
    totalDealerValue = calculateScores(dealerCards);
  }
  if(totalPlayerValue == totalDealerValue || totalDealerValue > 21 && totalPlayerValue > 21){
    gameState = "restart game"
    return displayBothHands() + "<br>Player Score: " + totalPlayerValue + "<br> Dealer score: " + totalDealerValue + "<br>Its a tie!";
  } else if(totalDealerValue > 21 && totalPlayerValue <= 21){
    playerPoints = playerPoints + bet;
    dealerPoints = dealerPoints - bet;
    gameState = "restart game"
    return displayBothHands() + "<br>Player Score: " + totalPlayerValue + "<br> Dealer score: " + totalDealerValue + "<br> Dealer Busted! You win!";
  } else if (totalPlayerValue > 21 && totalDealerValue <= 21){
    gameState = "restart game"
    playerPoints = playerPoints - bet;
    dealerPoints = dealerPoints + bet;
    return displayBothHands() + "<br>Player Score: " + totalPlayerValue + "<br> Dealer score: " + totalDealerValue + "<br> You Busted! Dealer wins!";
  } else if (totalPlayerValue < totalDealerValue){
    gameState = "restart game"
    playerPoints = playerPoints - bet;
    dealerPoints = dealerPoints + bet;
    return displayBothHands() + "<br>Player Score: " + totalPlayerValue + "<br> Dealer score: " + totalDealerValue + "<br> Dealer wins!";
  } else if (totalPlayerValue > totalDealerValue){
    gameState = "restart game"
    playerPoints = playerPoints + bet;
    dealerPoints = dealerPoints - bet;
    return displayBothHands() + "<br>Player Score: " + totalPlayerValue + "<br> Dealer score: " + totalDealerValue + "<br> Player wins!";
  } 
}

var main = function (input) {
  console.log(gameState);
  console.log("Player cards: ", playerCards);
  console.log("Dealer cards: ", dealerCards);

  if (gameState == "waiting bet"){
    if (input > 20 || input > playerPoints){
      output = "Player points: " + playerPoints + "<br>Dealer points: " + dealerPoints + "<br>Maximum bet is 20. Please ensure you have enough points to continue.";
    } else if (input > 0){
      bet = Number(bet + input);
      gameState = "waiting input";
      output = "Your bet is: " + bet + ". Good luck !";
    } else{
      output = "Welcome to BlackJack Basics! " + "<br>Player points: " + playerPoints + "<br>Dealer points: " + dealerPoints + "<br>Maximum bet is 20. Please only enter numbers";
    }
    return output;
  }

  if (gameState == "waiting input"){
    cardDeck = shuffledDeck();
    playerCards.push(cardDeck.pop());
    playerCards.push(cardDeck.pop());
    dealerCards.push(cardDeck.pop()); 
    dealerCards.push(cardDeck.pop());
    gameState = "blackjack";
  }

  if (gameState == "blackjack"){
    if (checkForBlackjack(playerCards) == true && checkForBlackjack(dealerCards) == true){
      gameState = "restart game";
      return "Both of you got BlackJack! Its a tie! <br>" + displayBothHands();
    }else if (checkForBlackjack(playerCards) == true && checkForBlackjack(dealerCards) == false){
      gameState = "restart game";
      playerPoints + bet;
      dealerPoints - bet;
      return "Congrats you got BlackJack! You Win! <br>" + displayBothHands();
    } else if (checkForBlackjack(playerCards) == false && checkForBlackjack(dealerCards) == true){
      gameState = "restart game";
      playerPoints - bet;
      dealerPoints + bet;
      return "Dealer got BlackJack! You lose! <br>" + displayBothHands();
    } else {
      gameState = "choose";
      return displayOneComputerHand() + "<br> No BlackJack, please choose hit or stand"
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
    gameState = "waiting bet";
    playerCards = [];
    dealerCards = [];
    bet = 0;
    return "Player Points: " + playerPoints + " <br>Dealer points: " + dealerPoints + "<br>Press submit to deal the next hand!";
  }
};