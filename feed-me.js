//It's mee Felicia Eureka Bunaren :)
//I really like making this code :D

const canvas = document.querySelector("canvas");
const canvasArea = {
    width : 640,
    height : 360
}
const ctx = canvas.getContext("2d");
var x, y;
var canvasScale = {
    width : canvasArea.width / canvas.clientWidth,
    height : canvasArea.height / canvas.clientHeight
}
var hamster = {
    x : 290,
    y : 240,
    width : 80,
    height : 80,
    v : 0,
    direction : 0, //Left
    img : "img/hams1.png"
}
var foodSealed = {
    x : null,
    y : null
}
var imgHamsElement = document.createElement("img");
imgHamsElement.src = hamster.img;

var foodArray = [];

function drawBackground(){
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0,0,canvasArea.width,canvasArea.height);
    ctx.fillStyle = "green";
    ctx.fillRect(0, canvasArea.height - 40, canvasArea.width, 40);
    ctx.fillStyle = "black";
    ctx.fillText("This is Created by Felicia Eureka Bunaren :), Click to feed", 80, 20);
}

function addFood(){
    if(y > canvasArea.height - 40){
        return;
    }
    var tmp = {
        x : parseInt(x),
        y : y,
        v : 0
    }
    foodArray.push(tmp);
    if(foodArray.length > 10){
        eraseFood(0);
    }
}

function updateFood(){
    ctx.fillStyle = "brown";
    if(foodSealed.x != null){
        ctx.beginPath();
        ctx.arc(foodSealed.x,foodSealed.y,10,0,2*Math.PI);
        ctx.fill();
        ctx.stroke();
    }
    for(var i = foodArray.length - 1; i >= 0; i--){
        ctx.beginPath();
        ctx.arc(foodArray[i].x,foodArray[i].y,10,0,2*Math.PI);
        ctx.fill();
        ctx.stroke();
        if(foodArray[i].y < canvasArea.height - 50 && foodArray[i].y + foodArray[i].v < canvasArea.height - 50){
            foodArray[i].y += foodArray[i].v;
            foodArray[i].v += 2;
        }else{
            foodArray[i].y = canvasArea.height - 50;
        }
    }
}

function updateHamster(){
    ctx.drawImage(imgHamsElement, hamster.x, hamster.y);
}

function getNearestFood(x = 999999, n=11){
    if(foodSealed.x == null){
        for(var i = foodArray.length - 1; i >= 0; i--){
            if(foodArray[i].y >= 310 && Math.abs(hamster.x-foodArray[i].x) < x){
                x = Math.abs(hamster.x - foodArray[i].x);
                n = i;
            }
        }
        if(x < 641 && n < 11){
            foodSealed.x = foodArray[n].x;
            foodSealed.y = foodArray[n].y;
            eraseFood(n);
        }
    }
}

var foodDelay = 10;
var animateHamsImg = 4;

function animationWalking(){
    if(hamster.direction == 1){
        animateHamsImg++;
        animateHamsImg = animateHamsImg%3 + 1;
    }else{
        animateHamsImg--;
        animateHamsImg = animateHamsImg%3 + 5;
    }
    hamster.img = "img/hams"+ animateHamsImg.toString() + ".png";
    imgHamsElement.src = hamster.img;
}

function animationStand(){
    animateHamsImg = 4;
    hamster.img = "img/hams4.png";
    imgHamsElement.src = hamster.img;
}

function moveToFood(){
    if(foodSealed.x != null){
        if(foodSealed.x <= hamster.x + hamster.width/2 && foodSealed.x >= hamster.x){
            animationStand();
            hamster.v = 0;
            foodSealed.x = hamster.x + hamster.width/2;
            if(foodDelay == 0){
                eatFood();
                foodDelay = 10;
                if(hamster.direction == 1){
                    hamster.img = "img/hams1.png";
                }else{
                    hamster.img = "img/hams5.png";
                }
                imgHamsElement.src = hamster.img;
                return;
            }else{
                foodSealed.y -= 5;
                foodDelay--;
            }
        }
        if(hamster.x + hamster.width/2 < foodSealed.x){
            hamster.direction = 1;
            animationWalking();
            if(hamster.x + hamster.width/2 + hamster.v < foodSealed.x){
                hamster.v += 2;
                hamster.x += hamster.v;
            }else if(hamster.x + hamster.width/2 + hamster.v > foodSealed.x){
                hamster.v -= 2;
                hamster.x += hamster.v;
            }else{
                hamster.v = 0;
            }
        }else if(hamster.x > foodSealed.x){
            hamster.direction = 0;
            animationWalking();
            if(hamster.x + hamster.v < foodSealed.x){
                hamster.v += 2;
                hamster.x += hamster.v;
            }else if(hamster.x + hamster.width/2 + hamster.v > foodSealed.x){
                hamster.v -= 2;
                hamster.x += hamster.v;
            }else{
                hamster.v = 0;
            }
        }
    }
    return;
}

function eatFood(){
    foodSealed.x = null;
    foodSealed.y = null;
}

function eraseFood(i){
    foodArray.splice(i,1);
}

//loop

function loopCanvas(){
    setTimeout(function(){
        requestAnimationFrame(loopCanvas);
        drawScene();
    }, 1000/15);
}

function drawScene(){
    getNearestFood();
    ctx.clearRect(0,0,canvasArea.width,canvasArea.height);
    drawBackground();
    updateHamster();
    updateFood();
    moveToFood();
}

//Add eventlistener

window.addEventListener("resize", function(){
    sticky = document.querySelector("nav").offsetTop + document.querySelector("nav").offsetHeight;
    headPage = document.querySelector("header");
    headPageHeight = headPage.offsetHeight;
},false);

canvas.addEventListener("mousemove", function(e){
    var can = canvas.getBoundingClientRect();
    x = (e.clientX - can.left) * canvasScale.width;
    y = (e.clientY - can.top) * canvasScale.height;
}, false);

canvas.addEventListener("click", addFood, false);

window.addEventListener("resize", function(){
    canvasScale = {
        width : canvasArea.width / canvas.clientWidth,
        height : canvasArea.height / canvas.clientHeight
    }
},false);

loopCanvas();