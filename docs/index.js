var Ball = /** @class */ (function () {
    function Ball(element) {
        this.element = element;
        this.held = false;
    }
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
    function Bear(id, color, leftCode, rightCode, jumpCode) {
        var bear1 = document.getElementById(id);
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
            if ((new Date()).getTime() - leftSnail > 2000 && snail.occupied === undefined && intersects(snail.element, bear1)) {
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
                }
                else {
                    snail.element.style.left = snail.element.offsetLeft + 1 + "px";
                    if (snail.element.className === "snail right") {
                        snail.element.className = "snail right again";
                    }
                    else {
                        snail.element.className = "snail right";
                    }
                }
                snail.checkForWin();
                bear1.style.left = snail.element.offsetLeft + (snail.element.offsetWidth / 2) - (bear1.offsetWidth / 2) + "px";
            }
        }, 100);
        var game = setInterval(function () {
            var i;
            var length;
            if (snail.occupied !== self) {
                if (dx.length > 0) {
                    var currentLeft = bear1.offsetLeft;
                    var change = dx[dx.length - 1];
                    if (change > 0) {
                        var closestWall;
                        for (i = 0, length = walls.length; i < length; i++) {
                            if (walls[i].offsetTop < bear1.offsetTop && walls[i].offsetTop + walls[i].offsetHeight > bear1.offsetTop) {
                                if (walls[i].offsetLeft >= bear1.offsetLeft + bear1.offsetWidth) {
                                    if (closestWall === undefined || walls[i].offsetLeft < closestWall.offsetLeft) {
                                        closestWall = walls[i];
                                    }
                                }
                            }
                        }
                        for (i = 0, length = platforms.length; i < length; i++) {
                            if ((platforms[i].offsetTop >= bear1.offsetTop && platforms[i].offsetTop <= bear1.offsetTop + bear1.offsetHeight) ||
                                (platforms[i].offsetTop + platforms[i].offsetHeight >= bear1.offsetTop && platforms[i].offsetTop + platforms[i].offsetHeight <= bear1.offsetTop + bear1.offsetHeight)) {
                                if (platforms[i].offsetLeft >= bear1.offsetLeft + bear1.offsetWidth) {
                                    if (closestWall === undefined || platforms[i].offsetLeft < closestWall.offsetLeft) {
                                        closestWall = platforms[i];
                                    }
                                }
                            }
                        }
                        if (closestWall !== undefined && bear1.offsetLeft + bear1.offsetWidth === closestWall.offsetLeft) {
                        }
                        else if (closestWall !== undefined && bear1.offsetLeft + bear1.offsetWidth + change >= closestWall.offsetLeft) {
                            bear1.style.left = (closestWall.offsetLeft - bear1.offsetWidth) + "px";
                        }
                        else {
                            if (bear1.offsetLeft + bear1.offsetWidth >= 1600) {
                                bear1.style.left = 0 + change + "px";
                            }
                            else {
                                bear1.style.left = bear1.offsetLeft + change + "px";
                            }
                        }
                    }
                    else {
                        var closestWall;
                        for (i = 0, length = walls.length; i < length; i++) {
                            if (walls[i].offsetTop < bear1.offsetTop && walls[i].offsetTop + walls[i].offsetHeight > bear1.offsetTop) {
                                if (walls[i].offsetLeft + walls[i].offsetWidth <= bear1.offsetLeft) {
                                    if (closestWall === undefined || walls[i].offsetLeft > closestWall.offsetLeft) {
                                        closestWall = walls[i];
                                    }
                                }
                            }
                        }
                        for (i = 0, length = platforms.length; i < length; i++) {
                            if ((platforms[i].offsetTop >= bear1.offsetTop && platforms[i].offsetTop <= bear1.offsetTop + bear1.offsetHeight) ||
                                (platforms[i].offsetTop + platforms[i].offsetHeight >= bear1.offsetTop && platforms[i].offsetTop + platforms[i].offsetHeight <= bear1.offsetTop + bear1.offsetHeight)) {
                                if (platforms[i].offsetLeft + platforms[i].offsetWidth <= bear1.offsetLeft) {
                                    if (closestWall === undefined || platforms[i].offsetLeft + platforms[i].offsetWidth > closestWall.offsetLeft + closestWall.offsetWidth) {
                                        closestWall = platforms[i];
                                    }
                                }
                            }
                        }
                        if (closestWall !== undefined && bear1.offsetLeft === closestWall.offsetLeft + closestWall.offsetWidth) {
                        }
                        else if (closestWall !== undefined && bear1.offsetLeft + change <= closestWall.offsetLeft + closestWall.offsetWidth) {
                            bear1.style.left = closestWall.offsetLeft + closestWall.offsetWidth + "px";
                        }
                        else {
                            if (bear1.offsetLeft + change < 0) {
                                bear1.style.left = (1600 - bear1.offsetLeft) + change + "px";
                            }
                            else {
                                bear1.style.left = bear1.offsetLeft + change + "px";
                            }
                        }
                    }
                }
            }
            if (dy > 0) {
                var closestPlatform = void 0;
                for (i = 0, length = platforms.length; i < length; i++) {
                    if (platforms[i].offsetLeft < bear1.offsetLeft + bear1.offsetWidth && platforms[i].offsetLeft + platforms[i].offsetWidth > bear1.offsetLeft) {
                        if (platforms[i].offsetTop >= bear1.offsetTop + bear1.offsetHeight) {
                            if (closestPlatform === undefined || platforms[i].offsetTop < closestPlatform.offsetTop) {
                                closestPlatform = platforms[i];
                            }
                        }
                    }
                }
                if (closestPlatform !== undefined && bear1.offsetTop + bear1.offsetHeight === closestPlatform.offsetTop) {
                }
                else if (closestPlatform !== undefined && bear1.offsetTop + bear1.offsetHeight + 8 >= closestPlatform.offsetTop) {
                    bear1.style.top = closestPlatform.offsetTop - bear1.offsetHeight + "px";
                }
                else if (closestPlatform !== undefined) {
                    bear1.style.top = bear1.offsetTop + 8 + "px";
                }
            }
            else {
                var closestPlatform = void 0;
                for (i = 0, length = platforms.length; i < length; i++) {
                    if (platforms[i].offsetLeft < bear1.offsetLeft + bear1.offsetWidth && platforms[i].offsetLeft + platforms[i].offsetWidth > bear1.offsetLeft) {
                        if (platforms[i].offsetTop + platforms[i].offsetHeight <= bear1.offsetTop) {
                            if (closestPlatform === undefined || platforms[i].offsetTop + platforms[i].offsetHeight > closestPlatform.offsetTop + closestPlatform.offsetHeight) {
                                closestPlatform = platforms[i];
                            }
                        }
                    }
                }
                if (closestPlatform !== undefined && bear1.offsetTop === closestPlatform.offsetTop + closestPlatform.offsetHeight) {
                    clearTimeout(jumpTimeout);
                    dy = 8;
                }
                else if (closestPlatform !== undefined && bear1.offsetTop - 8 <= closestPlatform.offsetTop + closestPlatform.offsetHeight) {
                    bear1.style.top = closestPlatform.offsetTop + closestPlatform.offsetHeight + "px";
                    clearTimeout(jumpTimeout);
                    dy = 8;
                }
                else {
                    bear1.style.top = bear1.offsetTop - 8 + "px";
                }
            }
            var touchingBall;
            if (!ballInPocession) {
                if (snail.occupied !== self) {
                    for (i = 0, length = balls.length; i < length; i++) {
                        if (balls[i].held === false && intersects(balls[i].element, bear1)) {
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
                ballInPocession.element.style.top = bear1.offsetTop - ballInPocession.element.offsetHeight + "px";
                ballInPocession.element.style.left = bear1.offsetLeft + ((bear1.offsetWidth / 2) - (ballInPocession.element.offsetWidth / 2)) + "px";
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
                    if (platforms[i].offsetLeft < bear1.offsetLeft + bear1.offsetWidth && platforms[i].offsetLeft + platforms[i].offsetWidth > bear1.offsetLeft) {
                        if (platforms[i].offsetTop === bear1.offsetTop + bear1.offsetHeight) {
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
    }
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
    snail = new Snail(document.getElementById("snail"), new Goal(document.getElementById("goal-blue"), Side.BLUE), new Goal(document.getElementById("goal-gold"), Side.GOLD));
    new Bear("bear1", Side.BLUE, 37, 39, 32);
    new Bear("bear2", Side.GOLD, 65, 68, 69);
};
