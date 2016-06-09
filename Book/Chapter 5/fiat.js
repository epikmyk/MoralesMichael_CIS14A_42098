var fiat = 
{
	make: "Fiat",
	model: "500",
	year: 1957,
	color: "Medium Blue",
	passengers: 2,
	convertible: false,
	mileage: 88000,
	started: false,
	fuel: 0,

	start: function()
	{
		if (this.fuel == 0)
		{
			alert("They car is empty, full up before starting!")
		}
		else
		{
			this.started = true;
		}
	},

	stop: function()
	{
		this.started = false;
	},

	drive: function()
	{
		if(this.started)
		{
			if(this.fuel > 0)
			{
				alert(this.make + " " + this.model + " goes zoom zoom!");
				this.fuel--;
			}
			else
			{
				alert("uh oh, out of fuel.");
				this.stop();
			}
		}
		else
		{
			alert("You need to start the engine first.");
		}
	},

	addFuel: function(amount)
	{
		this.fuel = this.fuel + amount;
	}
};

fiat.start();
fiat.drive();
fiat.addFuel(2);
fiat.start();
fiat.drive();
fiat.drive();
fiat.drive();
fiat.stop();