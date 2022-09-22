let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
var level = 0;

$('.btn').on('click', function() {

  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  console.log(userClickedPattern);
});



function nextSequence() {
  userClickedPattern.splice(0, userClickedPattern.length)
  level++;
  $('#level-title').text('Level ' + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
  console.log(gamePattern);
};

function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColour) {
  $('.btn').on('click', function() {
    $(this).addClass('pressed');
    setTimeout(function() {
      $('.btn').removeClass('pressed');
    }, 100);
  });
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log('success');
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else if (userClickedPattern[currentLevel] != gamePattern[currentLevel]) {
    var wrong = new Audio('sounds/wrong.mp3');
    wrong.play();
    $('body').addClass('game-over');
    setTimeout(function() {
      $('body').removeClass('game-over');
    }, 200);
    $('#level-title').text('Game Over, Press Any Key to Restart');
    startOver();
  }
}
$(document).on('keypress', function() {
  started = true;
  if (started == true) {
    $(document).unbind("keypress");
    nextSequence();
  };
});

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  $(document).on('keypress', function() {
    started = true;
    if (started == true) {
      $(document).unbind("keypress");
      nextSequence();
    };
  });
}
