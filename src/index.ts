
/// <reference path="Ball.ts" />
/// <reference path="BallHolder.ts" />
/// <reference path="Bear.ts" />
/// <reference path="Goal.ts" />
/// <reference path="Gate.ts" />
/// <reference path="Queen.ts" />
/// <reference path="Side.ts" />
/// <reference path="Snail.ts" />
/// <reference path="utils.ts" />

var walls;
var platforms;
var ballHolders: Array<BallHolder> = [];
var balls: Array<Ball> = [];
var snail: Snail;
var gates: Array<Gate> = [];
let bears: Array<Bear> = [];
let queens: Array<Queen> = [];

function getElement(className: string, style: string, id: string = ""): HTMLElement {
    let d = document.createElement("div");
    d.className = className;
    d.setAttribute("style", style);
    if (id) {
        d.id = id;
    }
    return d;
}

function newGame() {
    while (balls.length) {
        balls.pop().destroy();
    }
    while (gates.length) {
        gates.pop().destroy();
    }
    while (bears.length) {
        bears.pop().destroy();
    }
    while (queens.length) {
        queens.pop().destroy();
    }
    while (ballHolders.length) {
        ballHolders.pop().destroy();
    }
    document.getElementById("stage").innerHTML = "";
    populateStage(document.getElementById("stage"));
    walls = document.getElementsByClassName("wall");
    platforms = document.getElementsByClassName("platform");
    var ballHolderElements = document.getElementsByClassName("ball-holder");
    for (var i = 0, length = ballHolderElements.length; i < length; i++) {
        ballHolders.push(new BallHolder(ballHolderElements[i] as HTMLElement));
    }
    var ballElements = document.getElementsByClassName("ball");
    for (var i = 0, length = ballElements.length; i < length; i++) {
        balls.push(new Ball(ballElements[i] as HTMLElement));
    }
    var gateElements = document.getElementsByClassName("gate");
    for (var i = 0, length = gateElements.length; i < length; i++) {
        gates.push(new Gate(gateElements[i] as HTMLElement));
    }
    snail = new Snail(
        document.getElementById("snail"),
        new Goal(document.getElementById("goal-blue"), Side.BLUE),
        new Goal(document.getElementById("goal-gold"), Side.GOLD)
    );
    bears = [
        new Bear(document.getElementById("bear1"), "one", Side.BLUE, 0),
        new Bear(document.getElementById("bear2"), "two", Side.GOLD, 1),
        new Bear(document.getElementById("bear3"), "three", Side.BLUE, 2),
        new Bear(document.getElementById("bear4"), "four", Side.BLUE, 3),
        new Bear(document.getElementById("bear5"), "five", Side.BLUE, 4),
        new Bear(document.getElementById("bear6"), "six", Side.GOLD, 5),
        new Bear(document.getElementById("bear7"), "seven", Side.GOLD, 6),
        new Bear(document.getElementById("bear8"), "eight", Side.GOLD, 7)
    ];
    queens = [
        new Queen(document.getElementById("queen1"), "one", Side.BLUE, 8),
        new Queen(document.getElementById("queen2"), "two", Side.GOLD, 9)
    ];
}

