
/*
the object of the game is to dodge the rocks falling from the sky
you can either press the a key to move left or the d key to move right
if you don't read this it's okay because the very first time you play it will show you which keys to press
high scores are stored, so if you beat previous high score it will show it after the game
press enter during game over screen to start over
it will only do it the very first time you play since i store whether you've played or not into local storage
this was actually really fun to make. 
building something from the ground up and watching it in action is great!
*/


//this is the variable for background images
//made it global for the sake of making screen background changes easier
var bgimg = "images/startScreen.png";

var init = function()
{

	this.bgw = 960;
	this.bgh = 600;
	this.lastSec = 0;
	this.bugx = 400;
    this.bugy = 480;
    this.bugw = 115;
    this.bugh = 100;
    this.aKeyX = 50;
    this.aKeyY = 500;
    this.dKeyX = 860;
    this.dKeyY = 500;
    this.rockArrayLength = 5;
    //initialize array for random rock positions
    this.randObjArry = [];
	for (var i = 0; i < rockArrayLength; i++)
	{
		this.randxy = 
		{
			randx: Math.floor(Math.random() * (750 - 1) + 1),
			randy: Math.floor(Math.random() * (750 - 1) + 1) - 1000
		};
		this.randObjArry.push(this.randxy);
	}

    this.rockw = 100;
    this.rockh = 90;
    this.rocks = [];
    this.score = 0;
    this.checkScore = 0;
    this.dead = false;
    this.gameOver = false;
    this.movement = "none";
    this.aKeyPressed = false;
    this.dKeyPressed = false;
    //this.bgimg = "images/startScreen.png"


    //this will be used to determine if its the players first game
	this.tutorial = localStorage.getItem("tutorial");
	//if status isnt stored in local storage then create and store
	if (!tutorial)
	{
		tutorial = 0;
		localStorage.setItem("tutorial", JSON.stringify(tutorial));
	}
	//else get first game status
	else
	{
		tutorial = JSON.parse(tutorial);
	}


	this.newHighScore = false;
	//this will be used to determine if its the players first game
	this.highScore = localStorage.getItem("highScore");
	//if status isnt stored in local storage then create and store
	if (!highScore)
	{
		highScore = 0;
		localStorage.setItem("highScore", JSON.stringify(highScore));
	}
	//else get first game status
	else
	{
		highScore = JSON.parse(highScore);
	}
	
    startMenu();
    	
};

//start menu screen
var startMenu = function()
{
	//create canvas for start menu
	var canvas = document.getElementById('background', bgimg);
	var ctx = canvas.getContext('2d');
	var bgObj = new Image();

	bgObj.onload = function()
	{
		ctx.drawImage(bgObj, 0, 0, bgw, bgh);

	};
	bgObj.src = bgimg;
	
	//detect if user has pressed left or right
	document.onkeydown = function(e)
	{
		e = e || window.event;
		var key = e.which || e.keyCode;
		switch(key)
		{
			case 13: 
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				bgimg = 'images/sky.png';
				bgObj.src = bgimg;
				ctx.drawImage(bgObj, 0, 0, bgw, bgh);
    			this.movement = "none";
    			var gameloop = setInterval(startGame, 20);
				break;
			default:
		}
	}
}

//start game
var startGame = function()
{
	
	if (!dead)
	{
		var someBug = new bug();

		//if it isnt the players first game then skip tutorial
		if (tutorial > 0)
		{
			var someRocksArry = [];
			var curScore = new text('score', 'Score: ', score, 805, 50);
			curScore.drawText();

			var date = new Date();
			var curTime = date.getMilliseconds()/1000;

			if(lastSec != curTime)
			{
				lastSec = curTime;
			}
			if(lastSec == curTime)
			{
				checkScore++;
			}
			if (score < checkScore/50)
			{
				score++;
			}

	
			//create array of rock objects
			for (var i = 0; i < rockArrayLength; i++)
			{
				someRocksArry.push(new rock(randObjArry[i]));
			}

			//check to see if any rocks in array of rocks hit bug
			for (var i = 0; i < rockArrayLength; i++)
			{
				if(checkCollision(someRocksArry[i], someBug))
				{
					dead = true;
				}
			}

			//determine if bug goes off screen
			if (someBug.offScreen())
			{
				dead = true;
			}
		}
		//do tutorial
		else
		{
			var aKey = new keys(aKeyX, aKeyY, 80, 80, 'images/A.png', 'aKey');
			var dKey = new keys(dKeyX, dKeyY, 80, 80, 'images/D.png', 'dKey');

			if (dKeyPressed && aKeyPressed)
			{
				tutorial++;
			}

			if(!aKeyPressed)
			{
				aKey.drawKey();
			}
			else
			{
				aKey.clearKey();
			}

			if(!dKeyPressed)
			{
				dKey.drawKey();	
			}
			else
			{
				dKey.clearKey();
			}
			localStorage.setItem("tutorial", JSON.stringify(tutorial));

		}
	}
	else
	{
		gameOver();
	}
		

	this.gameOver = function()
	{
		var displayHighScore = new text('highscore', 'New High Score: ', score, 715, 50);
		if (score > highScore)
		{
			highScore = score;
			newHighScore = true;
		}
		localStorage.setItem("highScore", JSON.stringify(highScore));

		if (newHighScore)
		{
			displayHighScore.drawText();
		}

		//game overscreen
		var canvas = document.getElementById('background', 'images/gameover.png');
		var ctx = canvas.getContext('2d');
		var bgObj = new Image();

		bgObj.onload = function()
		{
			ctx.drawImage(bgObj, 0, 0, bgw, bgh);

		};
		bgObj.src = 'images/gameover.png';

		curScore.clearScore();

		someBug.clearBug();
		

		document.onkeydown = function(e)
		{
			e = e || window.event;
			var key = e.which || e.keyCode;
			switch(key)
			{
				case 13: 
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					bgimg = 'images/sky.png';
    				this.movement = "none";
    				displayHighScore.clearScore();
    				init();
				break;
			default:
			}
		};
	}
}
//check to see if rock hits bug
 function checkCollision(obj1, obj2)
{
	
	if (Math.sqrt(Math.pow(obj1.getOriginX()-obj2.getOriginX(), 2) + Math.pow(obj1.getOriginY() - obj2.getOriginY(), 2)) >= obj1.getRadius() + obj2.getRadius())
	{
		return false;
	}
	else
	{
		return true;
	}
};

