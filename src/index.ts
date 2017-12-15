
/// <reference path="Ball.ts" />
/// <reference path="BallHolder.ts" />
/// <reference path="Bear.ts" />
/// <reference path="Goal.ts" />
/// <reference path="Gate.ts" />
/// <reference path="Side.ts" />
/// <reference path="Snail.ts" />
/// <reference path="utils.ts" />

var walls;
var platforms;
var ballHolders: Array<BallHolder> = [];
var balls: Array<Ball> = [];
var snail: Snail;
var gates: Array<Gate> = [];

window.onload = function() {
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
    new Bear(document.getElementById("bear1"), "one", Side.BLUE, 37, 39, 32);
    new Bear(document.getElementById("bear2"), "two", Side.GOLD, 65, 68, 83);
    new Bear(document.getElementById("bear3"), "three", Side.BLUE, 74, 76, 75);
    new Bear(document.getElementById("bear4"), "four", Side.BLUE, 66, 77, 78);
    new Bear(document.getElementById("bear5"), "five", Side.BLUE, 73, 80, 79);
    new Bear(document.getElementById("bear6"), "six", Side.GOLD, 90, 67, 88);
    new Bear(document.getElementById("bear7"), "seven", Side.GOLD, 81, 69, 87);
    new Bear(document.getElementById("bear8"), "eight", Side.GOLD, 49, 51, 50);
}

