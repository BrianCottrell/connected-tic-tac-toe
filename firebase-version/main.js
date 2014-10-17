/* Angular Javascript Tic Tac Toe */
var app = angular.module('TTTApp', ["firebase"]);			//Create an angular javascript module
//Add an angular javascript controller and include firebase
app.controller('TTTController', function($scope,$firebase){
/*Variables*/
	$scope.winTarget = 5;
	$scope.boardRows = 7;						//Number of rows on game board
	$scope.columns = 9;							//Number of columns on game board
	$scope.switchRows = 0;						//Stores row count when switching rows and columns
	$scope.winCountX = 0;						//Indicates how many times x has won
	$scope.winCountO = 0;						//Indicates how many times o has won
	$scope.xTurnMessage = 'Player 1';			//Message displayed on X's turn
	$scope.oTurnMessage = 'Player 2';			//Message displayed on O's turn	
	$scope.xWinMessage = ' Wins!';				//Message displayed when X wins
	$scope.oWinMessage = ' Wins!';				//Message displayed when O wins	
/*Firebase Variables*/
	var select = new Firebase("https://briansproject1.firebaseio.com/");
	$scope.storeSelect = $firebase(select);
/*Firebase Functions*/
	//Listens for any change to the index stored on the server	
	select.on('value', function (cellIndex) {
		//If the reset button is clicked the index is set to null and the game resets
		if(cellIndex.val() == null){
			$scope.count = 0;						//Counts how many turns have passed
			$scope.board = [];						//Create a game board
			$scope.winText = $scope.xTurnMessage;	//X goes first
			$scope.winCheck = 0;					//Used for checking if a win condition has been met
			$scope.gameEnd = false;					//A new game has started
			$scope.rowCheck = 0;					//Used when checking for the end of a row
			$scope.endCheck = false;				//Indicates that the game has not yet ended
			$scope.offset = 0;						//Increments to find the nex cell when checking rows
			if($scope.boardRows > $scope.columns){	//This ensures non-square boards display horizontally
				$scope.switchRows = $scope.boardRows;
				$scope.boardRows = $scope.columns;
				$scope.columns = $scope.switchRows;
			}
			$scope.sideLength = 40/$scope.columns+'%';//Side length of each cell
			$scope.spacing = 10/$scope.columns+'%';	//Spacing between cells	
			$scope.board.length = $scope.columns*$scope.boardRows;//Give board a correct number of cells
		}
		//Whenever a change in the cell index is detected and there is a game in progress
  		if(!$scope.board[cellIndex.val()] && !$scope.gameEnd){			//If the cell has not been clicked	
			$scope.board[cellIndex.val()] = 1-(2*($scope.count%2));		//Find out whose turn it was
			$scope.winText = $scope.xTurnMessage;					//Player X's turn
			if($scope.board[cellIndex.val()] == 1){						//If its player O's turn
				$scope.winText = $scope.oTurnMessage;				//Player O's turn
			}
			//Checks for a win condition across each row
			//Check neighbors from left to right
			while(!$scope.endCheck){				//While there are still cells that need checking
				if($scope.board[cellIndex.val()] != $scope.board[cellIndex.val()+$scope.offset]){
					$scope.endCheck = true;			//The current cells dosn't match the cell clicked
				}
				$scope.rowCheck = cellIndex.val()+$scope.offset;		//Current cell being checked
				$scope.offset++;									//Move to next cell in the line
				if(($scope.rowCheck)%$scope.columns == 0 && $scope.offset > 1){	
					$scope.endCheck = true;			//The next cell is at the edge of the board
				}
				$scope.winCheck+=$scope.board[cellIndex.val()];			//Increment win check counter
			}			
			$scope.offset = 0;						//Reset cell offset counter
			$scope.endCheck = false;				//Prepare to start a new check
			$scope.rowCheck = 0;					//Return to the current cell clicked
			//Check neighbors from right to left
			while(!$scope.endCheck){				//While there are still cells that need checking
				if($scope.board[cellIndex.val()] != $scope.board[cellIndex.val()+$scope.offset]){
					$scope.endCheck = true;			//The current cells dosn't match the cell clicked
				}
				if($scope.offset){
					$scope.rowCheck = cellIndex.val()+$scope.offset;	//Current cell being checked
				}
				$scope.offset--;									//Move to next cell in the line
				if(($scope.rowCheck+1)%$scope.columns == 0){
					$scope.endCheck = true;			//The next cell is at the edge of the board
				}
				$scope.winCheck+=$scope.board[cellIndex.val()];			//Increment win check counter
			}	
			$scope.offset = 0;						//Reset cell offset counter
			$scope.endCheck = false;				//Prepare to start a new check
			$scope.rowCheck = 0;					//Return to the current cell clicked
			if($scope.winCheck > $scope.winTarget+2){				//If player X occupies all cells
				$scope.winText = $scope.xTurnMessage+$scope.xWinMessage;//Player X wins
			}
			if($scope.winCheck < -1*$scope.winTarget-2){			//If player O occupies all cells
				$scope.winText = $scope.oTurnMessage+$scope.oWinMessage;//Player O wins
			}
			$scope.winCheck = 0;					//Reset win check counter to start a new check
			//Checks for a win condition across each column
			//Check neighbore from top to bottom
			for(var i = 0; $scope.board[cellIndex.val()+i*$scope.columns] == $scope.board[cellIndex.val()] 
			&& $scope.board[cellIndex.val()+i*$scope.columns] < $scope.board.length; i++){
				$scope.winCheck+=$scope.board[cellIndex.val()];			//Increment win check counter
			}
			//Check neighbors from bottom to top
			for(var i = 0; $scope.board[cellIndex.val()-i*$scope.columns] == $scope.board[cellIndex.val()] 
			&& cellIndex.val()-i*$scope.columns > 0; i++){
				$scope.winCheck+=$scope.board[cellIndex.val()];			//Increment win check counter
			}
			if($scope.winCheck > $scope.winTarget){					//If player X occupies all cells
				$scope.winText = $scope.xTurnMessage+$scope.xWinMessage;//Player X wins
			}
			if($scope.winCheck < -1*$scope.winTarget){				//If player O occupies all cells
				$scope.winText = $scope.oTurnMessage+$scope.oWinMessage;//Player O wins
			}
			$scope.winCheck = 0;					//Reset win check counter to start a new check
			//Checks for a win condition across a forward diagonals
			//Check neighbors from top left to bottom right
			while(!$scope.endCheck){				//While there are still cells that need checking
				if($scope.board[cellIndex.val()] != $scope.board[cellIndex.val()+$scope.offset]){
					$scope.endCheck = true;			//The current cells dosn't match the cell clicked
				}
				$scope.rowCheck = cellIndex.val()+$scope.offset;		//Current cell being checked
				$scope.offset+=($scope.columns+1);					//Move to next cell in the line
				if((($scope.rowCheck)%$scope.columns == 0 || $scope.rowCheck > $scope.board.length) 
				&& $scope.offset > ($scope.columns+1)){	
					$scope.endCheck = true;			//The next cell is at the edge of the board
				}
				$scope.winCheck+=$scope.board[cellIndex.val()];			//Increment win check counter
			}			
			$scope.offset = 0;						//Reset cell offset counter
			$scope.endCheck = false;				//Prepare to start a new check
			$scope.rowCheck = 0;					//Return to the current cell clicked
			//Check neighbors from bottom right to top left
			while(!$scope.endCheck){				//While there are still cells that need checking
				if($scope.board[cellIndex.val()] != $scope.board[cellIndex.val()+$scope.offset]){
					$scope.endCheck = true;			//The current cells dosn't match the cell clicked
				}
				if($scope.offset){
					$scope.rowCheck = cellIndex.val()+$scope.offset;	//Current cell being checked
				}
				$scope.offset-=($scope.columns+1);					//Move to next cell in the line
				if(($scope.rowCheck+1)%$scope.columns == 0 || $scope.rowCheck < 0){
					$scope.endCheck = true;			//The next cell is at the edge of the board
				}
				$scope.winCheck+=$scope.board[cellIndex.val()];			//Increment win check counter
			}	
			$scope.offset = 0;						//Reset cell offset counter
			$scope.endCheck = false;				//Prepare to start a new check
			$scope.rowCheck = 0;					//Return to the current cell clicked
			if($scope.winCheck > $scope.winTarget+2){				//If player X occupies all cells
				$scope.winText = $scope.xTurnMessage+$scope.xWinMessage;//Player X wins
			}
			if($scope.winCheck < -1*$scope.winTarget-2){			//If player O occupies all cells
				$scope.winText = $scope.oTurnMessage+$scope.oWinMessage;//Player O wins
			}
			$scope.winCheck = 0;					//Reset win check counter to start a new check
			//Checks for a win condition across a reverse diagonals
			//Check neighbors from bottom left to top right
			while(!$scope.endCheck){				//While there are still cells that need checking
				if($scope.board[cellIndex.val()] != $scope.board[cellIndex.val()+$scope.offset]){
					$scope.endCheck = true;			//The current cells dosn't match the cell clicked
				}
				$scope.rowCheck = cellIndex.val()+$scope.offset;		//Current cell being checked
				$scope.offset+=(1-$scope.columns);					//Move to next cell in the line
				if((($scope.rowCheck)%$scope.columns == 0 || $scope.rowCheck < 0)
				&& $scope.offset < (1-$scope.columns)){	
					$scope.endCheck = true;			//The next cell is at the edge of the board
				}
				$scope.winCheck+=$scope.board[cellIndex.val()];			//Increment win check counter
			}			
			$scope.offset = 0;						//Reset cell offset counter
			$scope.endCheck = false;				//Prepare to start a new check
			$scope.rowCheck = 0;					//Return to the current cell clicked
			//Check neighbors from top right to bottom left
			while(!$scope.endCheck){				//While there are still cells that need checking
				if($scope.board[cellIndex.val()] != $scope.board[cellIndex.val()+$scope.offset]){
					$scope.endCheck = true;			//The current cells dosn't match the cell clicked
				}
				if($scope.offset){
					$scope.rowCheck = cellIndex.val()+$scope.offset;	//Current cell being checked
				}
				$scope.offset-=(1-$scope.columns);					//Move to next cell in the line
				if(($scope.rowCheck+1)%$scope.columns == 0 || $scope.rowCheck > $scope.board.length){
					$scope.endCheck = true;			//The next cell is at the edge of the board
				}
				$scope.winCheck+=$scope.board[cellIndex.val()];			//Increment win check counter
			}	
			$scope.offset = 0;						//Reset cell offset counter
			$scope.endCheck = false;				//Prepare to start a new check
			$scope.rowCheck = 0;					//Return to the current cell clicked
			if($scope.winCheck > $scope.winTarget+2){				//If player X occupies all cells
				$scope.winText = $scope.xTurnMessage+$scope.xWinMessage;//Player X wins
			}
			if($scope.winCheck < -1*$scope.winTarget-2){			//If player O occupies all cells
				$scope.winText = $scope.oTurnMessage+$scope.oWinMessage;//Player O wins
			}
			$scope.winCheck = 0;					//Reset win check counter to start a new check
			//Checks to see if any of the win conditions have beem met and ends the game if they are
			if($scope.winText == $scope.xTurnMessage+$scope.xWinMessage){	//If player X has won
				$scope.gameEnd = true;								//End the game
				$scope.winCountX++;									//Increment X win counter
			}else if($scope.winText == $scope.oTurnMessage+$scope.oWinMessage){//If player O has won
				$scope.gameEnd = true;								//End the game
				$scope.winCountO++;									//Increment X win counter
			}else{													//If no one has won yet
				$scope.count++;										//Continue to next turn
			}
		}
	});	
/*Functions*/	
	//Checks if new new column should be created on current cell
	$scope.setBoard = function(){
		select.remove();
	}
	//Checks if a new row should be started
	$scope.checkRow = function(){				//Needed to access the index of a cell
		return this.$index%$scope.columns;		//Returns true is the cell starts a new column
	}
	//Gets called when a cell is clicked
	$scope.selectBox = function(){
		select.set(this.$index);
	};
/*Program*/
	$scope.setBoard();												//Sets up a new board
});