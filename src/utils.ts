
function realTop(item: HTMLElement): number {
    let top: number = item.offsetTop;
    while (item.parentElement) {
        top += item.parentElement.offsetTop;
        item = item.parentElement;
    }
    return top;
}

function realLeft(item: HTMLElement): number {
    let left: number = item.offsetLeft;
    while (item.parentElement) {
        left += item.parentElement.offsetLeft;
        item = item.parentElement;
    }
    return left;
}

function intersects(item1: HTMLElement, item2: HTMLElement): boolean {
    return !((realLeft(item1) + item1.offsetWidth) < realLeft(item2) ||
               realLeft(item1) > (realLeft(item2) + item2.offsetWidth) ||
               (realTop(item1) + item1.offsetHeight) < realTop(item2) ||
               realTop(item1) > (realTop(item2) + item2.offsetHeight));
}


