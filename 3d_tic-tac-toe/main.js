/*Tic Tac Toe*/
/*VARIABLES*/
var rows = 9;						//Sets number of rows on drawing board
var columns = 3;					//Sets number of columns on drawing board
//var tables = 1;
var spacing = (20)/columns
var sideLength = (50)/columns-spacing;//Edge length of each box
var board = [];						//Create an array to store boxed
//var tableArray = [];
var originalColor = '#000000';		//Store a backround color to be temporarily changed
var selectedColor = '#882200';
var docFrag = document.createDocumentFragment();
board.length = rows*columns;	//Make box array large enough to fit the total number of boxes
//tableArray.length = tables;
/*FUNCTIONS*/
//Set up the game board with the specified number of rows and columns
function setBoard(){
	for(var i = 0; i < board.length; i++){
		board[i] = document.createElement('div');
		board[i].classList.add('box');
		board[i].style.padding = (sideLength/2+((i%rows-i%columns)/board.length)*3).toString()+'%';
		board[i].style.marginLeft = (spacing/2+((i%rows-i%columns)/board.length)*3).toString()+'%';
		board[i].style.marginTop = (((i%rows-i%columns)/board.length)*5-5).toString()+'%';

		if(i%columns == 0){
			board[i].classList.add('clearboth');
			board[i].style.marginLeft = (((i%9)/columns)*10).toString()+'%';
		}
		document.getElementsByClassName('outerdiv')[0].appendChild(board[i]);
		board[i].addEventListener('mouseover', addFocus, false);
		board[i].addEventListener('mouseleave', removeFocus, false);
	}
	document.getElementsByTagName('button')[0].addEventListener('click', changeColor, false);
}
/*
function setBoard(){
	for(var i = 0; i < board.length; i++){
		var tableIndex = (i-i%(rows*columns))/(rows*columns);
		if(i%(rows*columns) == 0){
			tableArray[tableIndex] = document.createElement('div');
			tableArray[tableIndex].classList.add('innerdiv')
			tableArray[tableIndex].style.marginTop = (-(tableIndex*2)).toString()+'%';
			tableArray[tableIndex].style.marginLeft = ((tableIndex*2)).toString()+'%';
		}
		board[i] = document.createElement('div');
		board[i].classList.add('box');
		board[i].style.padding = (sideLength).toString()+'%';
		board[i].style.margin = (spacing/2).toString()+'%';
		board[i].innerHTML = tableIndex.toString();
		if(i%columns == 0){
			board[i].classList.add('clearboth');
//			board[i].style.marginLeft = (((i%9)/columns)*10).toString()+'%';
		}
		board[i].style.marginTop = '0%';
		tableArray[(i-i%(rows*columns))/(rows*columns)].appendChild(board[i]);
		board[i].addEventListener('mouseover', addFocus, false);
		board[i].addEventListener('mouseleave', removeFocus, false);
	}
	for(var i = 0; i < tableArray.length; i++){
		document.getElementsByClassName('outerdiv')[0].appendChild(tableArray[i]);
	}
	document.getElementsByTagName('button')[0].addEventListener('click', changeColor, false);
}*/
//Change the color of a box to the specified color
function addFocus(){
	originalColor = this.style.backgroundColor;
	this.style.backgroundColor = selectedColor;
}
//Restore the original color
function removeFocus(){
	this.style.backgroundColor = originalColor;
}
//Update the color to value set by the user
function changeColor(){
	selectedColor = document.getElementsByTagName('input')[0].value;
}
/*PROGRAM*/
setBoard();