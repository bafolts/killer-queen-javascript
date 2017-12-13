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
var Bear = /** @class */ (function () {
    function Bear(element, className, color, leftCode, rightCode, jumpCode) {
        this.element = element;
        this.className = className;
        element.className = "bear " + className;
        var dx = [];
        var dy = 8;
        var leftDown = false;
        var rightDown = false;
        var jumpTimeout;
        var jumpStart = false;
        var ballInPocession;
        var leftSnail = (new Date()).getTime();
        var self = this;
        var bearOnSnail = setInterval(function () {
            if ((new Date()).getTime() - leftSnail > 2000 && snail.occupied === undefined && intersects(snail.element, self.element)) {
                snail.occupy(self);
            }
            else if (snail.occupied === self) {
                if (dx.length === 0) {
                    return;
                }
                if (dx[dx.length - 1] < 0) {
                    snail.element.style.left = snail.element.offsetLeft - 1 + "px";
                    if (snail.element.className === "snail left") {
                        snail.element.className = "snail left again";
                    }
                    else {
                        snail.element.className = "snail left";
                    }
                    self.element.className = "bear " + self.className + " left";
                }
                else {
                    snail.element.style.left = snail.element.offsetLeft + 1 + "px";
                    if (snail.element.className === "snail right") {
                        snail.element.className = "snail right again";
                    }
                    else {
                        snail.element.className = "snail right";
                    }
                    self.element.className = "bear " + self.className + " right";
                }
                snail.checkForWin();
                self.element.style.left = snail.element.offsetLeft + (snail.element.offsetWidth / 2) - (self.element.offsetWidth / 2) + "px";
            }
        }, 100);
        this.bearLoop = setInterval(function () {
            var i;
            var length;
            if (snail.occupied !== self) {
                if (dx.length === 0) {
                    self.animateStanding();
                }
                if (dx.length > 0) {
                    var currentLeft = self.element.offsetLeft;
                    var change = dx[dx.length - 1];
                    if (change > 0) {
                        self.animateWalkRight();
                    }
                    else {
                        self.animateWalkLeft();
                    }
                    if (change > 0) {
                        var closestWall;
                        for (i = 0, length = walls.length; i < length; i++) {
                            if (walls[i].offsetTop <= self.element.offsetTop && walls[i].offsetTop + walls[i].offsetHeight >= self.element.offsetTop) {
                                if (walls[i].offsetLeft >= self.element.offsetLeft + self.element.offsetWidth) {
                                    if (closestWall === undefined || walls[i].offsetLeft < closestWall.offsetLeft) {
                                        closestWall = walls[i];
                                    }
                                }
                            }
                        }
                        for (i = 0, length = platforms.length; i < length; i++) {
                            if ((platforms[i].offsetTop >= self.element.offsetTop && platforms[i].offsetTop <= self.element.offsetTop + self.element.offsetHeight) ||
                                (platforms[i].offsetTop + platforms[i].offsetHeight >= self.element.offsetTop && platforms[i].offsetTop + platforms[i].offsetHeight <= self.element.offsetTop + self.element.offsetHeight)) {
                                if (platforms[i].offsetLeft >= self.element.offsetLeft + self.element.offsetWidth) {
                                    if (closestWall === undefined || platforms[i].offsetLeft < closestWall.offsetLeft) {
                                        closestWall = platforms[i];
                                    }
                                }
                            }
                        }
                        if (closestWall !== undefined && self.element.offsetLeft + self.element.offsetWidth === closestWall.offsetLeft) {
                        }
                        else if (closestWall !== undefined && self.element.offsetLeft + self.element.offsetWidth + change >= closestWall.offsetLeft) {
                            self.element.style.left = (closestWall.offsetLeft - self.element.offsetWidth) + "px";
                        }
                        else {
                            if (self.element.offsetLeft + self.element.offsetWidth >= 1600) {
                                self.element.style.left = 0 + change + "px";
                            }
                            else {
                                self.element.style.left = self.element.offsetLeft + change + "px";
                            }
                        }
                    }
                    else {
                        var closestWall;
                        for (i = 0, length = walls.length; i < length; i++) {
                            if (walls[i].offsetTop <= self.element.offsetTop && walls[i].offsetTop + walls[i].offsetHeight >= self.element.offsetTop) {
                                if (walls[i].offsetLeft + walls[i].offsetWidth <= self.element.offsetLeft) {
                                    if (closestWall === undefined || walls[i].offsetLeft > closestWall.offsetLeft) {
                                        closestWall = walls[i];
                                    }
                                }
                            }
                        }
                        for (i = 0, length = platforms.length; i < length; i++) {
                            if ((platforms[i].offsetTop >= self.element.offsetTop && platforms[i].offsetTop <= self.element.offsetTop + self.element.offsetHeight) ||
                                (platforms[i].offsetTop + platforms[i].offsetHeight >= self.element.offsetTop && platforms[i].offsetTop + platforms[i].offsetHeight <= self.element.offsetTop + self.element.offsetHeight)) {
                                if (platforms[i].offsetLeft + platforms[i].offsetWidth <= self.element.offsetLeft) {
                                    if (closestWall === undefined || platforms[i].offsetLeft + platforms[i].offsetWidth > closestWall.offsetLeft + closestWall.offsetWidth) {
                                        closestWall = platforms[i];
                                    }
                                }
                            }
                        }
                        if (closestWall !== undefined && self.element.offsetLeft === closestWall.offsetLeft + closestWall.offsetWidth) {
                        }
                        else if (closestWall !== undefined && self.element.offsetLeft + change <= closestWall.offsetLeft + closestWall.offsetWidth) {
                            self.element.style.left = closestWall.offsetLeft + closestWall.offsetWidth + "px";
                        }
                        else {
                            if (self.element.offsetLeft + change < 0) {
                                self.element.style.left = (1600 - self.element.offsetLeft) + change + "px";
                            }
                            else {
                                self.element.style.left = self.element.offsetLeft + change + "px";
                            }
                        }
                    }
                }
            }
            if (dy > 0) {
                var closestPlatform = void 0;
                for (i = 0, length = platforms.length; i < length; i++) {
                    if (platforms[i].offsetLeft < self.element.offsetLeft + self.element.offsetWidth && platforms[i].offsetLeft + platforms[i].offsetWidth > self.element.offsetLeft) {
                        if (platforms[i].offsetTop >= self.element.offsetTop + self.element.offsetHeight) {
                            if (closestPlatform === undefined || platforms[i].offsetTop < closestPlatform.offsetTop) {
                                closestPlatform = platforms[i];
                            }
                        }
                    }
                }
                if (closestPlatform !== undefined && self.element.offsetTop + self.element.offsetHeight === closestPlatform.offsetTop) {
                }
                else if (closestPlatform !== undefined && self.element.offsetTop + self.element.offsetHeight + 8 >= closestPlatform.offsetTop) {
                    self.element.style.top = closestPlatform.offsetTop - self.element.offsetHeight + "px";
                }
                else if (closestPlatform !== undefined) {
                    self.element.style.top = self.element.offsetTop + 8 + "px";
                }
            }
            else {
                var closestPlatform = void 0;
                for (i = 0, length = platforms.length; i < length; i++) {
                    if (platforms[i].offsetLeft < self.element.offsetLeft + self.element.offsetWidth && platforms[i].offsetLeft + platforms[i].offsetWidth > self.element.offsetLeft) {
                        if (platforms[i].offsetTop + platforms[i].offsetHeight <= self.element.offsetTop) {
                            if (closestPlatform === undefined || platforms[i].offsetTop + platforms[i].offsetHeight > closestPlatform.offsetTop + closestPlatform.offsetHeight) {
                                closestPlatform = platforms[i];
                            }
                        }
                    }
                }
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
        document.addEventListener("keyup", function (e) {
            if (e.keyCode === leftCode && dx.indexOf(-5) !== -1) {
                dx.splice(dx.indexOf(-5), 1);
                leftDown = false;
            }
            if (e.keyCode === rightCode && dx.indexOf(5) !== -1) {
                dx.splice(dx.indexOf(5), 1);
                rightDown = false;
            }
            if (e.keyCode === jumpCode) {
                dy = 8;
                jumpStart = false;
                clearTimeout(jumpTimeout);
            }
        });
        document.addEventListener("keydown", function (e) {
            if (leftDown === false && e.keyCode === leftCode) {
                dx.push(-5);
                leftDown = true;
            }
            else if (rightDown === false && e.keyCode === rightCode) {
                dx.push(5);
                rightDown = true;
            }
            else if (jumpStart === false && e.keyCode === jumpCode) {
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
            e.preventDefault();
        });
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
function intersects(item1, item2) {
    return !((item1.offsetLeft + item1.offsetWidth) < item2.offsetLeft ||
        item1.offsetLeft > (item2.offsetLeft + item2.offsetWidth) ||
        (item1.offsetTop + item1.offsetHeight) < item2.offsetTop ||
        item1.offsetTop > (item2.offsetTop + item2.offsetHeight));
}
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
var ballHolders = [];
var balls = [];
var snail;
var gates = [];
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
    new Bear(document.getElementById("bear1"), "one", Side.BLUE, 37, 39, 32);
    new Bear(document.getElementById("bear2"), "two", Side.GOLD, 65, 68, 69);
    new Bear(document.getElementById("bear3"), "three", Side.BLUE, 74, 76, 75);
    new Bear(document.getElementById("bear4"), "four", Side.BLUE, 66, 77, 78);
    new Bear(document.getElementById("bear5"), "five", Side.BLUE, 73, 80, 79);
};
