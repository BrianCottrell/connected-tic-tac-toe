//Defined Variables
var turn = 0;									//Keeps track of whose turn it is
var originalColor = "";							//Stores original color
var selectedBoxes = [0,0,0,0,0,0,0,0,0];		//Indicates which tiles have been selected
selectedBoxes[Math.floor(Math.random()*9)] = 7;	//Randomly selects a mystery box for an extra turn
for(var i = 0; i < 9; i++){
    document.getElementsByClassName('box')[i].addEventListener('mouseover', changeColor);
    document.getElementsByClassName('box')[i].addEventListener('mouseout', changeBack);
    document.getElementsByClassName('box')[i].addEventListener('click', selectBox);
}
function changeColor(){
	if(selectedBoxes[(this.id)[1]] != 1 && selectedBoxes[(this.id)[1]] != -1){
		originalColor = this.style.backgroundColor;
		this.style.backgroundColor = "yellow";
	}
}
function changeBack(){
	if(selectedBoxes[(this.id)[1]] != 1 && selectedBoxes[(this.id)[1]] != -1){
		this.style.backgroundColor = originalColor;

	}
}
function selectBox(){
	if(selectedBoxes[(this.id)[1]] != 1 && selectedBoxes[(this.id)[1]] != -1){
		if(turn%2 == 0){
			this.style.backgroundColor = "purple";
			document.getElementById('demo').innerHTML = "Player 2";
			if(selectedBoxes[(this.id)[1]] == 7){
				document.getElementById('demo').innerHTML = "Player 1 Extra Turn";
				turn--;
			};
			selectedBoxes[(this.id)[1]] = 1;		
		}else{
			this.style.backgroundColor = "orange";
			document.getElementById('demo').innerHTML = "Player 1";
			if(selectedBoxes[(this.id)[1]] == 7){
				document.getElementById('demo').innerHTML = "Player 2 Extra Turn";
				turn--;
			};
			selectedBoxes[(this.id)[1]] = -1;
		}
		turn++;
		//Check if player 1 has won
		if(selectedBoxes[0]+selectedBoxes[1]+selectedBoxes[2] == 3 ||
		selectedBoxes[3]+selectedBoxes[4]+selectedBoxes[5] == 3 ||
		selectedBoxes[6]+selectedBoxes[7]+selectedBoxes[8] == 3 ||
		selectedBoxes[0]+selectedBoxes[3]+selectedBoxes[6] == 3 ||
		selectedBoxes[1]+selectedBoxes[4]+selectedBoxes[7] == 3 ||
		selectedBoxes[2]+selectedBoxes[5]+selectedBoxes[8] == 3 ||
		selectedBoxes[0]+selectedBoxes[4]+selectedBoxes[8] == 3 ||
		selectedBoxes[2]+selectedBoxes[4]+selectedBoxes[6] == 3){
			document.getElementById('demo').innerHTML = "Player 1 Wins!";
			selectedBoxes = [1,1,1,1,1,1,1,1,1];
		//Check if palyer 2 has won
		}else if(selectedBoxes[0]+selectedBoxes[1]+selectedBoxes[2] == -3 ||
		selectedBoxes[3]+selectedBoxes[4]+selectedBoxes[5] == -3 ||
		selectedBoxes[6]+selectedBoxes[7]+selectedBoxes[8] == -3 ||
		selectedBoxes[0]+selectedBoxes[3]+selectedBoxes[6] == -3 ||
		selectedBoxes[1]+selectedBoxes[4]+selectedBoxes[7] == -3 ||
		selectedBoxes[2]+selectedBoxes[5]+selectedBoxes[8] == -3 ||
		selectedBoxes[0]+selectedBoxes[4]+selectedBoxes[8] == -3 ||
		selectedBoxes[2]+selectedBoxes[4]+selectedBoxes[6] == -3){
			document.getElementById('demo').innerHTML = "Player 2 Wins!";
		}
		else if(selectedBoxes[0]*selectedBoxes[1]*selectedBoxes[2]*
		selectedBoxes[3]*selectedBoxes[4]*selectedBoxes[5]*
		selectedBoxes[6]*selectedBoxes[7]*selectedBoxes[8]){
			document.getElementById('demo').innerHTML = "Tie Game!";
		}
	}
}