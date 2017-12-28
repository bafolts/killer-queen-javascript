
class Gate {
    public side: Side | undefined;
    public isShutting: boolean = false;
    public isShut: boolean = false;
    public isOpening: boolean = false;
    public isOpen: boolean = true;
    constructor(public element: HTMLElement) {
        let self = this;
    }

    public open(): void {
        let self = this;
        this.isShutting = false;
        this.isOpening = true;
        this.isShut = false;
        this.isOpen = false;
        setTimeout(function() {
            self.element.className = "gate practically";
            setTimeout(function() {
                self.element.className = "gate almost";
                setTimeout(function() {
                    self.element.className = "gate open";
                    self.isShut = false;
                    self.isShutting = false;
                    self.isOpen = true;
                    self.isOpening = false;
                }, 250);
            }, 250);
        }, 250);
    }

    public destroy(): void {
        this.element.parentNode.removeChild(this.element);
    }

    public setSide(side: Side): void {
        this.side = side;
        if (this.side === Side.BLUE) {
            this.element.style.backgroundColor = "blue";
        } else {
            this.element.style.backgroundColor = "gold";
        }
    }

    public shut(): void {
        let self = this;
        this.isOpen = false;
        this.isShut = false;
        this.isShutting = true;
        this.isOpening = false;
        setTimeout(function() {
            self.element.className = "gate almost";
            setTimeout(function() {
                self.element.className = "gate practically";
                setTimeout(function() {
                    self.element.className = "gate shut";
                    self.isShut = true;
                    self.isShutting = false;
                    self.isOpen = false;
                    self.isOpening = false;
                    setTimeout(function() {
                        self.open();
                    }, 500);
                }, 250);
            }, 250);
        }, 250);
    }
}

