/** <Description> Template. </Description> */

// The Starting State of the Game
var gameState = "Intro";

var tileSize = 10;

var bgDefault = color(166, 166, 255); // Default background color


var bitmap = [
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,0,,0],
[0,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,0,0,0],
[0,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,0,0],
[0,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,0,0],
[0,0,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,0],
[0,0,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,0],
[0,0,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,0],
[0,0,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,0,0],
[0,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,0,0],
[0,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,0,0],
[0,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,0,0],
[0,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,0,0],
[0,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,0],
[0,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,16777215,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

var drawMap = function(grid,x,y){
noStroke();
    // Draw Tile Map using Nested For Loops
    for (var row = 0; row < 16; row++){ 
        for (var col = 0; col < 16; col++){
// Grab Tile color from 2 Dimensional "grid" Array
        fill(grid[col][row]);
    // Draw Tiles
        rect(row*tileSize+x, col*tileSize+y, tileSize, tileSize);
        } 
    }
};


var selectColor = 0; // For storing Color Picker Colors

// Graphics Buffer to store Color Picker Image
var colorPicker = {
    img: createGraphics(256,272, JAVA2D)
};

var showPicker = false;

var locked = false;

mouseReleased = function(){
    locked = false;
};

try{
    colorPicker.img.colorMode(HSB);
colorPicker.img.noStroke();

// Generate Simulated 8 Bit Color Pallette
for(var j = 0;j < 248;j += 32){
   for(var i = 0; i < 248;i += 16){
    colorPicker.img.fill(i, j, 255);
    colorPicker.img.rect(i,j/2,16,16);
    } 
}
for(var j = 0;j<248;j+=32){
   for(var i = 0; i < 248;i+=16){
    colorPicker.img.fill(i, 255, j);
    colorPicker.img.rect(i,240+(-j/2),16,16);
    }
}
for(var l = 0; l < 248;l += 16){
    colorPicker.img.fill(0, 0, l);
    colorPicker.img.rect(l,256,16,16);
}
}catch(e) {println(e);}



keyPressed = 0;

// Declare Variables used by drawButton Function
var overButton;
var buttonHeight = 22;
var buttonPressed = false; // The button has not been pressed.

var buttonColor = color(180, 180, 180);
var rolloverColor = color(220, 220, 220);
var buttonFill = buttonColor;

// Create a reusable Button function
var drawButton = function(buttonText, x, y, length, color){
overButton = false; // Mouse over state
    
    // Set fill color to normal
    buttonFill = buttonColor;

    fill(0, 0, 0, 100); // Drop Shadow using Alpha
    noStroke(); // No border around button Shadow
    rect(x - 2, y + 2, length, buttonHeight + 1, 3);

// Detect if Mouse is over Button
if(mouseX >= x && mouseX <= x + length && mouseY >= y && mouseY <= y + buttonHeight){
    // Set fill color to Rollover color
    buttonFill = rolloverColor;
    overButton = true;

    if(mouseIsPressed){
        x -= 2; // Move Button 2 Pixels if Pressed
        y += 2;
    }
}
    strokeWeight(2);
    // Button Outline Color
    stroke(100, 0, 150);
    // Button fill color
    fill(buttonFill);
    rect(x, y, length, buttonHeight, 2);

    textAlign(CENTER, CENTER);
    fill(0);
    textSize(12);
    text(buttonText, x + length / 2, y + buttonHeight / 2);
};



// Causes Drawing "Brush" Square to Snap to Grid
var snapToGrid = function(mouseCoord){ 
    return (floor(mouseCoord/tileSize)*tileSize);
};

draw = function(){
background(bgDefault); // Set Default Background color

// What is drawn is determined by the Variable gameState
switch(gameState){ 

/* X-X-X-X-X-X-X-  THE GAME STARTS HERE  -X-X-X-X-X-X-X */
case "Intro": // In case gameState = "Intro"

// Begin Splash Screen of Game here
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(0);
    text("Game Editor", 200, 80);
    text("by DillingerLee", 200, 320);
    
    // Draw Cheezy Splash Screen Graphics
    noStroke();
    fill(255);
    ellipse(200,183,20,20); // round thingy
    rect(100, 120, 12, 80); // square thingys
    rect(300, 160, 12, 80);

// Draw Button 'yourName' at whatever Position you like
    drawButton("Start", 340, 368, 50, 50);
    if(overButton && mouseIsPressed && !buttonPressed){
        gameState = 1; // Set which page to go to here
        buttonPressed = true;
    }
break; // End of Case Statement

case 1: 
textSize(18);
fill(255);
text("To begin we will draw our player.\n\nThe image will be 16 X 16 pixels.", 200, 80);
text("Click the grid to select the background color.", 200, 340);

stroke(0);
strokeWeight(1);
fill(255);

for (var x = 0; x < 16; x++){ 
    for (var y = 0; y < 16; y++){
        rect(x*tileSize + 120, y*tileSize + 140, tileSize, tileSize);
    } 
}
if(mouseIsPressed && mouseX > 120 && mouseX < 280 && mouseY > 140 && mouseY < 300){
    showPicker = true;
    gameState += 1;
}
break;

case 2: 
// Level 2 
fill(255);
text("Select colors from the color picker\nand begin drawing your player.", 200, 30);

drawMap(bitmap, 120, 80); // Take it for a test drive

if(mouseX > 120 && mouseX < 280 && mouseY > 80 && mouseY < 240){
    noFill();
    stroke(selectColor);
    rect(snapToGrid(mouseX),snapToGrid(mouseY), tileSize, tileSize);
    if(mouseIsPressed && !showPicker && !locked){
        bitmap[snapToGrid(mouseY)/10-8][snapToGrid(mouseX)/10-12] = selectColor;
    }
}
fill(selectColor);
rect(170,280,60,60);
if(mouseX > 170 && mouseY > 280 && mouseX < 230 && mouseY < 340){
    if(mouseIsPressed){
        showPicker = true;
    }
}
break;


default: 
background(0, 0, 0);
textSize(48);
text("Game Over",200,200);
break;
}

if(showPicker){
    background(255);
    image(colorPicker.img, 0, 0);
    stroke(0);
    selectColor = get(mouseX,mouseY);
    fill(selectColor);
    rect(300, 100 ,60, 60);
    if(!locked && mouseIsPressed){
        locked = true;
        showPicker = false;
    }
}

};

/* Tutorials in plain English by Dillinger © 2014 
All code is owned by its respective author 
and made available under an MIT license:
http://opensource.org/licenses/mit-license.php */