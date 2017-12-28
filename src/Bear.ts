
function getClosestWallToLeft(element: HTMLElement): HTMLElement | undefined {
    
    var closestWall;
    for (let i = 0, length = walls.length; i < length; i++) {
        if (walls[i].offsetTop <= element.offsetTop && walls[i].offsetTop + walls[i].offsetHeight >= element.offsetTop) {
            if (walls[i].offsetLeft + walls[i].offsetWidth <= element.offsetLeft) {
                if (closestWall === undefined || walls[i].offsetLeft > closestWall.offsetLeft) {
                    closestWall = walls[i];
                }
            }
        }
    }
    for (let i = 0, length = platforms.length; i < length; i++) {
        if (
            (platforms[i].offsetTop >= element.offsetTop && platforms[i].offsetTop <= element.offsetTop + element.offsetHeight) ||
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

function getClosestWallToRight(element: HTMLElement): HTMLElement | undefined {
    var closestWall;
    for (let i = 0, length = walls.length; i < length; i++) {
        if (walls[i].offsetTop <= element.offsetTop && walls[i].offsetTop + walls[i].offsetHeight >= element.offsetTop) {
            if (walls[i].offsetLeft >= element.offsetLeft + element.offsetWidth) {
                if (closestWall === undefined || walls[i].offsetLeft < closestWall.offsetLeft) {
                    closestWall = walls[i];
                }
            }
        }
    }
    for (let i = 0, length = platforms.length; i < length; i++) {
        if (
            (platforms[i].offsetTop >= element.offsetTop && platforms[i].offsetTop <= element.offsetTop + element.offsetHeight) ||
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

function getClosestPlatformBelow(element: HTMLElement): HTMLElement | undefined {
    let closestPlatform;
    for (let i = 0, length = platforms.length; i < length; i++) {
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

function getClosestPlatformAbove(element: HTMLElement): HTMLElement | undefined {
    let closestPlatform;
    for (let i = 0, length = platforms.length; i < length; i++) {
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

function animateMoveRight(element: HTMLElement, closestWall: HTMLElement | undefined, distance: number): void {
    if (closestWall !== undefined && element.offsetLeft + element.offsetWidth === closestWall.offsetLeft) {
    } else if (closestWall !== undefined && element.offsetLeft + element.offsetWidth + distance >= closestWall.offsetLeft) {
        element.style.left = (closestWall.offsetLeft - element.offsetWidth) + "px";
    } else {
        if (element.offsetLeft + element.offsetWidth >= 1600) {
            element.style.left = 0 + distance + "px";
        } else {
            element.style.left = element.offsetLeft + distance + "px";
        }
    }
}

function animateMoveLeft(element: HTMLElement, closestWall: HTMLElement | undefined, distance: number): void {
    if (closestWall !== undefined && element.offsetLeft === closestWall.offsetLeft + closestWall.offsetWidth) {
    } else if (closestWall !== undefined && element.offsetLeft + distance <= closestWall.offsetLeft + closestWall.offsetWidth) {
       element.style.left = closestWall.offsetLeft + closestWall.offsetWidth + "px";
    } else {
        if (element.offsetLeft + distance < 0) {
            element.style.left = (1600 - element.offsetLeft) + distance + "px";
        } else {
            element.style.left = element.offsetLeft + distance + "px";
        }
    }
}

function animateFreeFalling(element: HTMLElement, closestPlatform: HTMLElement | undefined, distance: number): void {
    if (closestPlatform !== undefined && element.offsetTop + element.offsetHeight === closestPlatform.offsetTop) {
    } else if (closestPlatform !== undefined && element.offsetTop + element.offsetHeight + distance >= closestPlatform.offsetTop) {
        element.style.top = closestPlatform.offsetTop - element.offsetHeight + "px";
    } else if (closestPlatform !== undefined) {
        element.style.top = element.offsetTop + distance + "px";
    }
}

function animateRising(element: HTMLElement, closestPlatform: HTMLElement | undefined, distance: number): void {
    if (closestPlatform !== undefined && element.offsetTop === closestPlatform.offsetTop + closestPlatform.offsetHeight) {
    } else if (closestPlatform !== undefined && element.offsetTop + distance <= closestPlatform.offsetTop + closestPlatform.offsetHeight) {
        element.style.top = closestPlatform.offsetTop + closestPlatform.offsetHeight + "px";
    } else {
        element.style.top = Math.max(0, element.offsetTop + distance) + "px";
    }
}

function addExplodingParticleForDeath(element: HTMLElement): void {
    let particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = element.offsetLeft + (element.offsetWidth / 2) + "px";
    particle.style.top = element.offsetTop + (element.offsetHeight / 2) + "px";
    document.getElementById("stage").appendChild(particle);
    setTimeout(function() {
        particle.style.opacity = "0";
        particle.style.transition = "0.75s";
        particle.style.transitionTimingFunction = "ease";
        particle.style.transform = "translate(" + ((100 * Math.cos(Math.random() * Math.PI * 2)) | 0) + "px, " + ((100 * Math.sin(Math.random() * Math.PI * 2)) | 0) + "px)";
        setTimeout(function() {
            particle.parentNode.removeChild(particle);
        }, 750);
    }, 0);
}

class Bear {

    private game: number;
    private bearLoop: number;
    private buttonChecker: number;

    private checkForWin(): void {
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
    }
 
    public killedBySword(): void {
        clearInterval(this.bearLoop);
        for (var i = 0; i < 20; i++) {
            addExplodingParticleForDeath(this.element);
        }
        this.element.parentNode.removeChild(this.element);
    }

    public destroy(): void {
        clearInterval(this.bearLoop);
        clearTimeout(this.snailAnimator);
        cancelAnimationFrame(this.snailAnimator);
        cancelAnimationFrame(this.buttonChecker);
        if (this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }

    private changeToWarrior(): void {
        clearInterval(this.bearLoop);
        this.element.parentNode.removeChild(this.element);

    }

    private animateStanding(): void {
        this.element.className = "bear " + this.className;
    }

    private animateWalkLeft(): void {
        let nextClass: string = "bear " + this.className + " left";
        if (this.element.className === nextClass) {
            this.element.className = nextClass + "2";
        } else {
            this.element.className = nextClass;
        }
    }

    private animateWalkRight(): void {
        let nextClass: string = "bear " + this.className + " right";
        if (this.element.className === nextClass) {
            this.element.className = nextClass + "2";
        } else {
            this.element.className = nextClass;
        }
    }

    private snailAnimator: number;

    constructor(public element: HTMLElement, public className: string, public side: Side, gamepadIndex: number) {

        element.className = "bear " + className;

        let dx: number = 0;
        let dy: number = 8;
        let jumpTimeout: number;
        let jumpStart: boolean = false;
        let ballInPocession: Ball | undefined;
        let leftSnail: number = (new Date()).getTime();
        let self = this;

        function animateSnail(): void {
            if ((new Date()).getTime() - leftSnail > 2000 && snail.occupied === undefined && intersects(snail.element, self.element)) {
                snail.occupy(self);
            } else if (snail.occupied === self && dx !== 0) {
                let deltaMove = dx > 0 ? 1 : -1;
                let direction = dx > 0 ? "right" : "left";
                snail.element.style.left = snail.element.offsetLeft + deltaMove + "px";
                if (snail.element.className === "snail " + direction) {
                    snail.element.className = "snail " + direction + " again";
                } else {
                    snail.element.className = "snail " + direction;
                }
                self.element.className = "bear " + self.className + " " + direction;
                snail.checkForWin();
                self.element.style.left = snail.element.offsetLeft + (snail.element.offsetWidth / 2) - (self.element.offsetWidth / 2) + "px";
            }
            this.snailAnimator = setTimeout(function() {
                self.snailAnimator = requestAnimationFrame(animateSnail);
            }, 100);
        }

        self.snailAnimator = requestAnimationFrame(animateSnail);

        this.bearLoop = setInterval(function() {
            let i: number;
            let length: number;
            if (snail.occupied !== self) {
                if (dx === 0) {
                    self.animateStanding();
                }
                if (dx !== 0) {
                    var currentLeft = self.element.offsetLeft;
                    var change = dx;

                    if (change > 0) {
                        self.animateWalkRight();
                    } else {
                        self.animateWalkLeft();
                    }

                    if (change > 0) {
                        let closestWall = getClosestWallToRight(self.element);
                        animateMoveRight(self.element, closestWall, change);
                    } else {
                        let closestWall = getClosestWallToLeft(self.element);
                        animateMoveLeft(self.element, closestWall, change);
                    }
                }
            }

            if (dy > 0) {
                animateFreeFalling(
                    self.element,
                    getClosestPlatformBelow(self.element),
                    8
                );
            } else {
                let closestPlatform = getClosestPlatformAbove(self.element);
                if (closestPlatform !== undefined && self.element.offsetTop === closestPlatform.offsetTop + closestPlatform.offsetHeight) {
                    clearTimeout(jumpTimeout);
                    dy = 8;
                } else if (closestPlatform !== undefined && self.element.offsetTop - 8 <= closestPlatform.offsetTop + closestPlatform.offsetHeight) {
                    self.element.style.top = closestPlatform.offsetTop + closestPlatform.offsetHeight + "px";
                    clearTimeout(jumpTimeout);
                    dy = 8;
                } else {
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
            } else {
                ballInPocession.element.style.top = self.element.offsetTop - ballInPocession.element.offsetHeight + "px";
                ballInPocession.element.style.left = self.element.offsetLeft + ((self.element.offsetWidth / 2) - (ballInPocession.element.offsetWidth / 2)) + "px";

                for (i = 0, length = gates.length; i < length; i++) {
                    if (gates[i].isOpen === true && gates[i].side === self.side && intersects(self.element, gates[i].element)) {
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

        function canStartJump(): void {
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
                        jumpTimeout = setTimeout(function() {
                            dy = 8;
                        }, 750);
                        break;
                    }
                }
            }
        }

        function canStopJump(): void {
            dy = 8;
            jumpStart = false;
            clearTimeout(jumpTimeout);
        }

        function checkButtons(): void {
            let gamepad = window.navigator.getGamepads()[gamepadIndex];
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
            self.buttonChecker = window.requestAnimationFrame(checkButtons);
        }

        self.buttonChecker = window.requestAnimationFrame(checkButtons);
}
}
