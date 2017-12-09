
function intersects(item1: HTMLElement, item2: HTMLElement) {
    return !((item1.offsetLeft + item1.offsetWidth) < item2.offsetLeft ||
               item1.offsetLeft > (item2.offsetLeft + item2.offsetWidth) ||
               (item1.offsetTop + item1.offsetHeight) < item2.offsetTop ||
               item1.offsetTop > (item2.offsetTop + item2.offsetHeight));
}