//draw keys for tutorial
function keys(keyx, keyy, keyw, keyh, images, keyid)
{
	var canvas = document.getElementById(keyid, images);
	var ctx = canvas.getContext('2d');
	var keyObj = new Image();
	
	this.drawKey = function()
	{
		ctx.drawImage(keyObj, keyx, keyy, keyw, keyh);

	};
	
	keyObj.src = images;

	this.clearKey = function()
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	};

	this.clearKey();
}

//draws text
function text(id, text, num, x, y)
{
	var canvas = document.getElementById(id);
	var ctx = canvas.getContext('2d');
	this.drawText = function()
	{
		ctx.fillStyle = "green";
		ctx.font = "21px Georgia";
		ctx.fillText(text + num, x, y);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillText(text + num, x, y);
	}
	

	this.clearScore = function()
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
};


//rock object
function rock(pos)
{
	var rockx = pos.randx;
	var rocky = pos.randy;
	var originX = rockw / 2;
	var originY = rockh / 2;
	var radius = originX;
	var speed = 6;
	//create canvas for rock object
	var canvas = document.getElementById('bug', 'images/rock.png');
	var ctx = canvas.getContext('2d');
	var rockObj = new Image();

	//if (rocky < 560 && rocky > 0)
	//{
		rockObj.onload = function()
		{
		ctx.drawImage(rockObj, rockx, rocky, rockw, rockh);

		};
	//}

	rockObj.src = "images/rock.png";

	var clearRocks = function()
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	};


	var redrawRocks = function()
	{
		ctx.drawImage(rockObj, rockx, rocky, rockw, rockh);	
	};

	this.moveRocks = function()
	{
		clearRocks();
		pos.randy += speed;
		redrawRocks();
	};

	//resets rock position once it falls off screen
	this.resetRocks = function()
	{
		if (rocky > 560 + rockh)
		{
			pos.randy = Math.floor(Math.random() * (750 - 1) + 1);
			if(pos.randy > 0)
			{
				pos.randy -= pos.randy;
			}
			pos.randx = Math.floor(Math.random() * (1000 - 1) + 1);
		}
	};

	this.getX = function()
	{
		return x;
	};
	this.getY = function()
	{
		return y;
	};

	this.getOriginX = function()
	{
		return rockx + originX;
	};

	this.getOriginY = function()
	{
		return rocky + originY;
	};

	this.getRadius = function()
	{
		return radius;
	};
	

	this.moveRocks();
	this.resetRocks();
	clearRocks();
	
}

//bug object
function bug()
{
	var originX = bugw / 2;
	var originY = bugh / 2;
	var radius = originX;
	//create canvas for bug object
	var canvas = document.getElementById('bug', 'images/bug.png');
	var ctx = canvas.getContext('2d');
	var bugObj = new Image();

	bugObj.onload = function()
	{
		ctx.drawImage(bugObj, bugx, bugy, bugw, bugh);

	};
	bugObj.src = "images/bug.png";

	this.clearBug = function()
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	};
	
	//detect if user has pressed left or right
	//move bug in direction thats pressed
	document.onkeydown = function(e)
	{
		e = e || window.event;
		var key = e.which || e.keyCode;
		switch(key)
		{
			case 68: 
				movement = "right";
				dKeyPressed = true;
				break;
			case 65:
				aKeyPressed = true;
				movement = "left";
				break;
			default:
		}
	};	

	//move bug
	this.moveBug = function(movement)
	{
		if(movement == "right" && bugx <= 961 - bugw)
		{
			bugx += 5;
		}
		else if(movement == "left" && bugx >= 0)
		{
			bugx -= 5;
		}
		else
		{
			bugx = bugx;
		}
	};

	this.offScreen = function()
	{
		if (bugx < 50 || bugx > 960 - bugw)
		{
			return true;
		}
		return false;
	};

	this.getOriginX = function()
	{
		return bugx + originX;
	};

	this.getOriginY = function()
	{
		return bugy + originY;
	};

	this.getRadius = function()
	{
		return radius;
	};

	this.moveBug(movement);
	this.clearBug();
}

window.onload = init;