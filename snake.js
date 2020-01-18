  var SIZE = 700; // Size of the play-field in pixels
  var GRID_SIZE = SIZE / 14;
  var c = document.getElementById('c');
  c.height = c.width = SIZE * 2; // 2x our resolution so retina screens look good
  c.style.width = c.style.height = SIZE + 'px';
  var context = c.getContext('2d');
  context.scale(2, 2); // Scale our canvas for retina screens

  var direction = newDirection = 1; // -2: up, 2: down, -1: left, 1: right
  var snakeLength = 1;
  var snake = [{x: SIZE / 2, y: SIZE / 2}]; // Snake starts in the center
  var candy = null;
  var end = false;
  var opac = true;
  var dir = [1,2,-1,-2];
  var num = 0;
  var val = 1;
  
  function randomOffset() {
    position=Math.floor(Math.random() * SIZE / GRID_SIZE) * GRID_SIZE;
    if (position < GRID_SIZE * 2) {
      position = GRID_SIZE * 2;
    }
    if (position > 700 - (GRID_SIZE * 2) ) {
      position = 700 - (GRID_SIZE * 2);
    }
    return position;
  }

  function stringifyCoord(obj) {
    return [obj.x, obj.y].join(',');
  }

  function tick() {
    var newHead = {x: snake[0].x, y: snake[0].y};
    
    // Only change directon if the new direction is a different axis
    if (Math.abs(direction) !== Math.abs(newDirection)) {
      direction = newDirection;
    }
    var axis = Math.abs(direction) === 1 ? 'x' : 'y'; // 1, -1 are X; 2, -2 are Y
    if (direction < 0) {
      newHead[axis] -= GRID_SIZE; // Move left or down
    } else {
      newHead[axis] += GRID_SIZE; // Move right or up
    }

    // Did we eat a candy? Detect if our head is in the same cell as the candy
    if (candy && candy.x === newHead.x && candy.y === newHead.y) {
      candy = null;
      //var success = new Audio('success.wav');
      //success.play();
      snakeLength += 0;
    }

    context.fillStyle = '#000000';
    context.fillRect(0, 0, SIZE, SIZE); // Reset the play area
    if (end) {
      context.fillStyle = '#eee8d5';
      context.font = '40px serif';
      context.textAlign = 'center';
      context.fillText('Refresh to play again', SIZE / 2, SIZE / 2);
      clearInterval(myVar);
    } else {
      snake.unshift(newHead); // Add the new head to the front
      snake = snake.slice(0, snakeLength); // Enforce the snake's max length
    }

    // Detect wall collisions
    if (newHead.x < 0 || newHead.x >= SIZE || newHead.y < 0 || newHead.y >= SIZE) {
      //var fail = new Audio('fail.wav');
      //fail.play();
      end = true;
    }

    context.fillStyle = '#ff0000';
    var snakeObj = {};
    for (var i = 0; i < snake.length; i++) {
      var a = snake[i];
      context.fillRect(a.x, a.y, GRID_SIZE, GRID_SIZE); // Paint the snake
      // Build a collision lookup object
      if (i > 0) snakeObj[stringifyCoord(a)] = true;
    }

    if (snakeObj[stringifyCoord(newHead)]) end = true; // Collided with our tail

    // Place a candy (not on the snake) if needed
    while (!candy || snakeObj[stringifyCoord(candy)]) {
      candy = {x: randomOffset(), y: randomOffset()};
    }

    context.fillStyle = 'orange';
    context.fillRect(candy.x, candy.y, GRID_SIZE, GRID_SIZE); // Paint the candy
  }
  /* window.onload = function() {   
  document.getElementById("start").onclick = function () { 
    setInterval(tick, 440); // Kick off the game loop!
    window.onkeydown = function(e) {
      newDirection = {37: -1, 38: -2, 39: 1, 40: 2}[e.keyCode] || newDirection; //-2: up, 2: down, -1: left, 1: right
    };
  };*/
  
function testbarraSpaz(e) {
    if (e.keyCode == 32) {
          lanciaGioco();
    } else if (e.keyCode == 83) {
          cambioOpac();
    }
}

function lanciaGioco() {
   direction = newDirection = 1; // -2: up, 2: down, -1: left, 1: right
   snakeLength = 1;
   snake = [{x: SIZE / 2, y: SIZE / 2}]; // Snake starts in the center
   candy = null;
   end = false;
   myVar=setInterval(tick, 440); // Kick off the game loop!
     window.onkeydown = function(e) {
       newDirection = {37: -1, 38: -2, 39: 1, 40: 2}[e.keyCode] || newDirection; //-2: up, 2: down, -1: left, 1: right
   };
}

function azione(pos) {
  newDirection = pos;
}

function cambioDirezione() {
  num+=val;
  if (num > 3) {
    num = 0;
  }
  if (num < 0) {
    num = 3;
  }
  azione(dir[num]);
}

function invertiSenso() {
  if (val > 0) {
    document.getElementById("inverti").className="antiorario";
    val = -1;
  }
  else {
    document.getElementById("inverti").className="orario";
    val=1;
  }
}

function cambioOpac() {
  if (opac) {
      document.getElementById("oriz").style.opacity = "0";
      document.getElementById("vert").style.opacity = "0";
      opac = false;
  }
  else {
      document.getElementById("oriz").style.opacity = "0.3";
      document.getElementById("vert").style.opacity = "0.3";
      opac = true;
  }   
}

function aggiorna() {
    window.location.reload();
}
