// Enemies our player must avoid
class Enemy {
  constructor(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = "images/enemy-bug.png";
  }
  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 500) {
      this.x = -50;
      this.speed = 100 + Math.floor(Math.random() * 250);
    }
    if (
      player.x < this.x + 80 &&
      player.x + 80 > this.x &&
      player.y < this.y + 60 &&
      60 + player.y > this.y
    ) {
      player.x = 205;
      player.y = 410;
      decreaseScore();
    }
  }
  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.player = "images/char-cat-girl.png";
  }
  update(dt) {}
  render() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
  }
  handleInput(keyPress) {
    if (keyPress == "up" && this.y > 0) {
      this.y -= 83;
    }
    if (keyPress == "down" && this.y < 405) {
      this.y += 83;
    }
    if (keyPress == "left" && this.x > 0) {
      this.x -= 102;
    }
    if (keyPress == "right" && this.x < 405) {
      this.x += 102;
    }
    if (this.y < 0) {
      setTimeout(function () {
        increaseScore();
        player.x = 205;
        player.y = 410;
      }, 500);
    }
  }
}

// selecting the score element
let scoreBoard = document.querySelector("p");
let score = 0;
let currentScore = `Score: ${score}`;
scoreBoard.innerHTML = currentScore;

// function to increase score
const increaseScore = function () {
  score++;
  scoreBoard.textContent = `Score: ${score}`;
};

// function to decrease score after collision
const decreaseScore = function () {
  score--;
  scoreBoard.textContent = `Score: ${score}`;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let enemyLoc = [65, 145, 230];

enemyLoc.forEach(function (locY) {
  const enemy = new Enemy(0, locY, 200);
  allEnemies.push(enemy);
});
let player = new Player(205, 410);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function (e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
