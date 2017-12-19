$('document').ready( function() {


  // Words List

  var hangmanWords = {
      "accord": "concurrence of opinion",
      "affect": "have an influence upon",
      "apparent": "clearly revealed to the mind or the senses or judgment",
      "appeal": "be attractive to",
      "appoint": "assign a duty, responsibility or obligation to",
      "approach": "move towards",
      "assert": "declare or affirm solemnly and formally as true",
      "attitude": "a complex mental state involving beliefs and feelings",
      "attribute": "a quality belonging to or characteristic of an entity",
      "bent": "fixed in your purpose",
      "campaign": "a race between candidates for elective office",
      "chamber": "a natural or artificial enclosed space",
      "circumstances": "one's overall condition in life",
      "coast": "the shore of a sea or ocean",
      "commission": "a special group delegated to consider some matter",
      "commit": "perform an act, usually with a negative connotation",
      "compel": "force somebody to do something",
      "concept": "an abstract or general idea inferred from specific instances",
      "concern": "something that interests you because it is important",
      "conduct": "direct the course of, manage or control",
      "confer": "have a meeting in order to talk something over",
      "consider": "deem to be",
      "constant": "a quantity that does not vary",
      "constitute":"to compose or represent",
      "contempt": "lack of respect accompanied by a feeling of intense dislike",
      "contract": "a binding agreement that is enforceable by law",
      "convention": "a large formal assembly",
      "convince": "make realize the truth or validity of something",
      "court": "an assembly to conduct judicial business",
      "crew": "the men and women who man a vehicle",
      "despair": "a state in which all hope is lost or absent",
      "distinction": "a discrimination between things as different",
      "dwell": "think moodily or anxiously about something",
      "earnest": "characterized by a firm, humorless belief in one's opinions",
      "engage": "consume all of one's attention or time",
      "entertain": "provide amusement for",
      "establish": "set up or found",
      "evident": "clearly revealed to the mind or the senses or judgment",
      "exert": "make a great effort at a mental or physical task",
      "fancy": "imagine, conceive of, see in one's mind",
      "financial": "involving fiscal matters",
      "flag": "a rectangular piece of cloth of distinctive design",
      "formal": "characteristic of or befitting a person in authority",
      "furnish": "provide with objects or articles that make a room usable",
      "generate": "bring into existence",
      "grant": "allow to have",
      "harry": "annoy continually or chronically",
      "humble": "marked by meekness or modesty, not arrogant or prideful",
      "inclined": "at an angle to the horizontal or vertical position",
      "insist": "be emphatic or resolute and refuse to budge",
      "inspire": "serve as the inciting cause of",
      "instance": "an occurrence of something",
      "institute": "set up or lay the groundwork for",
      "intend": "have in mind as a purpose",
      "intimate": "marked by close acquaintance, association, or familiarity",
      "issue": "some situation or event that is thought about",
      "justify": "show to be reasonable or provide adequate ground for",
      "keen": "demonstrating ability to recognize or draw fine distinctions",
      "knight": "a person of noble birth trained to arms and chivalry",
      "labor": "any piece of work that is undertaken or attempted",
      "league": "an association of sports teams that organizes matches",
      "level": "a relative position or degree of value in a graded group",
      "liberal": "having political views favoring reform and progress",
      "majority": "more than half of the votes in an election",
      "manifest": "reveal its presence or make an appearance",
      "merit": "any admirable or beneficial attribute",
      "minute": "infinitely or immeasurably small",
      "mode": "how something is done or how it happens",
      "notion": "a general inclusive concept",
      "novel": "an extended fictional work in prose",
      "obtain": "come into possession of",
      "passage": "a section of text, particularly a section of medium length",
      "persist": "continue to exist",
      "plead": "enter a defendant's answer",
      "policy": "a plan of action adopted by an individual or social group",
      "practice": "a customary way of operation or behavior",
      "project": "a planned undertaking",
      "property": "a basic or essential attribute shared by members of a class",
      "range": "a variety of different things or activities",
      "reflect": "show an image of",
      "render": "give an interpretation of",
      "resource": "a new or reserve supply that can be drawn upon when needed",
      "scale": "relative magnitude",
      "scarce": "deficient in quantity or number compared with the demand",
      "scheme": "an elaborate and systematic plan of action",
      "skill": "an ability that has been acquired by training",
      "stock": "capital raised by a corporation through the issue of shares",
      "straight": "successive, without a break",
      "temper": "a characteristic state of feeling",
      "territory": "the geographical area under the jurisdiction of a state",
      "theory": "a well-substantiated explanation of some aspect of the world",
      "tide": "the periodic rise and fall of the sea level",
      "tour": "a route all the way around a particular place or area",
      "undertake": "enter upon an activity or enterprise",
      "utter": "without qualification",
      "vain": "unproductive of success",
      "venture": "proceed somewhere despite the risk of possible dangers",
      "wander": "move or cause to move in a sinuous or circular course",
      "weigh": "be oppressive or burdensome",
      "yield": "give or supply",
  };


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

});
