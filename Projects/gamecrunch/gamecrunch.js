window.onload = init;
function init()
{
	var ps4 = menuView("ps4.html", "PS4", "shopping_bar");
	var xboxOne = menuView("xboxone.html", "Xbox One", "shopping_bar");
	var ps3 = menuView("games.html", "PS3", "shopping_bar");
	var xbox360 = menuView("games.html", "Xbox 360", "shopping_bar");
	var pc = menuView("games.html", "PC", "shopping_bar");
	var wiiU = menuView("games.html", "Wii U", "shopping_bar");
	var psvita = menuView("games.html", "PS Vita", "shopping_bar");
	var nintendo3ds = menuView("games.html", "3DS", "shopping_bar");

	var signInLink = outputSignedInStatus();
	var shoppingCart = menuView("shoppingCart.html", "<img src='images/shoppingcart.png'>", "account_bar");

	var path = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);

	if (path == "createaccount.html")
	{
		var createAccounts = initCreateAccount();
	}
	if (path == "signIn.html")
	{
		var login = initSignIn();
	}
	
	var createGame = createGames();
	
}

function menuView(nameOfHTML, output, idName)
{
	var item = document.createElement("a");
	item.href = nameOfHTML;
	item.innerHTML = output;
	item.id = output;
	document.getElementById(idName).appendChild(item);

}

//check whether user is signed in or out
function checkStatus(nameOfHTML, output, idName)
{
	var item = document.createElement("a");
	item.href = nameOfHTML;
	item.innerHTML = output;
	document.getElementById(idName).appendChild(item);

	if (output === "Sign Out")
	{
		item.onclick = signOut;
	}
}

function createGames()
{
	//normally this would all be done with a server and uploaded dynamically
	//however since local storage is limited in size and I'm using jpeg files I decided to hardcode it
	var ps4game1 = new game("ps4", "Uncharted4", 59.99, "<img src='images/ps4/game1ps4.jpg'>");
	var ps4game2 = new game("ps4", "Overwatch", 59.99, "<img src='images/ps4/game2ps4.jpg'>");
	var ps4game3 = new game("ps4", "No Mans Sky", 59.99, "<img src='images/ps4/game3ps4.jpg'>");
	var ps4game4 = new game("ps4", "Mirrors Edge Catalyst", 59.99, "<img src='images/ps4/game4ps4.jpg'>");
	var ps4game5 = new game("ps4", "NBA2k17", 59.99, "<img src='images/ps4/game5ps4.jpg'>");

	var ps4GamesArray = [ps4game1, ps4game2, ps4game3, ps4game4, ps4game5];

	var xboxonegame1 = new game("xboxone", "Overwatch", 59.99, "<img src='images/xboxone/game1xboxone.jpg'>");
	var xboxonegame2 = new game("xboxone", "Mirrors Edge Catalyst", 59.99, "<img src='images/xboxone/game2xboxone.jpg'>");
	var xboxonegame3 = new game("xboxone", "Grand Theft Auto V", 59.99, "<img src='images/xboxone/game3xboxone.jpg'>");
	var xboxonegame4 = new game("xboxone", "NBA2k17", 59.99, "<img src='images/xboxone/game4xboxone.jpg'>");
	var xboxonegame5 = new game("xboxone", "Doom", 59.99, "<img src='images/xboxone/game5xboxone.jpg'>");

	var xboxOneGamesArray = [xboxonegame1, xboxonegame2, xboxonegame3, xboxonegame4, xboxonegame5];
	/*after doing it this way i should have just used local storage. oh well.*/

	var path = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);

	if (path == "ps4.html")
	{
		var showGames = displayGames(ps4GamesArray);

	}
	else if (path == "xboxone.html")
	{
		var showGames = displayGames(xboxOneGamesArray);
	}

}

function displayGames(gamesArray)
{
	
	for (var i = 0; i < gamesArray.length; i++)
	{
		menuView("games.html", gamesArray[i].gameImage  + "<br>" + "&nbsp&nbsp&nbsp&nbsp$" + gamesArray[i].gamePrice + "<br><br>", "gamelist")
		menuView("games.html", "Add to cart" + "<br><br>", "gamelist");	
	}
}

function getGamesArray(gameSystem)
{
	var gamesArray = localStorage.getItem(gameSystem + "gamesArray");
	//if no game array is in local storage create one and store it
	if (!gamesArray)
	{
		gameArray = [];
		localStorage.setItem(gameSystem + "gamesArray", JSON.stringify(gamesArray));
	}
	//else get game array from local storage
	else
	{
		gameArray = JSON.parse(gamesArray);
	}
	return gameArray;
}

function game(system, title, price, image)
{
	this.gameSystem = system;
	this.gameTitle = title;
	this.gamePrice = price;
	this.gameImage = image;
}

