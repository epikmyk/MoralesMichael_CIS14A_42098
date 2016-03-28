function calcPay()
{
	var strtime = 20;
	var overtime = 40;
	var hours = document.getElementById('hours').value;
	var payrate = document.getElementById('pay').value;
	payrate = parseFloat(payrate).toFixed(2);
	hours = parseFloat(hours).toFixed(2);

	//check for straight time
	if (hours <= strtime)
	{
		gross = payrate * hours;
	}
	//check for double time
	else if (hours <= overtime)
	{
		gross = (strtime * payrate) + (payrate * 2) * (hours - strtime);
	}
	//check for triple time
	else
	{
		gross = (strtime * payrate) + (payrate * 2 * strtime) + (payrate * 3) * (hours - overtime);
	}

	var taxes = (gross * .10).toFixed(2);
	var net = (gross - taxes).toFixed(2);
	gross = gross.toFixed(2);

	var NROWS = 2, NCOLS = 5;

	var payArr = [[["hours"], ["gross"],["payrate"], ["taxes"], ["net"]], 
				  [[hours],   [gross],  [payrate],   [taxes],   [net]]];

	var str = "";
	str += "<table border = '1'>";
	for (var rows = 0; rows < NROWS; rows++)
	{
		str += "<tr>";
		for (var cols = 0; cols < NCOLS; cols++)
		{
			str += "<td><center>" + payArr[rows][cols] + "</center></td>";
		}
		str += "</tr>";
	}
	str += "</table>";
	document.write(str);

}

