/*video game store front
you can create an account
it has input validation
you can sign in-- it actually compares your information with accounts made so if you try to sign in without creating an account
it wont let you. normally this is done with a server, not local storage but i just felt like implementing it for fun
also has input validation
you can add games to cart, remove then, buy them
you can click on the banners to take you to that specific game system or click the text links
you can also click the GameCrunch at the top left to always take you back to the home screen
the final version im sending only has two game system categories
in a real version i would use something like php to store all the games and load them from the server
i could have made it look prettier but that was spent on my game! and even that isn't that pretty! 
*/

window.onload = init;
function init()
{
	this.numItems = localStorage.getItem("numItems");
	//if status isnt stored in local storage then create and store
	if (!numItems)
	{
		numItems = 0;
		localStorage.setItem("numItems", JSON.stringify(numItems));
	}
	//else get status from local storage
	else
	{
		numItems = JSON.parse(numItems);
	}

	this.cartArray = localStorage.getItem("cartArray");
	if (!cartArray)
	{
		cartArray = [];
		localStorage.setItem("cartArray", JSON.stringify(cartArray));
	}
	//else get status from local storage
	else
	{
		cartArray = JSON.parse(cartArray);
	}

	var ps4 = display("ps4.html", "PS4", "shopping_bar");
	var xboxOne = display("xboxone.html", "Xbox One", "shopping_bar");

	var signInLink = outputSignedInStatus();
	var shoppingCart = display("cart.html", numItems + "<img src='images/shoppingcart.png'>", "account_bar");

	var path = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);

	if (path == "createaccount.html")
	{
		var createAccounts = initCreateAccount();
	}
	if (path == "signIn.html")
	{
		var login = initSignIn();
	}
	
	if (path == "ps4.html" || path == "xboxone.html")
	{
		var createGame = addGames();
	}
	if (path == "cart.html")
	{
		var ps4GamesArray = localStorage.getItem("ps4GamesArray");
		var xboxOneGamesArray = localStorage.getItem("xboxOneGamesArray");
		if(ps4GamesArray && xboxOneGamesArray)
		{
			ps4GamesArray = JSON.parse(ps4GamesArray);
			xboxOneArray = JSON.parse(xboxOneGamesArray);

			createCartDiv(cartArray);
			//createCartDiv(xboxOneGamesArray);

			viewCart();
		}
	}
	
	
}

//creates links
function display(nameOfHTML, output, idName)
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

//add items to cart
function addToCart()
{
	//iterate cart items
	numItems++;
	localStorage.setItem("numItems", JSON.stringify(numItems));

	//create game info object to get game information
	var currGameInfo = 
	{
		pageName: "cart.html",
		imageName: "<img src ='images/" + this.id + ".jpg'>",
		gameName: this.id
	}

	//push to cart
	cartArray.push(currGameInfo);
	localStorage.setItem("cartArray", JSON.stringify(cartArray));

}

//this just displays a link and sets its onclick property to a function
function displayAndDo(nameOfHTML, output, idName, doSomething)
{
	var item = document.createElement("a");
	item.href = nameOfHTML;
	item.innerHTML = output;
	document.getElementById(idName).appendChild(item);

	document.getElementById(idName).onclick = doSomething;
	
}

//view cart
function viewCart()
{
	var page = [];
	var image = [];
	var game = [];
	

	var buy = displayAndDo("thankyou.html", "Buy", "buyItems", buyItems);
	var clearFromCart = displayAndDo("cart.html", "Clear Cart", "cartOptions", clearCart);


	//this just allows you to view whats in cart
	for (var i = 0; i < cartArray.length; i++)
	{
		page.push(cartArray[i].pageName);
		image.push(cartArray[i].imageName);
		game.push(cartArray[i].gameName);

		display(page[i], image[i], game[i]);
	}

	var totalPrice = 0;

	var ps4GamesArray = localStorage.getItem("ps4GamesArray");
	var xboxOneGamesArray = localStorage.getItem("xboxOneGamesArray");
	ps4GamesArray = JSON.parse(ps4GamesArray);
	xboxOneGamesArray = JSON.parse(xboxOneGamesArray);

	//check to see if any games in cart matches xbox array and get price
	for (var i = 0; i < cartArray.length; i++)
	{
		for (var j = 0; j < xboxOneGamesArray.length; j++)
		{
			if (cartArray[i].gameName == xboxOneGamesArray[j].gameTitle)
			{
				totalPrice += xboxOneGamesArray[j].gamePrice;
				
			}
			
		}
	}

	//check to see if any games in cart match ps4 games array and get price
	for (var i = 0; i < cartArray.length; i++)
	{
		for (var j = 0; j < ps4GamesArray.length; j++)
		{
			if (cartArray[i].gameName == ps4GamesArray[j].gameTitle)
			{
				totalPrice += ps4GamesArray[j].gamePrice;
				
			}
			
		}
	}

	//displays total price
	var showPrice = document.createElement("div");
	showPrice.innerHTML = "Total Price: $" + totalPrice;
	document.getElementById("totalprice").appendChild(showPrice);
}

