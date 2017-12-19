
class Queen {
    private dx: number = 0;
    private dy: number = 0;
    private swinging: boolean = false;
    constructor(public element: HTMLElement, private className: string, public side: Side, private gamepadIndex: number) {
        this.setupControls();
        requestAnimationFrame(this.animate.bind(this));
    }

    private animate(): void {
        let change: number = this.dx;
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
        requestAnimationFrame(this.animate.bind(this));
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
            }

            // 37 = left
            // 39 = right
            // 38 = up
            // 40 = down
        });
    }
}
