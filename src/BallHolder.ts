
class BallHolder {
    public occupied: boolean = false;
    public side: Side;
    constructor(public element: HTMLElement) {
        this.side = this.element.offsetLeft < 800 ? Side.BLUE : Side.GOLD;
    }

    public occupy(ball: Ball): void {
        this.occupied = true;
        this.element.className += " occupied";
        ball.element.parentNode.removeChild(ball.element);
    }
}

