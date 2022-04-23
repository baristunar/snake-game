class SnakeGame {
  constructor() {
    this.canvas = document.querySelector("#game");
    this.context = this.canvas.getContext("2d");
  }

  init() {
    this.bindEvents();
    this.gridSize = this.squareCount = 20;
    this.positionX = this.positionY = 10;
    this.appleX = this.appleY = 17;
    this.snakeSize = 5;
    this.snakeCoords = [];
    this.velocityX = this.velocityY = 0;
    this.gameSpeed = 10;
    this.timer = setInterval(this.loop.bind(this), 1000 / this.gameSpeed);
  }

  bindEvents() {
    document.addEventListener("keydown", this.onKeyPress.bind(this));
  }

  loop() {
    this.update();
    this.draw();
  }

  draw() {
    this.drawBoard();
    this.drawApple();
    this.drawScore();
    this.drawSnake();
  }

  drawBoard() {
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawScore() {
    this.context.fillStyle = "white";
    this.context.font = "20px monospace";
    this.context.fillText(this.snakeSize, 20, 40);
  }

  drawApple() {
    this.context.fillStyle = "pink";
    this.context.fillRect(
      this.appleX * this.gridSize,
      this.appleY * this.gridSize,
      this.gridSize - 5,
      this.gridSize - 5
    );
  }

  drawSnake() {
    this.context.fillStyle = "yellow";
    this.snakeCoords.forEach((c) => {
      this.context.fillRect(
        c.positionX * this.gridSize,
        c.positionY * this.gridSize,
        this.gridSize - 5,
        this.gridSize - 5
      );
    });
  }

  update() {
    this.positionX += this.velocityX;
    this.positionY += this.velocityY;

    this.snakeHitWallHandler();
    this.snakeEatSelfHandler();
    this.updateSnakeCoords();
    this.snakeEatAppleHandler();
  }

  updateSnakeCoords() {
    this.snakeCoords.push({
      positionX: this.positionX,
      positionY: this.positionY,
    });

    while (this.snakeCoords.length > this.snakeSize) {
      this.snakeCoords.shift();
    }
  }

  snakeEatAppleHandler() {
    if (this.appleX === this.positionX && this.appleY === this.positionY) {
      this.snakeSize++;
      this.appleX = Math.floor(Math.random() * this.squareCount);
      this.appleY = Math.floor(Math.random() * this.squareCount);
    }
  }

  snakeEatSelfHandler() {
    this.snakeCoords.forEach((c) => {
      if (c.positionX === this.positionX && c.positionY === this.positionY) {
        this.reset();
      }
    });
  }

  snakeHitWallHandler() {
    if (this.positionX < 0) {
      this.positionX = this.squareCount - 1;
    }

    if (this.positionX > this.squareCount - 1) {
      this.positionX = 0;
    }

    if (this.positionY < 0) {
      this.positionY = this.squareCount - 1;
    }

    if (this.positionY > this.squareCount - 1) {
      this.positionY = 0;
    }
  }

  reset() {
    clearInterval(this.timer);
    this.init();
  }

  onKeyPress(e) {
    const keyCodes = {
      arrowLeft: 37,
      arrowUp: 38,
      arrowRight: 39,
      arrowDown: 40,
    };

    if (e.keyCode === keyCodes.arrowLeft && this.velocityX !== 1) {
      this.velocityX = -1;
      this.velocityY = 0;
    }
    if (e.keyCode === keyCodes.arrowUp && this.velocityY !== 1) {
      this.velocityX = 0;
      this.velocityY = -1;
    }
    if (e.keyCode === keyCodes.arrowRight && this.velocityX !== -1) {
      this.velocityX = 1;
      this.velocityY = 0;
    }
    if (e.keyCode === keyCodes.arrowDown && this.velocityY !== -1) {
      this.velocityX = 0;
      this.velocityY = 1;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const game = new SnakeGame();

  game.init();
});
