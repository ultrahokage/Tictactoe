window.onload = function () {


const cells = document.querySelectorAll('.cell');


let player = 'O';
let steps = [];
let stepsRedo = [];
let stepForUndo;
let stepForRedo;
let needcell = 0;


    let kk;


 const restart = document.querySelector('.restart-btn');
//const btn2 = document.querySelector('.redo-btn');
const undo = document.querySelector('.undo-btn');
const redo = document.querySelector('.redo-btn');


function redoTurn() {
	if(stepsRedo.length < 1){
             redo.disabled = true;
         }
		 else {
			 redo.disabled = false;
		 }
}
function undoCheck(){
	    if(steps.length >= 1){
            undo.disabled = false;
        }
        else {
			undo.disabled = true;
		}
}

function playerSelect() {
	if(player === 'X'){
            console.log('NOLIK');
            kk = JSON.stringify(needcell + ' O');
            cells[needcell].classList.add('r');
            player = 'O';
            
        }
        else {
            console.log('KPESTIK');
            kk = JSON.stringify(needcell + ' X');
            cells[needcell].classList.add('ch');
            player = 'X';   
        }
}
function clearCell() {
	if(player === 'X'){
            console.log(stepsRedo);    
            kk = JSON.stringify(needcell + ' X');                        
            player = 'O';       
            }
        else{
             kk = JSON.stringify(needcell + ' O');      
            player = 'X';
        }
		console.log(stepsRedo);  
		cells[needcell].className = 'cell';
}
    const wonTitle = document.querySelector('.won-title');
    const wonMessage = document.querySelector('.won-message');
    function winner(a,b,c ) {

        if(cells[a].classList.contains('ch') && cells[b].classList.contains('ch') && cells[c].classList.contains('ch')){

            wonTitle.classList.remove('hidden');
            wonMessage.textContent = 'Crosses won!';

        }
        if(cells[a].classList.contains('r') && cells[b].classList.contains('r') && cells[c].classList.contains('r')){
            wonTitle.classList.remove('hidden');
            wonMessage.textContent = 'Toes won!';
            return;
        }
         if(steps.length === 9 && (wonTitle.classList.contains('hidden'))){
            wonTitle.classList.remove('hidden');
            wonMessage.textContent = "It's a draw!"
        }
    }

    let rows = function rowsCheck() {
        let a = 0, b = 1, c = 2;
        while (c < cells.length) {

            if (winner(a, b, c )) {
            return ;
            }
            a += 3;
            b += 3;
            c += 3;
        }
    };
    let col = function columnCheck() {
        let a = 0, b = 3, c = 6;
        while (c < cells.length) {
            if (winner(a, b, c)) {
                return;
            }
            a += 1;
            b += 1;
            c += 1;
        }
    };
    let diag = function diagonalCheck() {
        let a = 0, b = 4, c = 8;
        if (winner(a, b, c)) {
            return;
        }
        /* check diagonal left */
        a = 2; b = 4; c = 6;
        if (winner(a, b, c)) {
            return 8;
        }
    };
    function checkWin() {

        /* check rows */
        rows();
        col();
        /* check columns */

        /* check diagonal right */
        diag();

    }
        /* if there's no winner but the board is full, ask the user if they want to start a new game */


    for(let i = 0; i < cells.length; i++) {

    cells[i].addEventListener('click', fieldClick => {

		needcell = i;
        playerSelect(needcell);
		stepsRedo = [];
		 steps.push(kk);
        checkWin();
		 redoTurn();
        console.log(steps);
		console.log(stepsRedo + 'redoSteps');
        console.log('deleted');
        undoCheck();
        });
    }
    
    
    undo.addEventListener('click', btnUndo => {
       
       stepForUndo = steps.join('').replace(/\D/g, '');
       console.log(stepForUndo + 'DA DA');
       for(let i = 0; i < stepForUndo.length; i++){
           needcell = stepForUndo[i];
           console.log(needcell + 'eto ya4eika');
       }

         console.log('proverka');      
        clearCell();	
        stepsRedo.push(kk);
        steps.pop(kk);
		console.log(steps);
		redoTurn();
		undoCheck();
        wonTitle.classList.add('hidden');
       });
        
        redo.addEventListener('click', redoBtn => {
          
      stepForRedo = stepsRedo.join('').replace(/\D/g, '');
      console.log(stepForRedo + 'NENE');
      for(let i = 0; i < stepForRedo.length; i++){
          needcell = stepForRedo[i];
          console.log(needcell);
      }              
        playerSelect();
		steps.push(kk);
        console.log(stepsRedo);     
        stepsRedo.pop(kk);	
        redoTurn();
		undoCheck();
            checkWin()
        });
        restart.addEventListener('click' , (e) => {
            steps = [];
            playerSelect();
            for(let i = 0; i < cells.length; i++){
                cells[i].className = 'cell';
            }
            undoCheck();
            wonTitle.classList.add('hidden');

        })
        
};