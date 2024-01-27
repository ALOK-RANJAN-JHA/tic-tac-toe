let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let draw=document.querySelector("#draw");
let turn0 = true;//player O player X

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]
let count=0;
const resetGame=()=>{
   turn0=true;
   enableBoxes();
   msgContainer.classList.add("hide");
   let mySound = new Audio('shooting-sound.mp3');
    mySound.play();
   count=0;
};
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "O";
            box.style.color="red";
            turn0 = false;

        }
        else {
            box.innerText = "X";
            box.style.color="green";
            turn0 = true;
        }

        let mySound = new Audio('shooting-sound.mp3');
        mySound.play();

        box.disabled = true;
        count++;
        let isWinner=checkWinner();
        if(count===9 &&!isWinner){
            gameDraw();
        }
        
    });
});

const checkWinner = () => {
        for(let pattern of winPatterns){
            let pos1Val=boxes[pattern[0]].innerText;
            let pos2Val=boxes[pattern[1]].innerText;
            let pos3Val=boxes[pattern[2]].innerText;

            if(pos1Val!="" &&pos2Val!="" &&pos3Val!=""){
                if(pos1Val===pos2Val && pos2Val===pos3Val){
                    showWinner(pos1Val);
                    return true;
                }
               
            }
            
        }
};

const showWinner=(winner)=>{
     msg.innerText=`Congratulation , Winner is ${winner}`;
     let mySound = new Audio('wining-sound.mp3');
     mySound.play();
     msgContainer.classList.remove("hide");
     disableBoxes();
};
const gameDraw=()=>{
     msg.innerText=`Match is Draw !`;
     let mySound = new Audio('wining-sound.mp3');
     mySound.play();
     msgContainer.classList.remove("hide");
     disableBoxes();
};

const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};
const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};

newBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);