
// Declaring and initilizing global variables

var vx = 5;
var vy = 4;
var dt = 2;
var ball;
var temp_x;
var temp_y;
var x_len;
var y_len;
var x;
var y;
var f_top_temp;
var f_left_temp;
var f_top_len;
var f_left_len;
var frame = document.getElementById("court");
var width = 800;
var height = 500;
var bool = "true";
var frame_top;
var frame_left;
var time = 200;
var recur;
var strikes = 0;
var max_score = 0;

// The function used to initialize the game

function initialize()
{
  strikes = 0;
  var t = Math.floor(Math.random() * 400);
  ball = document.getElementById("ball");
  ball.style.top = t + "px";
  ball.style.left = "0px";
  document.getElementById("strikes").innerHTML = strikes;
  document.getElementsByName("speed").value = "0";
}

// This function will start the game according to the selected speed.

function startGame()
{
  document.getElementById("messages").innerHTML = "Game Started";
  recur = setInterval(animation, time);
}

//This function is used to create the animation by calling recursively using setInterval function

function animation()
{
  ball  = document.getElementById("ball");
  temp_x = ball.style.top;
  temp_y = ball.style.left;
  x_len = temp_x.length;
  y_len = temp_y.length;
  frame = document.getElementById("court");
  x = parseInt(temp_x.slice(0, x_len-2));
  y = parseInt(temp_y.slice(0, y_len-2));

  //Geting court boundaries

  var frame = document.getElementById("court");
  var frame_top = frame.getBoundingClientRect().top;
  var frame_left = frame.getBoundingClientRect().left;
  var frame_right = frame.getBoundingClientRect().right;
  var frame_bottom = frame.getBoundingClientRect().bottom;

  //getting ball boundaries

  var ball_top = ball.getBoundingClientRect().top;
  var ball_left = ball.getBoundingClientRect().left;
  var ball_right = ball.getBoundingClientRect().right;
  var ball_bottom = ball.getBoundingClientRect().bottom;
  var top_test = ball_top - frame_top;
  var bottom_test = frame_bottom - ball_bottom;

  //Getting the paddle position and boundaries

  var p = document.getElementById("paddle");
  var p_left = p.getBoundingClientRect().left;
  var p_top = p.getBoundingClientRect().top;
  var p_bottom = p.getBoundingClientRect().bottom;

  var left_test = ball_left -frame_left;
  var temp_test =  p_left - ball_right;

// Checking if the ball is in top and bottom of the court

  if((top_test>0)&&(bottom_test>0))
  {
    x = x + (vx*dt);
    ball.style.top = x + "px";
  }

  else
  {
     vx = -vx;
     x = x + (vx*dt);
     ball.style.top = x + "px";
  }

// Checking if the ball is in between  left and right of the court..

  if((left_test > 0))
  {
    if((temp_test > 0))
    {
      y = y + (vy*dt);
      ball.style.left = y + "px";
    }

    else
    {
      if((ball_top > p_top)&&(ball_top < p_bottom))
      {
        vy = -vy;
        y = y + (vy*dt);
        ball.style.left = y + "px";
        strikes = strikes + 1;
        document.getElementById("strikes").innerHTML = strikes;
        document.getElementById("messages").innerHTML = "You got a strike !";
      }

      else
      {
        document.getElementById("messages").innerHTML = "Game Over : Ball did not hit paddle";
        resetGame();
      }
    }
  }

  else
  {
    vy = -vy;
    y = y + (vy*dt);
    ball.style.left = y + "px";
  }
}

// Function used to move the paddle

function movePaddle(event)
{
  var frame = document.getElementById("court");
  var frame_top = frame.getBoundingClientRect().top;
  var frame_bottom = frame.getBoundingClientRect().bottom;
  var paddle = document.getElementById("paddle");
  var paddle_top = paddle.getBoundingClientRect().top;
  var paddle_bottom = paddle.getBoundingClientRect().bottom;
  var mouse_x = event.clientX;
  var mouse_y = event.clientY;
  var mouse_top_temp = mouse_x - frame_top
  var mouse_bottom_temp = frame_bottom- 105 - mouse_y

  if(( mouse_top_temp > 0) && (mouse_bottom_temp > 0))
  {
    var temp = mouse_y - frame_top;
    paddle.style.top = temp + "px";
  }
}

//function used to reset the game

function resetGame()
{
  document.getElementById("messages").innerHTML = "Game is Reseted";
  if(max_score < strikes)
  {
    max_score = strikes;
    document.getElementById("score").innerHTML = max_score;
    document.getElementById("messages").innerHTML = "Congratulations !!! New Max score ";
  }
  clearInterval(recur);
  initialize();
}
  
//function used to change the speed. 

function setSpeed(num)
{
  if(num == 0)
  {
    document.getElementById("messages").innerHTML = "Speed changed to Slow";
    time = 200;
  }

  if (num == 1);
  {
    document.getElementById("messages").innerHTML = "Speed changed to Medium";
    time = 60;
  }

  if( num == 2)
  {
    document.getElementById("messages").innerHTML = "Speed changed to Fast";
    time = 20;
  }

}
  
  

  
