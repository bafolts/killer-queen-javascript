
class Queen {
    private dx: number = 0;
    private dy: number = 8;
    private swinging: boolean = false;
    private flapping: boolean = false;
    private headingLeft: boolean = false;
    private swordElement: HTMLElement;
    private killedBearDuringSwing: boolean = false;
    constructor(public element: HTMLElement, private className: string, public side: Side, private gamepadIndex: number) {
        this.setupControls();
        requestAnimationFrame(this.animate.bind(this));
        this.addSword();
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
                    self.swordElement.style.transform = "rotate(" + angle + "deg)";
                    doSwing();
                }, 25);
            } else {
                self.swordElement.style.transform = "rotate(0deg)";
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
        this.headingLeft = this.dx < 0;
        if (this.headingLeft) {
            self.swordElement.style.left = "-6px";   
        } else {
            self.swordElement.style.left = "40px";
        }
        if (this.dx > 0) {
            animateMoveRight(
                this.element,
                getClosestWallToRight(this.element),
                this.dx
            );
        } else {
            animateMoveLeft(
                this.element,
                getClosestWallToLeft(this.element),
                this.dx
            );
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
        setTimeout(function() {
            requestAnimationFrame(self.animate.bind(self));
        }, 50);
    }

    private setupControls(): void {

        let self = this;

        document.addEventListener("keyup", function(e) {
            if (e.keyCode === 37 || e.keyCode === 39) {
                self.dx = 0;
            }
            if (e.keyCode === 40) {
                self.dy = 8;
            }
        });

        document.addEventListener("keydown", function(e) {
            if (e.keyCode === 37) {
                self.dx = -8;
            } else if (e.keyCode === 39) {
                self.dx = 8;
            } else if (e.keyCode === 40) {
                self.dy = 16;
            } else if (e.keyCode === 32 && self.flapping === false) {
                self.flapping = true;
                self.dy = -4;
                setTimeout(function() {
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
    }
}
