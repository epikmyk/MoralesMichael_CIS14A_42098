
//find the high scores
function findHighScore(scores)
{
	var highScore = 0;
	for (var i = 0; i < scores.length; i++)
	{
		if (scores[i] > highScore)
		{
			highScore = scores[i];
		}
	}
	return highScore;
}

//print all scores
function printScores(scores)
{
	var output;
	for (var i = 0; i < scores.length; i++)
	{
		output = "Bubble solution #" + i + " score: " + scores[i] + "<br>";
		document.write(output);
	}
}

//find the best solutions
function findBestResults(scores, highScore)
{
	var bestResults = [];

	for (var i = 0; i < scores.length; i++)
	{
		if (scores[i] == highScore)
		{
			bestResults.push(i);
		}
	}
	return bestResults;
}

//find most cost effective solutions
function findMostCostEffective(costs, bestResults)
{
	var cost = 100;
	var mostCostEffective = 0;

	for (var i = 0; i < bestResults.length; i++)
	{
		bestSolution = bestResults[i];
		if (cost > costs[bestSolution])
		{
			cost = costs[bestSolution];
			mostCostEffective = bestSolution;
		}
	}
	return mostCostEffective;
}

var scores = [60, 50, 60, 58, 54, 54,
			  58, 50, 52, 54, 48, 69,
			  34, 55, 51, 52, 44, 51,
			  69, 64, 66, 55, 52, 61,
			  46, 31, 57, 52, 44, 18,
			  41, 53, 55, 61, 51, 44];

var costs = [.25, .27, .25, .25, .25, .25,
			 .33, .31, .25, .29, .27, .22,
			 .31, .25, .25, .33, .21, .25,
			 .25, .25, .28, .25, .24, .22,
			 .20, .25, .30, .25, .24, .25,
			 .25, .25, .27, .25, .26, .29];

var bubbleTests = scores.length;
var highScore = findHighScore(scores);
printScores(scores);

document.write("Bubbles tests: " + bubbleTests + "<br>");
document.write("Highest bubble score: " + highScore + "<br>");

var bestResults = findBestResults(scores, highScore);

document.write("Highest scores: " + bestResults + "<br>");

var mostCostEffective = findMostCostEffective(costs, bestResults);

document.write("Most cost effective solution: " + mostCostEffective);

