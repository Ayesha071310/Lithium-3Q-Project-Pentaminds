var easyWords = ["cold", "sports", "animal", "charge", "reflection", "ocean", "clock", "snow", "storm", "pet"];
var mediumWords = ["train", "star", "music", "apple", "candy", "wheel", "dream", "mountain", "flame", "broken", "seasons", "bridge", "sleepover", "pollution", "singer", "cartoons", "pollen", "beach", "journalism", "plant"];
var hardWords = ["biology", "wealthy", "breakfast", "camouflage", "eclipse", "illusion", "echo", "mosaic", "glacier", "blueprint", "turbulence", "fracture", "pulse", "orbit", "drought", "frostbite", "shatter", "tangled", "shimmer", "shiver", "ripple", "quicksand", "distort", "drizzle", "sway", "drift", "sharp", "twist", "glare", "trace"];

var currentWords = null;
var currentLevel = 0;
var folder = "";

function startGame(difficulty) {
  if (difficulty === "easy") {
    currentWords = easyWords;
    folder = "easy/";
  } else if (difficulty === "medium") {
    currentWords = mediumWords;
    folder = "medium/";
  } else if (difficulty === "hard") {
    currentWords = hardWords;
    folder = "";
  }
  currentLevel = 0;
  showLevel();
}

function showLevel() {
  document.getElementById("level").innerText = "Level " + (currentLevel + 1);
  var startImg = currentLevel * 4 + 1;
  document.getElementById("img1").src = folder + "img" + startImg + ".jpg";
  document.getElementById("img2").src = folder + "img" + (startImg + 1) + ".jpg";
  document.getElementById("img3").src = folder + "img" + (startImg + 2) + ".jpg";
  document.getElementById("img4").src = folder + "img" + (startImg + 3) + ".jpg";
  document.getElementById("input").value = "";
  document.getElementById("result").innerText = "";
  document.getElementById("input").classList.remove("wrong", "shake");
}

function checkAnswer() {
  var input = document.getElementById("input");
  var result = document.getElementById("result");
  var userAnswer = input.value.toLowerCase();

  if (userAnswer === currentWords[currentLevel]) {
    result.innerText = "Correct!";
    result.style.color = "lightgreen";
    currentLevel++;
    if (currentLevel < currentWords.length) {
      showLevel();
    } else {
      result.innerText = "You finished all levels!";
    }
  } else {
    result.innerText = "Wrong!";
    result.style.color = "red";
    input.classList.add("wrong", "shake");
    setTimeout(function () {
      input.classList.remove("shake");
    }, 300);
  }
}
var previousAnswer = checkAnswer;

checkAnswer = function () {
  previousAnswer();

  if (currentLevel === currentWords.length) {
    if (currentWords === easyWords) {
      alert("Easy done! Going to Medium.");
      startGame("medium");
    } else if (currentWords === mediumWords) {
      alert("Medium done! Going to Hard.");
      startGame("hard");
    } else {
      alert("You finished all levels! THANK YOU FOR PLAYING !!!");
    }
  }
};