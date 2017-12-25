var Ball = /** @class */ (function () {
    function Ball(element) {
        this.element = element;
        this.held = false;
    }
    Ball.prototype.removeFromPlay = function () {
        this.element.parentNode.removeChild(this.element);
        balls.splice(balls.indexOf(this), 1);
    };
    return Ball;
}());
var BallHolder = /** @class */ (function () {
    function BallHolder(element) {
        this.element = element;
        this.occupied = false;
        this.side = this.element.offsetLeft < 800 ? Side.BLUE : Side.GOLD;
    }
    BallHolder.prototype.occupy = function (ball) {
        this.occupied = true;
        this.element.className += " occupied";
        ball.element.parentNode.removeChild(ball.element);
    };
    return BallHolder;
}());
function getClosestWallToLeft(element) {
    var closestWall;
    for (var i = 0, length_1 = walls.length; i < length_1; i++) {
        if (walls[i].offsetTop <= element.offsetTop && walls[i].offsetTop + walls[i].offsetHeight >= element.offsetTop) {
            if (walls[i].offsetLeft + walls[i].offsetWidth <= element.offsetLeft) {
                if (closestWall === undefined || walls[i].offsetLeft > closestWall.offsetLeft) {
                    closestWall = walls[i];
                }
            }
        }
    }
    for (var i = 0, length_2 = platforms.length; i < length_2; i++) {
        if ((platforms[i].offsetTop >= element.offsetTop && platforms[i].offsetTop <= element.offsetTop + element.offsetHeight) ||
            (platforms[i].offsetTop + platforms[i].offsetHeight >= element.offsetTop && platforms[i].offsetTop + platforms[i].offsetHeight <= element.offsetTop + element.offsetHeight)) {
            if (platforms[i].offsetLeft + platforms[i].offsetWidth <= element.offsetLeft) {
                if (closestWall === undefined || platforms[i].offsetLeft + platforms[i].offsetWidth > closestWall.offsetLeft + closestWall.offsetWidth) {
                    closestWall = platforms[i];
                }
            }
        }
    }
    return closestWall;
}
function getClosestWallToRight(element) {
    var closestWall;
    for (var i = 0, length_3 = walls.length; i < length_3; i++) {
        if (walls[i].offsetTop <= element.offsetTop && walls[i].offsetTop + walls[i].offsetHeight >= element.offsetTop) {
            if (walls[i].offsetLeft >= element.offsetLeft + element.offsetWidth) {
                if (closestWall === undefined || walls[i].offsetLeft < closestWall.offsetLeft) {
                    closestWall = walls[i];
                }
            }
        }
    }
    for (var i = 0, length_4 = platforms.length; i < length_4; i++) {
        if ((platforms[i].offsetTop >= element.offsetTop && platforms[i].offsetTop <= element.offsetTop + element.offsetHeight) ||
            (platforms[i].offsetTop + platforms[i].offsetHeight >= element.offsetTop && platforms[i].offsetTop + platforms[i].offsetHeight <= element.offsetTop + element.offsetHeight)) {
            if (platforms[i].offsetLeft >= element.offsetLeft + element.offsetWidth) {
                if (closestWall === undefined || platforms[i].offsetLeft < closestWall.offsetLeft) {
                    closestWall = platforms[i];
                }
            }
        }
    }
    return closestWall;
}
function getClosestPlatformBelow(element) {
    var closestPlatform;
    for (var i = 0, length_5 = platforms.length; i < length_5; i++) {
        if (platforms[i].offsetLeft < element.offsetLeft + element.offsetWidth && platforms[i].offsetLeft + platforms[i].offsetWidth > element.offsetLeft) {
            if (platforms[i].offsetTop >= element.offsetTop + element.offsetHeight) {
                if (closestPlatform === undefined || platforms[i].offsetTop < closestPlatform.offsetTop) {
                    closestPlatform = platforms[i];
                }
            }
        }
    }
    return closestPlatform;
}
function getClosestPlatformAbove(element) {
    var closestPlatform;
    for (var i = 0, length_6 = platforms.length; i < length_6; i++) {
        if (platforms[i].offsetLeft < element.offsetLeft + element.offsetWidth && platforms[i].offsetLeft + platforms[i].offsetWidth > element.offsetLeft) {
            if (platforms[i].offsetTop + platforms[i].offsetHeight <= element.offsetTop) {
                if (closestPlatform === undefined || platforms[i].offsetTop + platforms[i].offsetHeight > closestPlatform.offsetTop + closestPlatform.offsetHeight) {
                    closestPlatform = platforms[i];
                }
            }
        }
    }
    return closestPlatform;
}
function animateMoveRight(element, closestWall, distance) {
    if (closestWall !== undefined && element.offsetLeft + element.offsetWidth === closestWall.offsetLeft) {
    }
    else if (closestWall !== undefined && element.offsetLeft + element.offsetWidth + distance >= closestWall.offsetLeft) {
        element.style.left = (closestWall.offsetLeft - element.offsetWidth) + "px";
    }
    else {
        if (element.offsetLeft + element.offsetWidth >= 1600) {
            element.style.left = 0 + distance + "px";
        }
        else {
            element.style.left = element.offsetLeft + distance + "px";
        }
    }
}
function animateMoveLeft(element, closestWall, distance) {
    if (closestWall !== undefined && element.offsetLeft === closestWall.offsetLeft + closestWall.offsetWidth) {
    }
    else if (closestWall !== undefined && element.offsetLeft + distance <= closestWall.offsetLeft + closestWall.offsetWidth) {
        element.style.left = closestWall.offsetLeft + closestWall.offsetWidth + "px";
    }
    else {
        if (element.offsetLeft + distance < 0) {
            element.style.left = (1600 - element.offsetLeft) + distance + "px";
        }
        else {
            element.style.left = element.offsetLeft + distance + "px";
        }
    }
}
function animateFreeFalling(element, closestPlatform, distance) {
    if (closestPlatform !== undefined && element.offsetTop + element.offsetHeight === closestPlatform.offsetTop) {
    }
    else if (closestPlatform !== undefined && element.offsetTop + element.offsetHeight + distance >= closestPlatform.offsetTop) {
        element.style.top = closestPlatform.offsetTop - element.offsetHeight + "px";
    }
    else if (closestPlatform !== undefined) {
        element.style.top = element.offsetTop + distance + "px";
    }
}
function animateRising(element, closestPlatform, distance) {
    if (closestPlatform !== undefined && element.offsetTop === closestPlatform.offsetTop + closestPlatform.offsetHeight) {
    }
    else if (closestPlatform !== undefined && element.offsetTop + distance <= closestPlatform.offsetTop + closestPlatform.offsetHeight) {
        element.style.top = closestPlatform.offsetTop + closestPlatform.offsetHeight + "px";
    }
    else {
        element.style.top = Math.max(0, element.offsetTop + distance) + "px";
    }
}
function addExplodingParticleForDeath(element) {
    var particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = element.offsetLeft + (element.offsetWidth / 2) + "px";
    particle.style.top = element.offsetTop + (element.offsetHeight / 2) + "px";
    document.getElementById("stage").appendChild(particle);
    setTimeout(function () {
        particle.style.opacity = "0";
        particle.style.transition = "0.75s";
        particle.style.transitionTimingFunction = "ease";
        particle.style.transform = "translate(" + ((100 * Math.cos(Math.random() * Math.PI * 2)) | 0) + "px, " + ((100 * Math.sin(Math.random() * Math.PI * 2)) | 0) + "px)";
        setTimeout(function () {
            particle.parentNode.removeChild(particle);
        }, 750);
    }, 0);
}
var Bear = /** @class */ (function () {
    function Bear(element, className, side, gamepadIndex) {
        this.element = element;
        this.className = className;
        this.side = side;
        element.className = "bear " + className;
        var dx = 0;
        var dy = 8;
        var jumpTimeout;
        var jumpStart = false;
        var ballInPocession;
        var leftSnail = (new Date()).getTime();
        var self = this;
        function animateSnail() {
            if ((new Date()).getTime() - leftSnail > 2000 && snail.occupied === undefined && intersects(snail.element, self.element)) {
                snail.occupy(self);
            }
            else if (snail.occupied === self && dx !== 0) {
                var deltaMove = dx > 0 ? 1 : -1;
                var direction = dx > 0 ? "right" : "left";
                snail.element.style.left = snail.element.offsetLeft + deltaMove + "px";
                if (snail.element.className === "snail " + direction) {
                    snail.element.className = "snail " + direction + " again";
                }
                else {
                    snail.element.className = "snail " + direction;
                }
                self.element.className = "bear " + self.className + " " + direction;
                snail.checkForWin();
                self.element.style.left = snail.element.offsetLeft + (snail.element.offsetWidth / 2) - (self.element.offsetWidth / 2) + "px";
            }
            setTimeout(function () {
                requestAnimationFrame(animateSnail);
            }, 100);
        }
        requestAnimationFrame(animateSnail);
        this.bearLoop = setInterval(function () {
            var i;
            var length;
            if (snail.occupied !== self) {
                if (dx === 0) {
                    self.animateStanding();
                }
                if (dx !== 0) {
                    var currentLeft = self.element.offsetLeft;
                    var change = dx;
                    if (change > 0) {
                        self.animateWalkRight();
                    }
                    else {
                        self.animateWalkLeft();
                    }
                    if (change > 0) {
                        var closestWall = getClosestWallToRight(self.element);
                        animateMoveRight(self.element, closestWall, change);
                    }
                    else {
                        var closestWall = getClosestWallToLeft(self.element);
                        animateMoveLeft(self.element, closestWall, change);
                    }
                }
            }
            if (dy > 0) {
                animateFreeFalling(self.element, getClosestPlatformBelow(self.element), 8);
            }
            else {
                var closestPlatform = getClosestPlatformAbove(self.element);
                if (closestPlatform !== undefined && self.element.offsetTop === closestPlatform.offsetTop + closestPlatform.offsetHeight) {
                    clearTimeout(jumpTimeout);
                    dy = 8;
                }
                else if (closestPlatform !== undefined && self.element.offsetTop - 8 <= closestPlatform.offsetTop + closestPlatform.offsetHeight) {
                    self.element.style.top = closestPlatform.offsetTop + closestPlatform.offsetHeight + "px";
                    clearTimeout(jumpTimeout);
                    dy = 8;
                }
                else {
                    self.element.style.top = Math.max(0, self.element.offsetTop - 8) + "px";
                }
            }
            var touchingBall;
            if (!ballInPocession) {
                if (snail.occupied !== self) {
                    for (i = 0, length = balls.length; i < length; i++) {
                        if (balls[i].held === false && intersects(balls[i].element, self.element)) {
                            touchingBall = balls[i];
                            balls[i].held = true;
                            break;
                        }
                    }
                    if (touchingBall !== undefined) {
                        ballInPocession = touchingBall;
                        touchingBall.held = true;
                    }
                }
            }
            else {
                ballInPocession.element.style.top = self.element.offsetTop - ballInPocession.element.offsetHeight + "px";
                ballInPocession.element.style.left = self.element.offsetLeft + ((self.element.offsetWidth / 2) - (ballInPocession.element.offsetWidth / 2)) + "px";
                for (i = 0, length = gates.length; i < length; i++) {
                    if (gates[i].isOpen === true && intersects(self.element, gates[i].element)) {
                        ballInPocession.removeFromPlay();
                        ballInPocession = undefined;
                        self.changeToWarrior();
                        gates[i].shut();
                        break;
                    }
                }
                if (ballInPocession !== undefined)
                    for (i = 0, length = ballHolders.length; i < length; i++) {
                        if (ballHolders[i].occupied) {
                            continue;
                        }
                        var ballHolder = ballHolders[i];
                        if (intersects(ballHolder.element, ballInPocession.element)) {
                            ballHolder.occupy(ballInPocession);
                            self.checkForWin();
                            ballInPocession = undefined;
                            break;
                        }
                    }
            }
        }, 50);
        function canStartJump() {
            var closestPlatform;
            for (var i = 0, length = platforms.length; i < length; i++) {
                if (platforms[i].offsetLeft < self.element.offsetLeft + self.element.offsetWidth && platforms[i].offsetLeft + platforms[i].offsetWidth > self.element.offsetLeft) {
                    if (platforms[i].offsetTop === self.element.offsetTop + self.element.offsetHeight) {
                        if (snail.occupied === self) {
                            leftSnail = (new Date()).getTime();
                            snail.unoccupy();
                        }
                        jumpStart = true;
                        dy = -16;
                        jumpTimeout = setTimeout(function () {
                            dy = 8;
                        }, 750);
                        break;
                    }
                }
            }
        }
        function canStopJump() {
            dy = 8;
            jumpStart = false;
            clearTimeout(jumpTimeout);
        }
        function checkButtons() {
            var gamepad = window.navigator.getGamepads()[gamepadIndex];
            if (gamepad) {
                dx = gamepad.axes[0] * 5;
                for (var i = 0; i < gamepad.buttons.length; i++) {
                    if (gamepad.buttons[i].pressed) {
                        if (jumpStart === false) {
                            canStartJump();
                        }
                        break;
                    }
                }
                if (jumpStart === true && i === gamepad.buttons.length) {
                    canStopJump();
                }
            }
            window.requestAnimationFrame(checkButtons);
        }
        window.requestAnimationFrame(checkButtons);
    }
    Bear.prototype.checkForWin = function () {
        var goldWin = true;
        var blueWin = true;
        for (var i = 0; i < ballHolders.length; i++) {
            if (ballHolders[i].side === "blue" && ballHolders[i].occupied === false) {
                blueWin = false;
                break;
            }
        }
        for (var i = 0; i < ballHolders.length; i++) {
            if (ballHolders[i].side === "gold" && ballHolders[i].occupied === false) {
                goldWin = false;
                break;
            }
        }
        if (goldWin) {
            clearInterval(this.game);
            alert("GOLD ECONOMY WIN");
            return;
        }
        if (blueWin) {
            clearInterval(this.game);
            alert("BLUE ECONOMY WIN");
            return;
        }
    };
    Bear.prototype.killedBySword = function () {
        clearInterval(this.bearLoop);
        for (var i = 0; i < 100; i++) {
            addExplodingParticleForDeath(this.element);
        }
        this.element.parentNode.removeChild(this.element);
    };
    Bear.prototype.changeToWarrior = function () {
        clearInterval(this.bearLoop);
        this.element.parentNode.removeChild(this.element);
    };
    Bear.prototype.animateStanding = function () {
        this.element.className = "bear " + this.className;
    };
    Bear.prototype.animateWalkLeft = function () {
        var nextClass = "bear " + this.className + " left";
        if (this.element.className === nextClass) {
            this.element.className = nextClass + "2";
        }
        else {
            this.element.className = nextClass;
        }
    };
    Bear.prototype.animateWalkRight = function () {
        var nextClass = "bear " + this.className + " right";
        if (this.element.className === nextClass) {
            this.element.className = nextClass + "2";
        }
        else {
            this.element.className = nextClass;
        }
    };
    return Bear;
}());
var Goal = /** @class */ (function () {
    function Goal(element, color) {
        this.element = element;
        this.color = color;
    }
    return Goal;
}());
var Gate = /** @class */ (function () {
    function Gate(element) {
        this.element = element;
        this.isShutting = false;
        this.isShut = false;
        this.isOpening = false;
        this.isOpen = true;
        var self = this;
    }
    Gate.prototype.open = function () {
        var self = this;
        this.isShutting = false;
        this.isOpening = true;
        this.isShut = false;
        this.isOpen = false;
        setTimeout(function () {
            self.element.className = "gate practically";
            setTimeout(function () {
                self.element.className = "gate almost";
                setTimeout(function () {
                    self.element.className = "gate open";
                    self.isShut = false;
                    self.isShutting = false;
                    self.isOpen = true;
                    self.isOpening = false;
                }, 250);
            }, 250);
        }, 250);
    };
    Gate.prototype.setSide = function (side) {
        this.side = side;
        if (this.side === Side.BLUE) {
            this.element.style.backgroundColor = "blue";
        }
        else {
            this.element.style.backgroundColor = "gold";
        }
    };
    Gate.prototype.shut = function () {
        var self = this;
        this.isOpen = false;
        this.isShut = false;
        this.isShutting = true;
        this.isOpening = false;
        setTimeout(function () {
            self.element.className = "gate almost";
            setTimeout(function () {
                self.element.className = "gate practically";
                setTimeout(function () {
                    self.element.className = "gate shut";
                    self.isShut = true;
                    self.isShutting = false;
                    self.isOpen = false;
                    self.isOpening = false;
                    setTimeout(function () {
                        self.open();
                    }, 500);
                }, 250);
            }, 250);
        }, 250);
    };
    return Gate;
}());
var Queen = /** @class */ (function () {
    function Queen(element, className, side, gamepadIndex) {
        this.element = element;
        this.className = className;
        this.side = side;
        this.gamepadIndex = gamepadIndex;
        this.dx = 0;
        this.dy = 8;
        this.swinging = false;
        this.flapping = false;
        this.swordFacingRight = true;
        this.killedBearDuringSwing = false;
        this.setupControls();
        requestAnimationFrame(this.animate.bind(this));
        this.addSword();
    }
    Queen.prototype.addSword = function () {
        var sword = document.createElement("div");
        sword.className = "sword";
        sword.appendChild(document.createElement("div"));
        this.element.appendChild(sword);
        this.swordElement = sword;
    };
    Queen.prototype.swing = function () {
        this.swinging = true;
        var self = this;
        var angle = 0;
        var doSwing = function () {
            if (angle < 90) {
                setTimeout(function () {
                    angle += 10;
                    if (self.swordFacingRight) {
                        self.swordElement.style.transform = "rotate(" + (angle + 90) + "deg)";
                    }
                    else {
                        self.swordElement.style.transform = "rotate(" + (-90 - angle) + "deg)";
                    }
                    doSwing();
                }, 25);
            }
            else {
                if (self.swordFacingRight) {
                    self.swordElement.style.transform = "rotate(90deg)";
                }
                else {
                    self.swordElement.style.transform = "rotate(-90deg)";
                }
                setTimeout(function () {
                    self.swinging = false;
                    self.killedBearDuringSwing = false;
                }, 500);
            }
        };
        doSwing();
    };
    Queen.prototype.animate = function () {
        var change = this.dx;
        var self = this;
        if (this.dx > 0) {
            this.swordFacingRight = true;
        }
        else if (this.dx < 0) {
            this.swordFacingRight = false;
        }
        if (!self.swordFacingRight) {
            self.swordElement.style.left = "0px";
            self.swordElement.style.transform = "rotate(-90deg)";
        }
        else {
            self.swordElement.style.left = "35px";
            self.swordElement.style.transform = "rotate(90deg)";
        }
        if (this.dx > 0) {
            animateMoveRight(this.element, getClosestWallToRight(this.element), this.dx);
        }
        else {
            animateMoveLeft(this.element, getClosestWallToLeft(this.element), this.dx);
        }
        if (this.dy > 0) {
            animateFreeFalling(this.element, getClosestPlatformBelow(this.element), this.dy);
        }
        else if (this.dy < 0) {
            animateRising(this.element, getClosestPlatformAbove(this.element), this.dy);
        }
        for (var i = 0, length_7 = gates.length; i < length_7; i++) {
            if (intersects(gates[i].element, self.element)) {
                gates[i].setSide(self.side);
            }
        }
        for (var i = 0, length_8 = bears.length; i < length_8; i++) {
            if (bears[i].side !== self.side && intersects(bears[i].element, self.element) && self.swinging === false) {
                self.swing();
                break;
            }
            else if (bears[i].side !== self.side && self.killedBearDuringSwing === false && intersects(bears[i].element, self.swordElement) && self.swinging === true) {
                self.killedBearDuringSwing = true;
                bears[i].killedBySword();
                break;
            }
        }
        setTimeout(function () {
            requestAnimationFrame(self.animate.bind(self));
        }, 50);
    };
    Queen.prototype.setupControls = function () {
        var self = this;
        document.addEventListener("keyup", function (e) {
            if (e.keyCode === 37 || e.keyCode === 39) {
                self.dx = 0;
            }
            if (e.keyCode === 40) {
                self.dy = 8;
            }
        });
        document.addEventListener("keydown", function (e) {
            if (e.keyCode === 37) {
                self.dx = -8;
            }
            else if (e.keyCode === 39) {
                self.dx = 8;
            }
            else if (e.keyCode === 40) {
                self.dy = 16;
            }
            else if (e.keyCode === 32 && self.flapping === false) {
                self.flapping = true;
                self.dy = -4;
                setTimeout(function () {
                    self.dy = 8;
                    self.flapping = false;
                }, 400);
            }
            // 32 = spacebar
            // 37 = left
            // 39 = right
            // 38 = up
            // 40 = down
        });
    };
    return Queen;
}());
var Side;
(function (Side) {
    Side["BLUE"] = "blue";
    Side["GOLD"] = "gold";
})(Side || (Side = {}));
var Snail = /** @class */ (function () {
    function Snail(element, goal1, goal2) {
        this.element = element;
        this.goal1 = goal1;
        this.goal2 = goal2;
        this.checkForWin = function () {
            if (this.element.offsetLeft + this.element.offsetWidth < this.goal1.element.offsetLeft + this.goal1.element.offsetWidth) {
                alert("BLUE WIN");
            }
            else if (this.element.offsetLeft > this.goal2.element.offsetLeft) {
                alert("GOLD WIN");
            }
        };
    }
    Snail.prototype.occupy = function (bear) {
        this.occupied = bear;
    };
    Snail.prototype.unoccupy = function () {
        this.occupied = undefined;
    };
    return Snail;
}());
function realTop(item) {
    var top = item.offsetTop;
    while (item.parentElement) {
        top += item.parentElement.offsetTop;
        item = item.parentElement;
    }
    return top;
}
function realLeft(item) {
    var left = item.offsetLeft;
    while (item.parentElement) {
        left += item.parentElement.offsetLeft;
        item = item.parentElement;
    }
    return left;
}
function intersects(item1, item2) {
    return !((realLeft(item1) + item1.offsetWidth) < realLeft(item2) ||
        realLeft(item1) > (realLeft(item2) + item2.offsetWidth) ||
        (realTop(item1) + item1.offsetHeight) < realTop(item2) ||
        realTop(item1) > (realTop(item2) + item2.offsetHeight));
}
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
var ballHolders = [];
var balls = [];
var snail;
var gates = [];
var bears = [];
var queens = [];
window.onload = function () {
    walls = document.getElementsByClassName("wall");
    platforms = document.getElementsByClassName("platform");
    var ballHolderElements = document.getElementsByClassName("ball-holder");
    for (var i = 0, length = ballHolderElements.length; i < length; i++) {
        ballHolders.push(new BallHolder(ballHolderElements[i]));
    }
    var ballElements = document.getElementsByClassName("ball");
    for (var i = 0, length = ballElements.length; i < length; i++) {
        balls.push(new Ball(ballElements[i]));
    }
    var gateElements = document.getElementsByClassName("gate");
    for (var i = 0, length = gateElements.length; i < length; i++) {
        gates.push(new Gate(gateElements[i]));
    }
    snail = new Snail(document.getElementById("snail"), new Goal(document.getElementById("goal-blue"), Side.BLUE), new Goal(document.getElementById("goal-gold"), Side.GOLD));
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
};
