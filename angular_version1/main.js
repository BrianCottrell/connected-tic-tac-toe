/* Angular Javascript Tic Tac Toe */
var app = angular.module('TTTApp', []);			//Create an angular javascript module
app.controller('TTTController', ["$scope", function($scope){//Add an angular javascript controller
/*Variables*/	
	$scope.boardRows = 3;						//Number of rows on game board
	$scope.columns = 3;							//Number of columns on game board
	$scope.switchRows = 0;						//Stores row count when switching rows and columns
	$scope.winCountX = 0;						//Indicates how many times x has won
	$scope.winCountO = 0;						//Indicates how many times o has won
	$scope.xWinMessage = 'X Wins!';				//Message displayed when X wins
	$scope.oWinMessage = 'O Wins!';				//Message displayed when O wins
	$scope.xTurnMessage = 'Player 1';			//Message displayed on X's turn
	$scope.oTurnMessage = 'Player 2';			//Message displayed on O's turn
	$scope.gameEnd = false;						//Indicates when a game has ended
/*Functions*/	
	//Checks if new new column should be created on current cell
	$scope.setBoard = function(){
		$scope.count = 0;						//Counts how many turns have passed
		$scope.board = [];						//Create a game board
		$scope.winText = $scope.xTurnMessage;	//X goes first
		$scope.winCheck = 0;					//Used for checking if a win condition has been met
		$scope.gameEnd = false;					//A new game has started
		if($scope.boardRows > $scope.columns){	//This ensures non-square boards display horizontally
			$scope.switchRows = $scope.boardRows;
			$scope.boardRows = $scope.columns;
			$scope.columns = $scope.switchRows;
		}
		$scope.sideLength = 40/$scope.columns+'%';
		$scope.spacing = 10/$scope.columns+'%';
		$scope.board.length = $scope.columns*$scope.boardRows;//Give board a correct number of cells
	}
	//Checks if a new row should be started
	$scope.checkRow = function(){				//Needed to access the index of a cell
		return this.$index%$scope.columns;		//Returns true is the cell starts a new column
	}
	//Gets called when a cell is clicked
	$scope.selectBox = function(){
		if(!$scope.board[this.$index] && !$scope.gameEnd){			//If the cell has not been clicked
			$scope.board[this.$index] = 1-(2*($scope.count%2));		//Find out whose turn it was
			$scope.winText = $scope.xTurnMessage;					//Player X's turn
			if($scope.board[this.$index] == 1){						//If its player O's turn
				$scope.winText = $scope.oTurnMessage;				//Player O's turn
			}			
			//Checks for a win condition across each row
			for(var i = 0; i < $scope.boardRows; i++){				
				for(var j = i*$scope.columns; j < (i*$scope.columns)+$scope.columns; j++){
					if($scope.board[j]){
						$scope.winCheck+=$scope.board[j];			//Check each cell in a row
						if($scope.winCheck >= $scope.columns){		//If player X occupies all cells
							$scope.winText = $scope.xWinMessage;	//Player X wins
						}
						if($scope.winCheck <= -1*($scope.columns)){	//If player O occupies all cells
							$scope.winText = $scope.oWinMessage;	//Player O wins
						}
					}
				}
				$scope.winCheck = 0;								//Reset win check
			}
			//Checks for a win condition across each column
			for(var i = 0; i < $scope.columns; i++){
				for(var j = i; j < $scope.columns*$scope.boardRows; j+=(1*$scope.columns)){
					if($scope.board[j]){
						$scope.winCheck+=$scope.board[j];			//Check each cell in a column
						if($scope.winCheck >= $scope.boardRows){	//If player X occupies all cells
							$scope.winText = $scope.xWinMessage;	//Player X wins
						}
						if($scope.winCheck <= -1*($scope.boardRows)){	//If player O occupies all cells
							$scope.winText = $scope.oWinMessage;	//Player O wins
						}
					}
				}
				$scope.winCheck = 0;								//Reset win check
			}
/*			//Checks for a win condition across a forward diagonals
			for(var i = 0; i < $scope.boardRows; i++){
				for(var j = i; j < $scope.columns*$scope.boardRows; j+=(1*$scope.columns)+1){
					if($scope.board[j]){
						$scope.winCheck+=$scope.board[j];			//Check each cell in a diagonal
						if($scope.winCheck >= $scope.boardRows){	//If player X occupies all cells
							$scope.winText = $scope.xWinMessage;	//Player X wins
						}
						if($scope.winCheck <= -1*($scope.boardRows)){	//If player O occupies all cells
							$scope.winText = $scope.oWinMessage;	//Player O wins
						}
					}
				}
				$scope.winCheck = 0;								//Reset win check
			}
			//Checks for a win condition across a reverse diagonals
			for(var i = $scope.columns-1; i >= $scope.boardRows-1; i--){
				for(var j = i; j < $scope.columns*$scope.boardRows; j+=(1*$scope.columns)-1){
					if($scope.board[j]){
						$scope.winCheck+=$scope.board[j];			//Check each cell in a diagonal
						if($scope.winCheck >= $scope.boardRows){	//If player X occupies all cells
							$scope.winText = $scope.xWinMessage;	//Player X wins
						}
						if($scope.winCheck <= -1*($scope.boardRows)){//If player O occupies all cells
							$scope.winText = $scope.oWinMessage;	//Player O wins
						}
					}
				}
				$scope.winCheck = 0;								//Reset win check
			}
*/			if($scope.winText == $scope.xWinMessage){				//If player X has won
				$scope.gameEnd = true;								//End the game
				$scope.winCountX++;									//Increment X win counter
			}else if($scope.winText == $scope.oWinMessage){			//If player O has won
				$scope.gameEnd = true;								//End the game
				$scope.winCountO++;									//Increment X win counter
			}else{													//If no one has won yet
				$scope.count++;										//Continue to next turn
			}
		}
	};
/*Program*/
	$scope.setBoard();												//Sets up a new board	
}]);