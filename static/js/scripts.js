var base_url = $('#baseUrl').val();
//"Global" variables for the game
var numberOfPlays;
//Player playing this turn
var playerTurn = {};
var draw;
var player1 = {};
var player2 = {};
var winner;
//Only change to true when the game settings are done
var allowedToPlay = false;

//Call the players names modal
getPlayersNames();

//Modal for the players enter their names
function getPlayersNames(){
	//Sweet alerts
	swal.setDefaults({
		input: 'text',
		confirmButtonText: 'Next &rarr;',
		showCancelButton: true,
		animation: false,
		progressSteps: ['1', '2'],
		inputValidator: function (value) {
			return new Promise(function (resolve, reject) {
			  	if (value) {
					if(value.length < 50){
						resolve();
					}
					else{
						reject('Please enter a name with less than of 50 characters');
					}
			  	} else {
					reject('You need to write something!');
			  	}
			});
		}
	})
	//Two players = Two steps
	var steps = [
		'Player 1 name',
		'Player 2 name',
	]
	//After he modal
	swal.queue(steps).then(function (result) {
		//Setting up the players
		player1 = {
			name: result[0],
			mark: "O",
			score: 0,
			player: 1,
		}
		player2 = {
			name: result[1],
			mark: "X",
			score: 0,
			player: 2
		}
		//Allow the players to play
		allowedToPlay = true;
		//Append players names
		$(".players").prepend("<p class='player2'>Player 2: <strong>" + player2["name"] + "</strong><br><span>Score: <strong>" + player2["score"] + "</strong></span></p>");
		$(".players").prepend("<p class='player1'>Player 1: <strong>" + player1["name"] + "</strong><br><span>Score: <strong>" + player1["score"] + "</strong></span></p>");
		//Initialize the game
		init();
		//Sweet modals configurations reset
		swal.resetDefaults();
	  	}, function () {
		swal.resetDefaults()
	});
}

//Initialize the game
function init(){
	//Setting up variables
	numberOfPlays = 0;
	playerTurn = player1;
	draw = 0;	
	//Reset board state
	resetBoard();
	//Reset the HTML fields
	$(".field").find("p").text("");
	$(".field").removeClass("checked");
	//Allow players to play
	allowedToPlay = true;
}

//Resets the board state
function resetBoard(){
	board = 
	[
		[null,null,null],
		[null,null,null],
		[null,null,null],
	];
}

//Listening click events of the fields
$("body").on("click", ".field", function(){
	play($(this));
});

//Called every time that someone plays
function play(e){
	//Check if the players are allowed to play
	if(!allowedToPlay){
		swal(
			'Click on the reset button!',
			'Enter the players names and play',
			'error'
		);
		return false;
	}

	//Get the row and collunm played
	var row = e.parent().index();
	var column = e.index();
	//Check if the play is allowed
	if( board[row][column] === null ){
		//Mark the play on the grid and matrix
		board[row][column] = playerTurn["mark"];
		e.find("p").text( playerTurn["mark"] );
		//Increase the number of plays
		numberOfPlays++;
		//If has enough plays to finish the game check if is over
		if(numberOfPlays > 4){
			if(isGameOver(row, column)){
				//Setting up the winner (Into this moment winner = player whose made the last play)
				winner = playerTurn["name"];
				//Using javascript object reference to add score(+1) to the winner
				updateScore(playerTurn);
				//Save to a database by Ajax/Codiginite
				saveDatabase(player1["name"], player2["name"], winner, draw)
				//Insert recent result into the sidebar
				injectResultsSidebar(player1["name"], player2["name"], winner);
				//Blocking the game
				allowedToPlay = false;
				//Show the end game alert
				swal({
					title: playerTurn["name"] + ' won!',
					text: "Do you want to play again?",
					type: 'info',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Play again!'
				}).then(function () {	
					//Restarting the game
					init();
				});
			}
			// Check if the table is full
			else if(numberOfPlays === 9){
				// Full table, draw game
				draw = 1;
				winner = "";
				//Save to a database by Ajax/Codiginite
				saveDatabase(player1["name"], player2["name"], winner, draw)
				//Insert recent result into the sidebar
				injectResultsSidebar(player1["name"], player2["name"], winner);
				//Blocking the game
				allowedToPlay = false;
				//Show the end game alert
				swal({
					title: 'Draw!',
					text: "Do you want to play again?",
					type: 'info',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Play again!'
				}).then(function () {	
					//Restarting the game
					init();
				});
			}
		}
		//If the game is not finished change the player
		switchPlayer();			
	}
	//Called if the player tried to play on the cell already taken
	else{
		//Modal
		swal(
			'Choose another spot!',
			'This spot is already taken!',
			'error'
		);		
	}
}

