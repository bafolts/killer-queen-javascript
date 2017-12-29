
class Snail {
    public occupied: Bear | undefined;
    public eating: boolean = false;
    public facingRight: boolean = true;
    constructor(public element: HTMLElement, public goal1: Goal, public goal2: Goal) {

    }
    public checkForWin = function() {
        if (this.element.offsetLeft + this.element.offsetWidth < this.goal1.element.offsetLeft + this.goal1.element.offsetWidth) {
            alert("BLUE WIN");
        } else if (this.element.offsetLeft > this.goal2.element.offsetLeft) {
            alert("GOLD WIN");
        }
    }
    public setFacingRight(right: boolean): void {
        this.facingRight = right;
        if (this.facingRight) {
            if (this.element.className === "snail right") {
                this.element.className = "snail right again";
            } else {
                this.element.className = "snail right";
            }
        } else {
            if (this.element.className === "snail left") {
                this.element.className = "snail left again";
            } else {
                this.element.className = "snail left";
            }
        }
    }
    public occupy(bear: Bear): void {
        this.occupied = bear;
    }
    public unoccupy(): void {
        this.occupied = undefined;
    }
    public canEat(bear: Bear): boolean {
        return intersects(bear.element, this.element);
    }
    public eat(bear: Bear): void {
        let self = this;
        this.eating = true;
        let direction = this.facingRight ? "right" : "left";
        this.element.className = "snail " + direction + " eat";
        setTimeout(function() {
            self.element.className = "snail " + direction + " eat2";
            setTimeout(function() {
                self.element.className = "snail " + direction;
                self.eating = false;
            }, 250);
        }, 250);
        bear.destroy();
    }
}


