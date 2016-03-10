
//if function
var problem1 = function(hours, payrate, strtime, overtime)
{
	var paycheck;

	//check for straight time
	if (hours <= strtime)
	{
		paycheck = payrate * hours;
	}
	//check for double time
	if (hours > strtime && hours <= overtime)
	{
		paycheck = (strtime * payrate) + (payrate * 2) * (hours - strtime);
	}
	//check for triple time
	if (hours > overtime)
	{
		paycheck = (strtime * payrate) + (payrate * 2 * strtime) + (payrate * 3) * (hours - overtime);
	}
    
    //create string to print
    var prob = "<b>If: </b> <br>";
	var str = "Hours worked: " + hours + "<br>";
	str +=	  "Payrate: " + payrate + "<br>";
	str +=	  "Paycheck: " + paycheck + "<br>";
	document.write(prob + str);
};

//if else function
var problem2 = function(hours, payrate, strtime, overtime)
{
	var paycheck;

	//check for straight time
	if (hours <= strtime)
	{
		paycheck = payrate * hours;
	}
	//check for double time
	else if (hours <= overtime)
	{
		paycheck = (strtime * payrate) + (payrate * 2) * (hours - strtime);
	}
	//check for triple time
	else
	{
		paycheck = (strtime * payrate) + (payrate * 2 * strtime) + (payrate * 3) * (hours - overtime);
	}
    
    //create string to print
    var prob = "<b>If Else: </b><br>";
	var str = "Hours worked: " + hours + "<br>";
	str +=	  "Payrate: " + payrate + "<br>";
	str +=	  "Paycheck: " + paycheck + "<br>";
	document.write(prob + str);
};

//switch function
var problem3 = function(hours, payrate, strtime, overtime)
{
	var paycheck;

	//detemine paycheck
	switch (true)
	{
		case (hours <= strtime):
			paycheck = payrate * hours;
			break;
		case (hours <= overtime):
			paycheck = (strtime * payrate) + (payrate * 2) * (hours - strtime);
			break;
		default:
			paycheck = (strtime * payrate) + (payrate * 2 * strtime) + (payrate * 3) * (hours - overtime);
	}
	//create string to print
	var prob = "<b>Switch: </b><br>";
	var str = "Hours worked: " + hours + "<br>";
	str +=	  "Payrate: " + payrate + "<br>";
	str +=	  "Paycheck: " + paycheck + "<br>";
	document.write(prob + str);

}

//tenerary function
var problem4 = function(hours, payrate, strtime, overtime)
{
	var paycheck;

	//check for straight time
	paycheck = (hours <= strtime) ?
	           payrate * hours :
	           (hours <= overtime) ?
	           paycheck = (strtime * payrate) + (payrate * 2) * (hours - strtime) :
	           paycheck = (strtime * payrate) + (payrate * 2 * strtime) + (payrate * 3) * (hours - overtime);

	//determine paycheck
	var prob = "<b>Tenerary: </b><br>";
	var str = "Hours worked: " + hours + "<br>";
	str +=	  "Payrate: " + payrate + "<br>";
	str +=	  "Paycheck: " + paycheck + "<br>";
	document.write(prob + str);

}

var hours = prompt("Enter hours worked: ");
var payrate = prompt("Enter payrate: ");
var strtime = 20;
var overtime = 40;

problem1(hours, payrate, strtime, overtime);
problem2(hours, payrate, strtime, overtime);
problem3(hours, payrate, strtime, overtime);
problem4(hours, payrate, strtime, overtime);