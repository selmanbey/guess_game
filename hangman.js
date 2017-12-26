$(document).ready( function() {


  // Question Bank is in gamedict.js as "hangmanWords" (a global dictionary)
  
      
  // JQuery Element Selector Variables

  var wordBoard = $("#word_board")
  var chancesBoard = $("#chances_board")
  var notificationBoard = $("#notification")
  var scoreBoard = $(".score_board")
  var bestScoreBoard = $(".best_score_board")
  var tipBoard = $("#tip")


  // Game Variables

  var chances = 5;
  var score = 0;
  var bestScore = localStorage.getItem("bestScore")
  var randomWord = Object.keys(hangmanWords)[Math.round(Math.random() * Object.keys(hangmanWords).length)].toUpperCase();
  var chosenWord = randomWord.split("")
  var guessedWord = [];
  var repeatingLetters = [];
  var tip = "\"".concat(hangmanWords[randomWord.toLowerCase()]).concat("\"");


  // Pre-Game Functions

  function setNewBestScore(score) {
    window.localStorage.setItem("bestScore", score);
    bestScore = localStorage.getItem("bestScore");
  }

  function colorChances(color) {
    chancesBoard.css("color", color);
    $("input").css("border-color", color);
  }

  function createBoard(origin, guess) {
    for (i = 1; i <= origin.length; i++) {
     guess.push("_");
    }
  };

  function printBoard(word) {
    return word.join(" ")
  }


  // Setting the Initial Game Screen

  createBoard(randomWord, guessedWord);
  wordBoard.html(printBoard(guessedWord));
  tipBoard.html(tip);
  chancesBoard.html(chances)
  colorChances("#0B5345");
  scoreBoard.html(score)
  if (bestScore == null) {
    setNewBestScore(0);
  }
  bestScoreBoard.html(bestScore)


  // GamePlay (Keypress Event for "A Letter + Enter")

  $("input").keypress(function (event) {

    if (event.which === 13) {
      var guessedLetter = "";
      var input = $(this).val();
      notificationBoard.html("");
     if (/^[a-zA-Z]$/.test(input)) {
      guessedLetter = input.toUpperCase();
      if (repeatingLetters.includes(guessedLetter)) {
        notificationBoard.html("You already guessed this letter!");
      } else {
        repeatingLetters.push(guessedLetter);
        if (chosenWord == "") {
        } else if (chosenWord.includes(guessedLetter)) {
          chosenWord.forEach (function (currentLetter) {
          if (guessedLetter === currentLetter) {
            var index = chosenWord.indexOf(currentLetter);
            chosenWord[index] = "_";
            guessedWord[index] = guessedLetter;
            wordBoard.html(printBoard(guessedWord));
            score = score + 10;
            scoreBoard.html(score);
          };
         });
        } else {
          chances = chances - 1;
          chancesBoard.html(chances);
        };
      };
    } else {
      notificationBoard.html("A letter and only one letter please!");
      guessedLetter = "";
    };

    $(this).val("")

    switch (chances) {
      case 5:
        colorChances("#0B5345");
        break;
      case 4:
        colorChances("#229954");
        break;
      case 3:
        colorChances("#F1C40F");
        break;
      case 2:
        colorChances("#FF851B");
        break;
      case 1:
        colorChances("#C70039");
        break;
    };

    if (!guessedWord.includes("_")) {
      if (score > parseInt(bestScore, 10)) {
        setNewBestScore(score);
      }
      bestScoreBoard.html(bestScore)
      $(".gamewon").css("display", "block");
      $(".gameon").css("display", "none");
      $(".word_revealed").html("The word was: ".concat(randomWord.toUpperCase()));
    } else if (chances === 0) {
        if (score > parseInt(bestScore, 10)) {
          setNewBestScore(score);
        }
      bestScoreBoard.html(bestScore)
      $(".gamelost").css("display", "block");
      $(".gameon").css("display", "none");
      $(".word_revealed").html("The word was: ".concat(randomWord.toUpperCase()));
    };
  };
});


  // Post-Game Functions

  function repeatEverything(gameCondition) {
    $(".gamelost").css("display", "none");
    $(".gamewon").css("display", "none");
    $(".gameon").css("display", "block");
    chances = 5;
    if (gameCondition) {
    } else {
      score = 0;
    }
    chancesBoard.html(chances);
    colorChances("#0B5345");
    scoreBoard.html(score)
    randomWord = Object.keys(hangmanWords)[Math.round(Math.random() * Object.keys(hangmanWords).length)].toUpperCase();
    tip = "\"".concat(hangmanWords[randomWord.toLowerCase()]).concat("\"");
    chosenWord = randomWord.split("");
    guessedWord = [];
    repeatingLetters = [];
    createBoard(randomWord, guessedWord);
    wordBoard.html(printBoard(guessedWord));
    tipBoard.html(tip);
  };


  // Post-Game (Button Click Event to Restart)

  $("button").on("click", function(event) {
    if ($(this).hasClass("continue")) {
      event.preventDefault();
      repeatEverything(true);
      ;
    } else if ($(this).hasClass("restart")) {
      event.preventDefault();
      repeatEverything(false);
    }
  });


  // Mobile-Related Events
  // (For Proper Display when Mobile Keyboard Appears)

  $("input").focus(function () {
    /* Takes the header off to clear up space in low height mobile screens
       so that the main game screen is still visible when the mobile keyboard
       is up
    */
    if (window.matchMedia("(max-height: 600px)").matches) {
      $("#header").css("display", "none");
      $("body").css("height", window.innerHeight);
    }
  });

  $("input").blur(function () {
    if (window.matchMedia("(max-height: 600px)").matches) {
      $("body").css("height", window.innerHeight)
      $("#header").css("display", "block");
    };
  });

  $(window).resize(function refreshPageLook() {
    $("body").css("height", window.innerHeight);
    if (window.matchMedia("(max-height: 600px)").matches) {
        $("body").css("height", window.innerHeight)
      }
  });
});
