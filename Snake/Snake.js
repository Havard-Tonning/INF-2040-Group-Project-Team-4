var blockSize = 25; // Size of each square - Standard 25
var rows=18; // Number of rows and columns - Standard 18
var col=18; 
var board;
var context; // What is used to draw with
var halfBlock=(blockSize/2)// Used as radius for the food circles

// Snake head
var snakeX=blockSize*5; // Setting a starting x and y value. 
var snakeY=blockSize*5;

// Velocity - movement of the snake
var velocityX=0;
var velocityY=0;

// Food
var foodX;
var foodY;

var port1X; // The start of the portal
var port1Y;

var port2X; // Where it teleports to
var port2Y;

var powerup=0; // Counter for the number of powerups

var powerupX; // Location of powerups
var powerupY;

var colorCounter=0; // This counter and the following array is used to update the color of the snake each time it eats food

var snakeColor=["navajowhite", "wheat", "burlywood", "tan", "rosybrown", 
"sandybrown", "peru", "chocolate", "saddlebrown", "sienna", "brown", "maroon", "indianred", "firebrick", "lightcoral", "salmon", "darksalmon", "coral", "tomato", "orangered", "orange", "darkorange", "gold",
 "khaki", "palegoldenrod", "yellow", "yellowgreen", "darkkhaki", "olive", "olivedrab", "yellowgreen", "greenyellow", "chartreuse", "lawngreen", "lime", "limegreen", "palegreen", "lightgreen", "mediumspringgreen", 
 "springgreen", "mediumseagreen", "seagreen", "forestgreen", "green", "darkgreen", "mediumaquamarine", "aquamarine", "turquoise", "lightseagreen", "mediumturquoise", "darkturquoise", "paleturquoise", "aqua", "cyan",
  "lightcyan", "azure", "aliceblue", "powderblue", "lightskyblue", "skyblue", "deepskyblue", "dodgerblue", "cornflowerblue", "steelblue", "royalblue", "blue", "mediumblue", "darkblue", "navy", "midnightblue", 
  "rebeccapurple", "blueviolet", "indigo", "darkslateblue", "slateblue", "mediumslateblue", "purple", "mediumorchid", "orchid", "violet", "plum", "thistle", "lavender", "ghostwhite", "whitesmoke", "cyan"];

// Homemade sound effects for eating, teleporting, dying and getting a powerup 
let eatSound = new Audio('Sounds/chomp.mp3')
let teleportSound = new Audio("Sounds/woosh.mp3")
let deathSound = new Audio("Sounds/aah.mp3")
let yaySound = new Audio('Sounds/yay.mp3')


var snakeBody=[]; // Simmilarly to the head, it stores coordinates, but since there will be multiple body segments, it's an array

var gameOver=false; 

var gameModeEasy=true; // Toggles if walls count as collisions or teleports to other end. 
var gameModePortal=true; // Toggle to enter/exit portal mode 
var gameModePortalDeluxe=false; // Toggle to enter extra portal mode where every time the snake eats something, it teleports. Toggled with key "1"


window.onload = function () {
board = document.getElementById("board"); // The function refrences the canvas tag with id board in the HTML so that the board now has the canvas tag
board.height = rows*blockSize; // The height and width will scale with the number of rows
board.width = col*blockSize;
context = board.getContext("2d"); // Used for drawing on the board

placeFood(); 


document.addEventListener("keyup", changeDirection); // For getting the keyboard input 
}

function fillCricle(x, y, radius, color) // The function used to make the food round
{
context.fillStyle = color;
context.beginPath();
context.arc(x+halfBlock, y+halfBlock, radius, 0, 2 * Math.PI);
context.fill();
}

setInterval(update, 100); // Updates every 100 ms or 10 times a second


if (gameModePortal){ // If portal is on, it regenerates the portal once a second
setInterval(placePortal1, 1000)
setInterval(placePortal2, 1000)
}

setInterval(placePowerup,1000) 


