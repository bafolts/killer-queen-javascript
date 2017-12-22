
class Queen {
    private dx: number = 0;
    private dy: number = 8;
    private swinging: boolean = false;
    private flapping: boolean = false;
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
    }

    private animate(): void {
        let change: number = this.dx;
        let self = this;
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