//Listening click events of the restart button
$("body").on("click", ".restart", function(){
	//Reseting the players names
	$(".players").html("");
	//This function also calls the game initalization due the name changes
	getPlayersNames();
});

//Changes the turnPlayer
function switchPlayer(){
	//Check played last turn
	if( playerTurn["player"] === 1 ){
		//Using javascript object reference point the playerTurn to the player 2
		playerTurn = player2;
	}else{
		//Using javascript object reference point the playerTurn to the player 1
		playerTurn = player1;
	}
}

//Checks if the game has finished
function isGameOver(row, column){	
	//Check rows
	if(checkRows(row)){
		return true;
	}
	//Check columns
	if(checkColumns(column)){
		return true;
	}
	//Check diagonals
	if(checkDiagonals()){
		return true;
	}
}

//Check only the rows related with the last movement
function checkRows(row){
	if(board[row][0] === board[row][1] &&  board[row][0] === board[row][2]){
		//Highlighting the row
		for (field = 0; field < board.length; field++){
			$("#playarea").children(".row").eq(row).children("div").eq(field).addClass("checked");			
		}
		//Game over
		return true;		
	}
}

//Checks only the column related with the last movement
function checkColumns(column){
	if(board[0][column] === board[1][column] &&  board[0][column] === board[2][column]){
		//Highlighting the column
		for (field = 0; field < board.length; field++){
			$("#playarea").children(".row").eq(field).children("div").eq(column).addClass("checked");
		}
		//Game over
		return true;
	}
}

//Checks diagonals
function checkDiagonals(){
	for (i = 0; i < board.length; i = i+2) { 
		//Left to right diagonal
		if(i===0){
			if(board[i][i] === board[i+1][i+1] && board[i][i] === board[i+2][i+2] && board[i][i] !== null){
				//Highlighting the diagonal
				$("#playarea").children(".row").eq(i).children("div").eq(i).addClass("checked");
				$("#playarea").children(".row").eq(i+1).children("div").eq(i+1).addClass("checked");
				$("#playarea").children(".row").eq(i+2).children("div").eq(i+2).addClass("checked");
				//Game over
				return true;
			}	
		}
		//Right to left diagonal
		else{
			if(board[i][i-2] === board[i-1][i-1] && board[i][i-2] === board[i-2][i] && board[i][i-2] !== null){
				//Highlighting the diagonal
				$("#playarea").children(".row").eq(i).children("div").eq(i-2).addClass("checked");
				$("#playarea").children(".row").eq(i-1).children("div").eq(i-1).addClass("checked");
				$("#playarea").children(".row").eq(i-2).children("div").eq(i).addClass("checked");
				//Game over
				return true;
			}
		}
	}
}

//Updates the current players score
function updateScore(player){
	player["score"] = player["score"] + 1;
	if(player["player"] === 1){
		$(".player1 span strong").text(player["score"]);
	}
	else{
		$(".player2 span strong").text(player["score"]);
	}
}

//Inject new results into the sidebar (just show five)
function injectResultsSidebar(player1, player2, winner){
	//Check if there are five results
	if($(".cont-results").find(".result").length === 5){
		$('.cont-results .result').last().remove();
	}	
	//Checks if the game had a winner
	if(winner !== ""){
		//Insert the result into the sidebar
		var html = " \
		<div class='result'>  \
			<span><b>Player1:</b> " + player1 + "</span> \
			<span><b>Player2:</b> " + player2 + "</span> \
			<p><b>Winner:</b> " + winner + "</p> \
		</div>";
	}
	//Draw game
	else{
		//Insert the result into the sidebar
		var html = " \
		<div class='result'>  \
			<span><b>Player1:</b> " + player1 + "</span> \
			<span><b>Player2:</b> " + player2 + "</span> \
			<p><b>Draw game</b></p> \
		</div>";
	}	
	//Appending HTML
	$(".cont-results").prepend(html);	
}

//Send the data to be saved in database
function saveDatabase(player1, player2, winner, draw){
	$.ajax({
		url: base_url + 'matches/store',
		type : "POST",
		data : {"player1": player1, "player2" : player2, "winner" : winner, "draw" : draw}
	});	
}
