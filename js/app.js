//TODO:Create Enemy Class
class Enemy {
    //constructor function describing enemy sprite
    constructor(xLocation,yLocation,enemyWidth,enemyHeight) {
        this.x = xLocation;
        this.y = yLocation;
        this.sprite = "images/enemy-bug.png";
        this.width = enemyWidth;
        this.height = enemyHeight;
        this.stepxSize = Math.floor(Math.random() * 150) + 50;
    }
    //function for bugs movement
      update(dt){
        const minX = 25,
            maxX = 490;
        if(this.x < maxX) //check right bound
            this.x += this.stepxSize * dt;
        else{
            this.x = -50;
            this.stepxSize = Math.floor(Math.random() * 150) + 50;
        }
        if (collisionDetection(this,player)) {
            player.x = 202;
            player.y = 404;
            scoreCard();
        }
    }
    //function for rendering bugs into the game
    render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);  
    }

}

//TODO: create a Player class
class Player {
    //constructor function describing player sprite
    constructor(x,y,playerWidth,playerHeight) {
        this.x = x;
        this.y = y;
        this.sprite = "images/char-boy.png";
        this.width = playerWidth;
        this.height = playerHeight;
        this.score = 0;
    }
    update() {
    if(this.y == -21) //send back to grass 
       {
        this.y = 404;
       }
    }
    //function for rendering player into the game
    render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);  
    }
    //valid inputs that can be used to control player(char)
    handleInput(key) {
        var minX = 55,
            maxX = 372,
            minY = 0,
            maxY = 404;
        console.log(this.x,this.y);
        //TODO: on arrow keys usage constant coordinates should be covered
        const stepxSize = 101;
        const stepySize = 85;
        if(key == "left" && this.x > minX) //check left bound
            this.x -= stepxSize;
        if(key == "right" && this.x < maxX) //check right bound
            this.x += stepxSize;
        if(key == "up" && this.y > minY)
            this.y -= stepySize;
        if(key == "down" && this.y < maxY)
            this.y += stepySize;
    }
}
//TODO: create a collectible Coin class
class Coin {
    //constructor function describing coin sprite
    constructor(spriteLocation,value)
    {
        this.sprite = spriteLocation;
        this.x = 202;
        this.y = 130;
        this.width = 60;
        this.height = 40;
        this.collected = false;
        this.value = value;
    }
    //TODO: collision of coins with players in order to take collectible
    update(dt)
    {
        if(collisionDetection(this,player) && !this.collected)
        {
            player.score += this.value;
            this.collected  = true;
            console.log(player.score);
            //reposition
            this.x = XP[Math.floor(Math.random() * (XP.length - 1)) + 0];
            this.y = YP[Math.floor(Math.random() * (YP.length - 1)) + 0];
            this.collected = false;
        }
    }
    //function to render coins into the game
    render()
    {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Instantiating objects.

//Enemy objects
const bug1 = new Enemy(-20,220,66,42);
    bug2 = new Enemy(-20,220,66,42),
    bug3 = new Enemy(-20,140,66,42),
    bug4 = new Enemy(-20,50,66,42),
    bug5 = new Enemy(-20,50,66,42);

//array of enemies....so called bugs
const allEnemies = [bug1,bug2,bug3,bug4,bug5];

//player(char)
let player = new Player(202,404,66,42); 

//modal 
const modal = document.querySelector("#simpleModal");

//TODO: create an array of possible coordinates where coins can spawn
const XP = [202,304,101,101,406,304],
      YP = [130,230,230,30,130,30];

//gem
const blueGem = new Coin("images/Gem-Blue.png",5);

//array of collectibles
let allCoin = [blueGem];

//TODO: create a collision function
function collisionDetection(object1,object2) {
    if (object1.x < object2.x + object2.width  && 
        object1.x + object1.width  > object2.x &&
        object1.y < object2.y + object2.height && 
        object1.y + object1.height > object2.y) 
    {
        return true;
    }
}

//TODO: scorecard function
function scoreCard() 
{
    if(player.score >= 125)
    {
        modal.classList.add("show");
        document.querySelector("#modalMsg").innerHTML = "💥Congrats! You won💥";
        document.querySelector("#modalMsg2").innerHTML = "Well done.You're a pro😉";    
        document.querySelector("#score").innerHTML = player.score;
    }
    else
    {
    modal.classList.add("show");
    document.querySelector("#modalMsg").innerHTML = "Game Over!"; 
    document.querySelector("#score").innerHTML = player.score;
    document.querySelector("#modalMsg2").innerHTML = "Surely you can do better than that?";    
    }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
