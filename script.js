const QUERY = window.location.search;
const PARAMS = new URLSearchParams(QUERY);

var easyWords = ["cold", "sports", "animal", "charge", "reflection", "ocean", "clock", "snow", "storm", "pet"];
var mediumWords = ["train", "star", "music", "apple", "candy", "wheel", "dream", "mountain", "flame", "broken", "seasons", "bridge", "sleepover", "pollution", "singer", "cartoons", "pollen", "beach", "journalism", "plant"];
var hardWords = ["biology", "wealthy", "breakfast", "camouflage", "eclipse", "illusion", "echo", "mosaic", "glacier", "blueprint", "turbulence", "fracture", "pulse", "orbit", "drought", "frostbite", "shatter", "tangled", "shimmer", "shiver", "ripple", "quicksand", "distort", "drizzle", "sway", "drift", "sharp", "twist", "glare", "trace"];

var currentWords = null;
var currentLevel = 0;
var folder = "";
var currentScore = 0;
var leaderboard = [];
var playerAdded = false;

function saveUsername() {
  var username = document.getElementById("username").value.trim();

  if (username === "") {
    alert("Name is empty!");
    return false;
  }

  if (!/^[A-Za-z0-9_]+$/.test(username)) {
    alert("Username should only include letters, numbers, and underscores.");
    return false;
  }

  localStorage.setItem("username", username);
  alert("Username saved!");
  return true;
}

function validateForm() {
  var username = document.getElementById("username").value.trim();

  if (username === "") {
    alert("Name is empty!");
    return false;
  }

  if (!/^[A-Za-z0-9_]+$/.test(username)) {
    alert("Username should only include letters, numbers, and underscores.");
    return false;
  }

  localStorage.setItem("username", username);
  return true;
}

window.onload = function () {
  var savedUsername = localStorage.getItem("username");
  var greeting = document.getElementById("greetings");

  if (savedUsername !== null && greeting !== null) {
    greeting.innerText = `${savedUsername}!`;
  }

  loadLeaderboard();
  updateLeaderboardDisplay();
};

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
  if (currentLevel === 0) {
    currentScore = 0;
  }
  document.getElementById("score").innerText = "Score: 0";
  showLevel();
}

function addToLeaderboard(name, score) {
  leaderboard.push({ player: name, score: score });

  leaderboard.sort(function (a, b) {
    return b.score - a.score;
  });

  if (leaderboard.length > 5) {
    leaderboard = leaderboard.slice(0, 5);
  }

  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  updateLeaderboardDisplay();
}

function loadLeaderboard() {
  var savedLeaderboard = localStorage.getItem("leaderboard");

  if (savedLeaderboard !== null) {
    leaderboard = JSON.parse(savedLeaderboard);
  }
}

function updateLeaderboardDisplay() {
  for (var i = 0; i < 5; i++) {
    var row = document.getElementById("leaderboard" + (i + 1));

    if (row !== null) {
      if (leaderboard[i]) {
        row.innerHTML = "<td>" + (i + 1) + "</td><td>" + leaderboard[i].player + "</td><td>" + leaderboard[i].score + "</td>";
      } else {
        row.innerHTML = "<td>" + (i + 1) + "</td><td>-</td><td>0</td>";
      }
    }
  }
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
  if (currentWords === null) {
    alert("Please choose a difficulty first!");
    return;
  }

  var input = document.getElementById("input");
  var result = document.getElementById("result");
  var userAnswer = input.value.toLowerCase().trim();

  if (userAnswer === currentWords[currentLevel]) {
    result.innerText = "Correct!";
    result.style.color = "lightgreen";

    if (currentWords === easyWords) {
      currentScore += 10;
    } else if (currentWords === mediumWords) {
      currentScore += 20;
    } else if (currentWords === hardWords) {
      currentScore += 30;
    }

    document.getElementById("score").innerText = "Score:" + currentScore;

    currentLevel++;

    if (currentLevel < currentWords.length) {
      showLevel();
    } else {
      result.innerText = "You finished this level! Score: " + currentScore + ". Go to the next level!";

      if (!playerAdded) {
        if (name && name.trim() !== "") {
          addToLeaderboard(name, currentScore);
        } else {
          addToLeaderboard("Player", currentScore);
        }
        playerAdded = true;
      } else {
        addToLeaderboard(name, currentScore);
      }
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