//sign user out
function signOut()
{
	var signedIn = 2;
	localStorage.setItem("signedIn", JSON.stringify(signedIn));
}


function initSignIn()
{
	var button = document.getElementById("signIn");
	button.onclick = signIn;
}

//sign user in
function signIn()
{
	var useremail = document.forms["signinform"]["email"].value;
	var userpassword = document.forms["signinform"]["password"].value;

	var userArray = getUserInfo();

	var userObj = 
	{
		email: useremail,
		password: userpassword
	}

	for (var i = 0; i < userArray.length; i++)
	{
		if (userObj.email === userArray[i].email && userObj.password === userArray[i].password)
		{
			var signedIn = 1;
			localStorage.setItem("signedIn", JSON.stringify(signedIn));
			document.location.href = "gamecrunch.html";	
			return true;
			
		}
	}


	noMatchError.style.color = 'red';
	document.getElementById('noMatchError').innerHTML = "The email address and password you entered are incorrect.";
	return false;

}

//output whether user is signed in out signed out
function outputSignedInStatus()
{
	if (getSignedIn == 1)
	{
		var signInLink = checkStatus("gameCrunch.html", "Sign Out", "account_bar");
	}
	else
	{
		var signInLink = checkStatus("signIn.html", "Sign In", "account_bar");
	}
}

//get signed in status
function getSignedIn()
{
	var signedIn = localStorage.getItem("signedIn");
	//if status isnt stored in local storage then create and store
	if (!signedIn)
	{
		signedIn = 2;
		localStorage.setItem("signedIn", JSON.stringify(userArray));
	}
	//else get status from local storage
	else
	{
		signedIn = JSON.parse(signedIn);
	}
	return signedIn;
}

//check to see if user presses create account
function initCreateAccount()
{
	var button = document.getElementById("create_account");
	button.onclick = createAccount;

}

//create user account
function createAccount()
{
	//if user input is valid then insert user data into any array and store it
	if (validate())
	{
		var username = document.forms["signupform"]["name"].value;
		var useremail = document.forms["signupform"]["email"].value;
		var userpassword = document.forms["signupform"]["password"].value;

		var userObj =
		{
			name: username,
			email: useremail,
			password: userpassword
		};

		var userArray = getUserInfo();
		userArray.push(userObj);
		localStorage.setItem("userArray", JSON.stringify(userArray));
	}		
}

//get user info
function getUserInfo ()
{
	var userArray = localStorage.getItem("userArray");
	//if no user array is in local storage create one and store it
	if (!userArray)
	{
		userArray = [];
		localStorage.setItem("userArray", JSON.stringify(userArray));
	}
	//else get user array from local storage
	else
	{
		userArray = JSON.parse(userArray);
	}
	return userArray;
}

function validate()
{
	//check if user enters valid first name
	var username = document.forms["signupform"]["name"].value;
	var validName = /^[a-z ,.'-]+$/i;

	if (username.search(validName))
	{
		nameError.style.color = 'red';
		document.getElementById('nameError').innerHTML = "Please enter a valid name";


		return false;
	}
	else
	{
		document.getElementById('nameError').innerHTML = "";
	}

	//check if user enters a valid email 
	var useremail = document.forms["signupform"]["email"].value;
	var validEmail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(com|edu|gov|net|org|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

	if (useremail.search(validEmail))
	{
		emailError.style.color = 'red';
		document.getElementById('emailError').innerHTML = "Please enter a valid email";
		return false;
	}
	else
	{
		document.getElementById('emailError').innerHTML = "";
	}

	//check if user enters a valid password
	var userpassword = document.forms["signupform"]["password"].value;
	var validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;

	if (userpassword.search(validPassword))
	{
		passwordError.style.color = 'red';
		document.getElementById('passwordError').innerHTML = "Password must contain 8-16 characters<br>" +
																		 "At least one uppercase letter<br>" + 
																		 "At least one lowercase letter<br>" +
																		 "At least one number<br>";

		return false;
	}
	else
	{
		document.getElementById('passwordError').innerHTML = "";
	}

	//check to see if passwords match
	var userpassword2 = document.forms["signupform"]["password2"].value;
	if (userpassword !== userpassword2)
	{
		password2Error.style.color = 'red';
		document.getElementById('password2Error').innerHTML = "Passwords don't match";

		return false;
	}
	else
	{
		document.getElementById('password2Error').innerHTML = "";
	}

	//check to see if email is already in use
    var userArray = getUserInfo();
	var userObj =
	{
		email: useremail,
	};

	for (var i = 0; i < userArray.length; i++)
	{
		if (userObj.email === userArray[i].email)
		{
			emailError.style.color = 'red';
			document.getElementById('emailError').innerHTML = "User with that email already exists!";
			return false;
		}
	}

	return true;
}

