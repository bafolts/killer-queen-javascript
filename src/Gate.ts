
class Gate {
    public side: Side | undefined;
    public shutting: boolean = false;
    constructor(public element: HTMLElement) {
        let self = this;
    }

    public shut(): void {
        let self = this;
        this.shutting = true;
        setTimeout(function() {
            self.element.className = "gate almost";
            setTimeout(function() {
                self.element.className = "gate practically";
                setTimeout(function() {
                    self.element.className = "gate shut";
                }, 250);
            }, 250);
        }, 250);
    }
}

