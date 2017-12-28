
class Queen {
    private dx: number = 0;
    private dy: number = 8;
    private swinging: boolean = false;
    private flapping: boolean = false;
    private swordElement: HTMLElement;
    private swordFacingRight: boolean = true;
    private killedBearDuringSwing: boolean = false;
    private animator: number;
    private buttonChecker: number;
    constructor(public element: HTMLElement, private className: string, public side: Side, private gamepadIndex: number) {
        this.buttonChecker = requestAnimationFrame(this.checkButtons.bind(this));
        this.animator = requestAnimationFrame(this.animate.bind(this));
        this.addSword();
        element.className += " " + className;
    }
    public destroy(): void {
        if (this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        clearTimeout(this.animator);
        cancelAnimationFrame(this.animator);
        cancelAnimationFrame(this.buttonChecker);
    }
    private addSword(): void {
        let sword = document.createElement("div");
        sword.className = "sword";
        sword.appendChild(document.createElement("div"));
        this.element.appendChild(sword);
        this.swordElement = sword;
    }

    private swing(): void {
        this.swinging = true;
        let self = this;
        let angle: number = 0;
        let doSwing = function() {
            if (angle < 90) {
                setTimeout(function() {
                    angle += 10;
                    if (self.swordFacingRight) {
                        self.swordElement.style.transform = "rotate(" + (angle + 90 ) + "deg)";
                    } else {
                        self.swordElement.style.transform = "rotate(" + (-90 - angle) + "deg)";
                    }
                    doSwing();
                }, 25);
            } else {
                if (self.swordFacingRight) {
                    self.swordElement.style.transform = "rotate(90deg)";
                } else {
                    self.swordElement.style.transform = "rotate(-90deg)";
                }
                setTimeout(function() {
                    self.swinging = false;
                    self.killedBearDuringSwing = false;
                }, 500);
            }
        };
        doSwing();
    }

    private animate(): void {
        let change: number = this.dx;
        let self = this;
        if (this.dx > 0) {
            this.swordFacingRight = true;
        } else if (this.dx < 0) {
            this.swordFacingRight = false;
        }
        if (!self.swordFacingRight) {
            self.swordElement.style.left = "0px";
            self.swordElement.style.transform = "rotate(-90deg)";
        } else {
            self.swordElement.style.left = "35px";
            self.swordElement.style.transform = "rotate(90deg)";
        }
        if (this.dx > 0) {
            self.element.className = "queen " + self.className + " right";
            animateMoveRight(
                this.element,
                getClosestWallToRight(this.element),
                this.dx
            );
        } else if (this.dx < 0) {
            self.element.className = "queen " + self.className + " left";
            animateMoveLeft(
                this.element,
                getClosestWallToLeft(this.element),
                this.dx
            );
        } else if (this.dy <= 8) {
            self.element.className = "queen " + self.className;
        }
        if (this.dy > 0) {
            animateFreeFalling(
                this.element,
                getClosestPlatformBelow(this.element),
                this.dy
            );
        } else if (this.dy < 0) {
            animateRising(
                this.element,
                getClosestPlatformAbove(this.element),
                this.dy
            );
        }
        for (let i = 0, length = gates.length; i < length; i++) {
            if (intersects(gates[i].element, self.element)) {
                gates[i].setSide(self.side);
            }
        }
        for (let i = 0, length = bears.length; i < length; i++) {
            if (bears[i].side !== self.side && intersects(bears[i].element, self.element) && self.swinging === false) {
                self.swing();
                break;
            } else if (bears[i].side !== self.side && self.killedBearDuringSwing === false && intersects(bears[i].element, self.swordElement) && self.swinging === true) {
                self.killedBearDuringSwing = true;
                bears[i].killedBySword();
                break;
            }
        }
        for (let i = 0, length = queens.length; i < length; i++) {
            if (queens[i] !== self && intersects(queens[i].element, self.element) && self.swinging === false) {
                self.swing();
                break;
            } else if (queens[i] !== self && self.killedBearDuringSwing === false && intersects(queens[i].element, self.element) && self.swinging === true) {
                self.killedBearDuringSwing = true;
                queens[i].killedBySword();
                break;
            }
        }
        this.animator = setTimeout(function() {
            self.animator = requestAnimationFrame(self.animate.bind(self));
        }, 50);
    }

    public killedBySword(): void {
        for (var i = 0; i < 100; i++) {
            addExplodingParticleForDeath(this.element);
        }
        this.element.parentNode.removeChild(this.element);
    }

    private checkButtons(): void {
        let gamepad = window.navigator.getGamepads()[this.gamepadIndex];
        let self = this;
        if (gamepad) {
            this.dx = gamepad.axes[0] * 5;
            if (gamepad.axes[1] > 0) {
                this.dy = 32;
                this.element.className = "queen " + this.className + " diving";
            } else if (this.dy === 32) {
                this.dy = 8;
                this.element.className = "queen " + this.className;
            }
            for (var i = 0; i < gamepad.buttons.length; i++) {
                if (gamepad.buttons[i].pressed) {
                    if (this.flapping === false) {
                        this.flapping = true;
                        this.dy = -8;
                        setTimeout(function() {
                            self.dy = 8;
                            self.flapping = false;
                        }, 400);
                    }
                    break;
                }
            }
        }
        this.buttonChecker = window.requestAnimationFrame(this.checkButtons.bind(this));
    }
}