function populateStage(stage: HTMLElement): void {

    stage.appendChild(getElement("wall", "top:0px;left:0px;height:370px"))
    stage.appendChild(getElement("wall", "top:0px;right:0px;height:370px"))
    stage.appendChild(getElement("wall", "top;0px;width:36px;left:782px;height:185px"))

    // Platforms
    stage.appendChild(getElement("platform", "width:80px;left:18px;top:167px"))
    stage.appendChild(getElement("platform", "width:80px;left:18px;top:352px"))
    stage.appendChild(getElement("platform", "width:80px;right:18px;top:167px"))
    stage.appendChild(getElement("platform", "width:80px;right:18px;top:352px"))
    stage.appendChild(getElement("platform", "width:430px;left:585px;top:167px"))
    stage.appendChild(getElement("platform", "width:115px;left:280px;top:167px"))
    stage.appendChild(getElement("platform", "width:115px;right:280px;top:167px"))
    stage.appendChild(getElement("platform", "width:50px;top:260px;left:164px"))
    stage.appendChild(getElement("platform", "width:50px;top:260px;left:465px"))
    stage.appendChild(getElement("platform", "width:50px;top:260px;right:164px"))
    stage.appendChild(getElement("platform", "width:50px;top:260px;right:465px"))
    stage.appendChild(getElement("platform", "width:115px;left:280px;top:352px"))
    stage.appendChild(getElement("platform", "width:115px;right:280px;top:352px")) 
    stage.appendChild(getElement("platform", "width:80px;left:585px;top:352px"))
    stage.appendChild(getElement("platform", "width:80px;right:585px;top:352px"))
    stage.appendChild(getElement("platform", "width:1600px;left:0px;bottom:0px"))
    stage.appendChild(getElement("platform", "width:98px;left:0px;top:537px"))
    stage.appendChild(getElement("platform", "width:98px;right:0px;top:537px"))
    stage.appendChild(getElement("platform", "width:98px;left:0px;top:722px"))
    stage.appendChild(getElement("platform", "width:98px;right:0px;top:722px"))
    stage.appendChild(getElement("platform", "width:430px;top:722px;left:585px"))
    stage.appendChild(getElement("platform", "width:355px;top:450px;left:164px"))
    stage.appendChild(getElement("platform", "width:355px;top:450px;right:164px"))
    stage.appendChild(getElement("platform", "width:110px;top:450px;left:745px"))
    stage.appendChild(getElement("platform", "width:110px;top:630px;left:745px"))
    stage.appendChild(getElement("platform", "width:110px;top:630px;left:409px"))
    stage.appendChild(getElement("platform", "width:110px;top:630px;right:409px"))
    stage.appendChild(getElement("platform", "width:70px;top:630px;left:164px"))
    stage.appendChild(getElement("platform", "width:70px;top:630px;right:164px"))
    stage.appendChild(getElement("platform", "width:50px;top:722px;right:295px"))
    stage.appendChild(getElement("platform", "width:50px;top:722px;left:295px"))
    stage.appendChild(getElement("platform", "width:90px;right:585px;top:537px"))
    stage.appendChild(getElement("platform", "width:90px;left:585px;top:537px"))

    // Gate
    stage.appendChild(getElement("gate open", "top:106px;left:309px"))
    stage.appendChild(getElement("gate open", "top:106px;right:309px"))
    stage.appendChild(getElement("gate open", "top:389px;right:770px"))
    stage.appendChild(getElement("gate open", "top:569px;left:435px"))
    stage.appendChild(getElement("gate open", "top:569px;right:435px"))

    // Snail
    stage.appendChild(getElement("snail right", "left:750px;top:743px", "snail"))

    // Bear
    stage.appendChild(getElement("bear one", "left:700px;top:117px", "bear1"))
    stage.appendChild(getElement("bear two", "right:700px;top:117px", "bear2"))
    stage.appendChild(getElement("bear three", "left:710px;top:117px", "bear3"))
    stage.appendChild(getElement("bear four", "left:720px;top:117px", "bear4"))
    stage.appendChild(getElement("bear five", "left: 730px;top:117px", "bear5"))
    stage.appendChild(getElement("bear six", "right: 710px;top:117px", "bear6"))
    stage.appendChild(getElement("bear seven", "right: 720px;top:117px", "bear7"))
    stage.appendChild(getElement("bear eight", "right: 730px;top:117px", "bear8"))

    // Queens
    stage.appendChild(getElement("queen", "left:690px;top:104px", "queen1"))
    stage.appendChild(getElement("queen", "right:690px;top:104px", "queen2"))

    // Balls
    stage.appendChild(getElement("ball", "left:793px;top:706px"))
    stage.appendChild(getElement("ball", "left:776px;top:706px"))
    stage.appendChild(getElement("ball", "left:810px;top:706px"))
    stage.appendChild(getElement("ball", "left:803px;top:690px"))
    stage.appendChild(getElement("ball", "left:785px;top:690px"))
    stage.appendChild(getElement("ball", "left:793px;top:674px"))

    stage.appendChild(getElement("ball", "left:793px;top:614px"))
    stage.appendChild(getElement("ball", "left:776px;top:614px"))
    stage.appendChild(getElement("ball", "left:810px;top:614px"))
    stage.appendChild(getElement("ball", "left:803px;top:598px"))
    stage.appendChild(getElement("ball", "left:785px;top:598px"))
    stage.appendChild(getElement("ball", "left:793px;top:582px"))

    stage.appendChild(getElement("ball", "left:961px;top:521px"))
    stage.appendChild(getElement("ball", "left:944px;top:521px"))
    stage.appendChild(getElement("ball", "left:978px;top:521px"))
    stage.appendChild(getElement("ball", "left:971px;top:505px"))
    stage.appendChild(getElement("ball", "left:951px;top:505px"))
    stage.appendChild(getElement("ball", "left:961px;top:489px"))

    stage.appendChild(getElement("ball", "right:961px;top:521px"))
    stage.appendChild(getElement("ball", "right:944px;top:521px"))
    stage.appendChild(getElement("ball", "right:978px;top:521px"))
    stage.appendChild(getElement("ball", "right:971px;top:505px"))
    stage.appendChild(getElement("ball", "right:951px;top:505px"))
    stage.appendChild(getElement("ball", "right:961px;top:489px"))

    stage.appendChild(getElement("ball", "left:190px;top:614px"))
    stage.appendChild(getElement("ball", "left:173px;top:614px"))
    stage.appendChild(getElement("ball", "left:207px;top:614px"))
    stage.appendChild(getElement("ball", "left:200px;top:598px"))
    stage.appendChild(getElement("ball", "left:180px;top:598px"))
    stage.appendChild(getElement("ball", "left:190px;top:582px"))

    stage.appendChild(getElement("ball", "right:190px;top:614px"))
    stage.appendChild(getElement("ball", "right:173px;top:614px"))
    stage.appendChild(getElement("ball", "right:207px;top:614px"))
    stage.appendChild(getElement("ball", "right:200px;top:598px"))
    stage.appendChild(getElement("ball", "right:180px;top:598px"))
    stage.appendChild(getElement("ball", "right:190px;top:582px"))

    stage.appendChild(getElement("ball", "left:308px;top:816px"))
    stage.appendChild(getElement("ball", "left:325px;top:816px"))
    stage.appendChild(getElement("ball", "left:291px;top:816px"))
    stage.appendChild(getElement("ball", "left:316px;top:800px"))
    stage.appendChild(getElement("ball", "left:299px;top:800px"))
    stage.appendChild(getElement("ball", "left:308px;top:784px"))

    stage.appendChild(getElement("ball", "right:308px;top:816px"))
    stage.appendChild(getElement("ball", "right:325px;top:816px"))
    stage.appendChild(getElement("ball", "right:291px;top:816px"))
    stage.appendChild(getElement("ball", "right:316px;top:800px"))
    stage.appendChild(getElement("ball", "right:299px;top:800px"))
    stage.appendChild(getElement("ball", "right:308px;top:784px"))

    // Ball Holder
    stage.appendChild(getElement("ball-holder", "left:730px;top:60px"))
    stage.appendChild(getElement("ball-holder", "left:730px;top:40px"))
    stage.appendChild(getElement("ball-holder", "left:710px;top:70px"))
    stage.appendChild(getElement("ball-holder", "left:710px;top:50px"))
    stage.appendChild(getElement("ball-holder", "left:710px;top:30px"))
    stage.appendChild(getElement("ball-holder", "left:690px;top:60px"))
    stage.appendChild(getElement("ball-holder", "left:690px;top:40px"))
    stage.appendChild(getElement("ball-holder", "left:670px;top:70px"))
    stage.appendChild(getElement("ball-holder", "left:670px;top:50px"))
    stage.appendChild(getElement("ball-holder", "left:670px;top:30px"))
    stage.appendChild(getElement("ball-holder", "left:650px;top:60px"))
    stage.appendChild(getElement("ball-holder", "left:650px;top:40px"))
    stage.appendChild(getElement("ball-holder", "right:730px;top:60px"))
    stage.appendChild(getElement("ball-holder", "right:730px;top:40px"))
    stage.appendChild(getElement("ball-holder", "right:710px;top:70px"))
    stage.appendChild(getElement("ball-holder", "right:710px;top:50px"))
    stage.appendChild(getElement("ball-holder", "right:710px;top:30px"))
    stage.appendChild(getElement("ball-holder", "right:690px;top:60px"))
    stage.appendChild(getElement("ball-holder", "right:690px;top:40px"))
    stage.appendChild(getElement("ball-holder", "right:670px;top:70px"))
    stage.appendChild(getElement("ball-holder", "right:670px;top:50px"))
    stage.appendChild(getElement("ball-holder", "right:670px;top:30px"))
    stage.appendChild(getElement("ball-holder", "right:650px;top:60px"))
    stage.appendChild(getElement("ball-holder", "right:650px;top:40px"))

    // Blue Goal
    stage.appendChild(getElement("goal blue", "top:750px;left:20px", "goal-blue"));

    // Gold Goal
    stage.appendChild(getElement("goal gold", "top:750px;right:20px", "goal-gold"));

}


window.onload = function() {
    newGame();
}

