
//initialize web page with this ID set to hidden
document.getElementById("game").classList.add("hidden");
document.getElementById("back").classList.add("hidden");
document.getElementById("teamSection").classList.add("hidden");
document.getElementById("roundOver").classList.add("hidden");

//START GAME//
//when start button clicked
document.getElementById("start").addEventListener("click", function() {
	//Go to the Team Section
	document.getElementById("home").classList.add("hidden");
	document.getElementById("teamSection").classList.remove("hidden");
})


//CREATE TEAMS//
function nameTeam(name, location) {
	//Create a variable and set it to the user-input//
	var newName = document.getElementById(name).value;
	//Log result to console//
	console.log(newName);
	document.querySelector(location).innerHTML="<h1>" + newName + "</h1>"
}
//When button clicked, call the name team function on both team1 and team2
document.querySelector("#submitName").addEventListener("click", function() {
	nameTeam("name1", "#score1");
	nameTeam("name2", "#score2");
	//Go to noun section 
	document.getElementById("nounInput").classList.remove("hidden");
	document.getElementById("teamSection").classList.add("hidden");
	document.getElementById("back").classList.remove("hidden");
});


//CREATE NOUNS//
//Create an empty array of nouns//
document.getElementById("nounInput").classList.add("hidden");
var nounArray = [];

//Add new nouns to the array// 
function storeNoun () {
	//Create a new noun based on user input//
	var newNoun = document.getElementById("nounBox").value;
	//If users submits empty string
	if (newNoun == "") {
		//Alert user that they cant do that
		alert("Invalid input");
	} else {
		//Add new noun to the array//
		nounArray.push(newNoun);
		//Check that array is adding nouns//
		console.log(nounArray);
	}	
}
//Add new noun to array every time user clicks submit button//
document.querySelector("#submit").addEventListener("click", function(){
	storeNoun();
	//clear the previous word typed from the text box
	document.getElementById("nounBox").value = "";
});


//BACK BUTTON//
//When button clicked, go back to team section
document.querySelector("#back").addEventListener("click",function(){
	document.getElementById("nounInput").classList.add("hidden");
	document.getElementById("teamSection").classList.remove("hidden");
	document.getElementById("back").classList.add("hidden");
})
	


//BEGIN PLAYING//
//Function that shuffles elements in an array//
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


//When play button is clicked, call shuffle function on noun array//
document.querySelector("#play").addEventListener("click",function(){
	if (nounArray.length < 5) {
		alert("Minimum of 5 nouns per player")
	} else {
		//shuffle once//
		shuffle(nounArray);
		//shufle again just to be safe//
		shuffle(nounArray);
		//Test to make sure nouns are shuffled//
		console.log(nounArray);
		document.getElementById("nounInput").classList.add("hidden");
		document.getElementById("game").classList.remove("hidden");
		changeNoun();
		startTimer();
}	
})

//Go through array of nouns and display each element one at a time//
var counter = 0;
function changeNoun() {
	//var p = document.createElement("p");	
	if (counter < nounArray.length) {	
		//var content = document.createTextNode(nounArray[counter]);
		//p.appendChild(content);	
		document.querySelector("#word").innerHTML = "<p>" + nounArray[counter] + "</p>";
		// alert(nounArray[counter]);
		counter++;
	} else {
		document.getElementById("game").classList.add("hidden");
		document.getElementById("roundOver").classList.remove("hidden");
	}
}

//Initialize switch team varable to team 1
var currentTeam = 1;

//Create two new variables for the score of each team
var score1 = 0;
var score2 = 0;
//Add to score everytime player clicks next
function changeScore(team) {
	if (currentTeam == 1) {
		score1++;
		document.querySelector("#num1").innerHTML = "<h1>" + score1 + "</h1>";
	} else {
		score2++;
		document.querySelector("#num2").innerHTML = "<h1>" + score2 + "</h1>";
	}
	console.log(score1);
	console.log(score2);

	
}

//When next button clicked
document.querySelector("#next").addEventListener("click",function() {
	//Show next noun
	changeNoun();
	//change score
	changeScore(currentTeam);
})


//Timer
function startTimer() {
	var nextRoundButton = document.getElementById("timer");
	var timer = 60;
	var newElement = document.createElement("h1");
	var id;

	nextRoundButton.parentNode.replaceChild(newElement,nextRoundButton);
	id = setInterval(function() {
		timer--;
		if (timer < 0) {
			newElement.parentNode.replaceChild(nextRoundButton, newElement);
			clearInterval(id);
			alert("Time is up! Pass device to player on other team");
			document.getElementById("next").classList.add("hidden");
		} else {
			newElement.innerHTML = "<h1>" + timer.toString() + "</h1>";
		}
	}, 1000);
}

//When timer button is clicked, reset the timer.
document.querySelector("#timer").addEventListener("click", function() {
 	//restart timer
 	startTimer();
 	document.getElementById("next").classList.remove("hidden");

 	if (currentTeam == 1) {
 		currentTeam = 2;

 	} else {
 		currentTeam = 1;
	}
 })

//Continue to next round
document.querySelector("#continue").addEventListener("click", function () {
	counter = 0;
	//shuffle once//
	shuffle(nounArray);
	//shufle again just to be safe//
	shuffle(nounArray);

	document.getElementById("game").classList.remove("hidden");
	document.getElementById("roundOver").classList.add("hidden");
})






