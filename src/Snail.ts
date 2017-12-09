
class Snail {
    public occupied: Bear | undefined;
    constructor(public element: HTMLElement, public goal1: Goal, public goal2: Goal) {

    }
    public checkForWin = function() {
        if (this.element.offsetLeft + this.element.offsetWidth < this.goal1.element.offsetLeft + this.goal1.element.offsetWidth) {
            alert("BLUE WIN");
        } else if (this.element.offsetLeft > this.goal2.element.offsetLeft) {
            alert("GOLD WIN");
        }
    }
    public occupy(bear: Bear): void {
        this.occupied = bear;
    }
    public unoccupy(): void {
        this.occupied = undefined;
    }
}