//clear items from cart
function clearCart()
{
	cartArray = [];
	localStorage.setItem("cartArray", JSON.stringify(cartArray));
	numItems = 0;
	localStorage.setItem("numItems", JSON.stringify(numItems));
}

//buy items
function buyItems()
{
	clearCart();
}

//game constructer
function game(system, title, price, image)
{
	this.gameSystem = system;
	this.gameTitle = title;
	this.gamePrice = price;
	this.gameImage = image;
}

function addGames()
{
	//normally this would all be done with a server and uploaded dynamically
	//however since local storage is limited in size and I'm using jpeg files I decided to hardcode it
	var ps4game1 = new game("ps4", "ps4Uncharted 4", 59.99, "<img src='images/ps4Uncharted 4.jpg'>");
	var ps4game2 = new game("ps4", "ps4Overwatch", 59.99, "<img src='images/ps4Overwatch.jpg'>");
	var ps4game3 = new game("ps4", "ps4No Mans Sky", 59.99, "<img src='images/ps4No Mans Sky.jpg'>");
	var ps4game4 = new game("ps4", "ps4Mirrors Edge Catalyst", 59.99, "<img src='images/ps4Mirrors Edge Catalyst.jpg'>");
	var ps4game5 = new game("ps4", "ps4NBA2k17", 59.99, "<img src='images/ps4NBA2k17.jpg'>");

	var ps4GamesArray = [ps4game1, ps4game2, ps4game3, ps4game4, ps4game5];

	var xboxonegame1 = new game("xboxone", "xboxoneOverwatch", 59.99, "<img src='images/xboxoneOverwatch.jpg'>");
	var xboxonegame2 = new game("xboxone", "xboxoneMirrors Edge Catalyst", 59.99, "<img src='images/xboxoneMirrors Edge Catalyst.jpg'>");
	var xboxonegame3 = new game("xboxone", "xboxoneGrand Theft Auto V", 59.99, "<img src='images/xboxoneGrand Theft Auto V.jpg'>");
	var xboxonegame4 = new game("xboxone", "xboxoneNBA2k17", 59.99, "<img src='images/xboxoneNBA2k17.jpg'>");
	var xboxonegame5 = new game("xboxone", "xboxoneDoom", 59.99, "<img src='images/xboxoneDoom.jpg'>");

	var xboxOneGamesArray = [xboxonegame1, xboxonegame2, xboxonegame3, xboxonegame4, xboxonegame5];
	/*after doing it this way i should have just used local storage. oh well.*/

	var path = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);

	//execute if on ps4 page
	if (path == "ps4.html")
	{
		var showGames = displayGames(ps4GamesArray);

	}
	//execute if on xboxone page
	else if (path == "xboxone.html")
	{
		var showGames = displayGames(xboxOneGamesArray);
	}

	//only execute if its the first time
	if (ps4Games != 1 && xboxOneGames != 1)
	{
		localStorage.setItem("ps4GamesArray", JSON.stringify(ps4GamesArray));
	    localStorage.setItem("xboxOneGamesArray", JSON.stringify(xboxOneGamesArray));
	}

    //set each to one
	var ps4Games = localStorage.getItem("ps4Games");
	if (!ps4Games)
	{
		ps4Games = 1;
		localStorage.setItem("ps4Games", JSON.stringify(ps4Games));
	}
	var xboxOneGames = localStorage.getItem("xboxOneGames");
	if (!xboxOneGames)
	{
		xboxOneGames = 1;
		localStorage.setItem("xboxOneGames", JSON.stringify(xboxOneGames));
	}

}

//create for cart page
function createCartDiv(cartArray)
{
	var elementid = [];

	for (var i = 0; i < cartArray.length; i++)
	{
		elementid[i] = document.createElement("div");
		elementid[i].id = cartArray[i].gameName;
		document.getElementById("cart").appendChild(elementid[i]);
	}
}


//display games
function displayGames(gamesArray)
{
	var gameArray = [];
	var elementid = [];
	var parentDiv = [];
	
	//displays games in game pages
	for (var i = 0; i < gamesArray.length; i++)
	{
		elementid[i] = document.createElement("div");
		elementid[i].id = gamesArray[i].gameTitle;
		document.getElementById("gamelist").appendChild(elementid[i]);

		gameArray[i] = (displayAndDo("cart.html", gamesArray[i].gameImage  + "<br>" + "&nbsp&nbsp&nbsp&nbsp$" 
			+ gamesArray[i].gamePrice + "<br><br>", elementid[i].id, addToCart))
	}
}


//sign user out
function signOut()
{
	var signedIn = 2;
	localStorage.setItem("signedIn", JSON.stringify(signedIn));
}

//initiate sign in function
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

	//create object for email and password information
	var userObj = 
	{
		email: useremail,
		password: userpassword
	}

	//this is to determine if user has signed in
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

 		if(userArray)
 		{
 			window.location.replace("signedUp.html");
 		}
		
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

