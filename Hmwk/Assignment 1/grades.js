var score = prompt("Enter a score");

var grade = (score >= 90) ? "A" :
			(score >= 80) ? "B" :
			(score >= 70) ? "C" :
			(score >= 60) ? "D" : "F";

console.log (grade);