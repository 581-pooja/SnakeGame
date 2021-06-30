// Game Constants & variables
let inputDir = {x: 0, y: 0};
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3')
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [
    {x: 10, y: 10}
];
food = {x: 12 , y: 12};
let score = 0;

// Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    // If you bumped into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y  ){
            return true;
        }
    } 
    // If You bumped into the wall
        if(snake[0].x >= 18 || snake[0].x<=0  || snake[0].y >= 18 || snake[0].y<=0  ){
            return true;
        }
}

function gameEngine(){
    // Part1: Updating the snake array & food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over. Press any Key to play again!");
        snakeArr = [{x:13, y:15}];
        musicSound.play();
        score = 0;
    }

    // If you have eaten the food ,increment the food and regenerate the food 
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore" ,JSON.stringify(hiscoreval) );
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        } 

        scoreBox.innerHTML = "Score: " + score;

        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y:snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a+ (b-a)* Math.random()), y: Math.round(a+ (b-a)* Math.random())}
    }

    // Moving the snake
    // i = 12 -2 ;  i = 11 >= 0
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    
    // Part2: Display the Snake 
    board.innerHTML = "";
    snakeArr.forEach((e, index) =>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            // console.log(snakeArr[0])
            snakeElement.classList.add('head')
        }else{
            // console.log(snakeArr[0])s
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });


    // Part3: Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}


// Main logic Starts here
moveSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Hi Score: " + hiscoreval;

}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDir = {x:0, y:1}   //Start the game
    moveSound.play();       //e event is jo fire hua hai 
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            console.log(snakeArr[0])
            inputDir.x = 0;
            inputDir.y = -1;
            console.log(snakeArr[0])
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            console.log(snakeArr[0])
            inputDir.x = 0;
            inputDir.y = 1;
            console.log(snakeArr[0])

            break;
        
        case "ArrowLeft":
            console.log("ArrowLeft");
            console.log(snakeArr[0])
            inputDir.x = -1;
            inputDir.y = 0;
            console.log(snakeArr[0])
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            console.log(snakeArr[0])
            inputDir.x = 1;
            inputDir.y = 0;
            console.log(snakeArr[0])
            break;
    
        default:
            break;
    }
});

// InputDir is basically velocity with which snake moves 