function update() {
    if (gameOver){
        return;
    }

context.fillStyle="black"; // Changes the color of the board to black
context.fillRect(0,0, board.width, board.height);


fillCricle(foodX,foodY, halfBlock, "Pink"); // Uses the function to place the round food 
fillCricle(port1X,port1Y,halfBlock, "Orange") // Makes round portals
fillCricle(port2X,port2Y, halfBlock, "Blue")

var colorPowerup; // This is used to color the powerup black. Since the powerup is only possible to get at certain intervals, it is placed at coordinates 2,2 when not 
//gettable (since the snake will always be at a multiple of blocksize) and colored black.

if (powerupX+powerupY==4)
{colorPowerup="Black"}

else 
{colorPowerup="Red"}

fillCricle(powerupX,powerupY,halfBlock,colorPowerup)


if (snakeX==foodX && snakeY==foodY){ // If snake and food is at the same location 
    snakeBody.push([foodX, foodY]); // Pushes the overlapping position in the array so the snake grows by one
placeFood(); // Places new food, plays sound and changes color
eatSound.play()
colorCounter++;

if (gameModePortalDeluxe) // If in extra portal mode, it is also teleported
{snakeX = port2X;
snakeY = port2Y}
}

if (velocityX + velocityY!=0){ // If the snake is moving, it moves all the elements of the array to that direction
for (let i = snakeBody.length-1; i>0; i--){
    snakeBody[i]=snakeBody[i-1]
}
if (snakeBody.length) {
snakeBody[0]=[snakeX,snakeY]
}
}


context.fillStyle=snakeColor[colorCounter]; // Changes the color of the snake
snakeX+= velocityX*blockSize; // Updates snakes head coordinates
snakeY+= velocityY*blockSize;
context.fillRect(snakeX, snakeY, blockSize, blockSize) // The rectangle that gets filled, is at snake coordinates, and is the size of one block 
for (let i = 0; i < snakeBody.length; i++)
    context.fillRect(snakeBody[i][0], snakeBody[i][1],blockSize,blockSize);

var score=snakeBody.length;


if (gameModeEasy!=true) // If not in easy mode, the game is over if you hit the wall
{
    if ((snakeX<0 || snakeX>col*blockSize || snakeY<0 || snakeY>rows*blockSize) && powerup!=0)
    {deathSound.play(); 
    gameOver=false;
    snakeX=0;
    snakeY=0;
    velocityX=0;
    velocityY=0;
    powerup--;
    alert ("You hit the wall, but since you have a powerup, you will respawn!")}

    else if ((snakeX<0 || snakeX>col*blockSize || snakeY<0 || snakeY>rows*blockSize) && powerup==0){
    deathSound.play();
    gameOver=true;
    alert("Game over!" + "\n" +"Your score is: " + score)
}
}

else if (gameModeEasy=true) // If in easy mode, the snake teleports to the other end of the board
{
if (snakeX<0)
{
snakeX=col*blockSize;
}

else if (snakeX>col*blockSize)
{
snakeX=0
}

else if (snakeY<0)
{
snakeY=rows*blockSize
}

else if (snakeY>rows*blockSize)
{
snakeY=0    
}
}


for (let i = 0; i<snakeBody.length; i++) // If the snake hits itself, it will be game over unless you have a powerup
{
    if(snakeX==snakeBody[i][0] && snakeY==snakeBody[i][1]){
       
       if (powerup==0){
        deathSound.play()
        gameOver=true;
        alert("Game over!" + "\n" +"Your score is: " + score)
       }
        
        else if (powerup>0)
        {
            gameOver=false;
            snakeX=0;
            snakeY=0;
            velocityX=0;
            velocityY=0;
            powerup--;
            alert ("You hit yourself, but since you have a powerup, you will respawn!")
        }
    }
}

// Teleports when snake is at portal
if (snakeX==port1X && snakeY==port1Y){ 
    snakeX=port2X;
    snakeY=port2Y;
    teleportSound.play();
}

// Gives powerup
if (powerupX==snakeX && powerupY==snakeY)
    {
        powerupX=2;
        powerupY=2;
        powerup++;
        yaySound.play()
    }
}

// For placing powerup, but making it be on screen for shorter than the time it is gone
  async function placePowerup() {
    if (powerupX+powerupY!=4) {
    powerupX=2;
    powerupY=2;
      // Code that executes immediately
    } 
    
    else if (powerupX+powerupY==4 && powerup==0) {  
    await new Promise(resolve => setTimeout(resolve, 10000));
    powerupX=Math.floor(Math.random()*rows)*blockSize;
    powerupY=Math.floor(Math.random()*col)*blockSize; // Code that executes after a 10 second delay
    }
  }


// Functions for placing items at random positions
function placeFood(){
foodX=Math.floor(Math.random()*rows)*blockSize;
foodY=Math.floor(Math.random()*col)*blockSize;
}

function placePortal1(){
port1X=Math.floor(Math.random()*rows)*blockSize;
port1Y=Math.floor(Math.random()*col)*blockSize;
}

function placePortal2(){
port2X=Math.floor(Math.random()*col)*blockSize;
port2Y=Math.floor(Math.random()*col)*blockSize;
}

// When the snake is outside the gameboard
var outOfBounds;
if (snakeX<=0 || snakeX >= col*blockSize || snakeY <= 0 || snakeY >= rows*blockSize){
    outOfBounds = true;
}
else 
{
    outOfBounds=false;
}


function changeDirection(e){ // Passing an event to the function
if (e.code=="ArrowUp" && velocityY!=1 && outOfBounds!=true){ // The && checkes that this movement would not be the snake backing up on itself and that it is not moving while outside the board
velocityX=0;
velocityY=-1;
}

else if (e.code=="ArrowDown" && velocityY!=-1 && outOfBounds!=true) 
{
velocityX=0;
velocityY=1;
}

else if (e.code=="ArrowLeft" && velocityX!=1 && outOfBounds!=true){
velocityX=-1;
velocityY=0;
}

else if (e.code=="ArrowRight" && velocityX!=-1 && outOfBounds!=true){
velocityX=1;
velocityY=0;
}


// Developer mode with half speed of snake
if (e.code=="KeyW" && (velocityY!=1 || velocityY!=0.5) && outOfBounds!=true){
velocityX=0;
velocityY=-0.5;
}

else if (e.code=="KeyS" && (velocityY!=-1 || velocityY!=-0.5)&& outOfBounds!=true) 
{
velocityX=0;
velocityY=0.5;
}

else if (e.code=="KeyA" && (velocityX!=1 || velocityX!=0.5)&& outOfBounds!=true){
velocityX=-0.5;
velocityY=0;
}

else if (e.code=="KeyD" && (velocityX!=-1 || velocityX!=-0.5)&& outOfBounds!=true){
velocityX=0.5;
velocityY=0;
}

else if (e.code=="Digit1"){ // Toggle portal mode
gameModePortalDeluxe=true;
}

else if (e.code=="Digit2"){ 
gameModePortalDeluxe=false;
}

else if (e.code=="Space") // Pauses using space
{
    velocityX=0;
    velocityY=0;
}

else if (e.code=="KeyM") // Toggles hard mode
{
    if (gameModeEasy==true)
    {
        gameModeEasy=false
    }
    else
    {
        gameModeEasy=true;
    }
}

else if (e.code=="KeyP") // Gives extra powerups
{
    powerup++
}

else if (e.code=="KeyR") // R to reload page
{
    location.reload()
}

}