
class Ball {
    public held: boolean = false;
    constructor(public element: HTMLElement) {
    }

    public removeFromPlay(): void {
        this.element.parentNode.removeChild(this.element);
        balls.splice(balls.indexOf(this), 1);
    }

    public destroy(): void {
        if (this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
}

