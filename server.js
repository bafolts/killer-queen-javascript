

// return all bear axis
// 01 01 01 01 01 01 01 01 000 000
//
// b1, x, y, class
// b2, x, y, class
// b3, x, y, class
// b4, x, y, class
// b5, x, y, class
// b6, x, y, class
// b7, x, y, class
// b8, x, y, class
//
// q1, x, y, class
// q2, x, y, class
// snail, x, y, class
//
// gate, x, y, class
// gate, x, y, class
// gate, x, y, class
// gate, x, y, class
// gate, x, y, class
//
//

const SERVER_PORT = 8080;
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: SERVER_PORT });

const walls = [{
    top: 0,
    left: 0,
    height: 370,
    width: 18
}, {
    top: 0,
    left: 1600 - 18,
    height: 370,
    width: 18
}, {
    top: 0,
    left: 782,
    height: 185,
    width: 36
}];

const platforms = [{
    width: 80,
    left: 18,
    top: 167
}, {
    width: 80,
    left: 18,
    top: 352
}, {
    width: 80,
    left: 1600 - 18 - 80,
    top: 167
}, {
    width: 80,
    left: 1600 - 18 - 80,
    top: 352
}, {
    width: 430,
    left: 585,
    top: 167
}, {
    width: 115,
    left: 280,
    top: 167
}, {
    width: 115,
    left: 1600 - 280 - 115,
    top: 167
}, {
    width: 50,
    top: 260,
    left: 164
}, {
    width: 50,
    top: 260,
    left: 465
}, {
    width: 50,
    top: 260,
    left: 1600 - 164 - 50
}, {
    width: 50,
    top: 260,
    left: 1600 - 465 - 50
}, {
    width: 115,
    left: 280,
    top: 352
}, {
    width: 115,
    left: 1600 - 280 - 115,
    top: 352
}, {
    width: 80,
    left: 585,
    top: 352
}, {
    width: 80,
    left: 1600 - 585 - 80,
    top: 352
}, {
    width: 1600,
    left: 0,
    top: 850 -18
}, {
    width: 98,
    left: 0,
    top: 537
}, {
    width: 98,
    left: 1600 - 0 - 98,
    top: 537
}, {
    width: 98,
    left: 0,
    top: 722
}, {
    width: 98,
    left: 1600 - 0 - 98,
    top: 722
}, {
    width: 430,
    top: 722,
    left: 585
}, {
    width: 355,
    top: 450,
    left: 164
}, {
    width: 355,
    top: 450,
    left: 1600 - 164 - 355
}, {
    width: 110,
    top: 450,
    left: 745
}, {
    width: 110,
    top: 630,
    left: 745
}, {
    width: 110,
    top: 630,
    left: 409
}, {
    width: 110,
    top: 630,
    left: 1600 - 409 - 110
}, {
    width: 70,
    top: 630,
    left: 164
}, {
    width: 70,
    top: 630,
    left: 1600 - 164 - 70
}, {
    width: 50,
    top: 722,
    left: 1600 - 295 - 50
}, {
    width: 50,
    top: 722,
    left: 295
}, {
    width: 90,
    left: 1600 - 585 - 90,
    top: 537
}, {
    width: 90,
    left: 585,
    top: 537
}];

console.log("Starting server on port " + SERVER_PORT);

// 0 = LEVEL
//   0 = WALL
//   1 = PLATFORM
function getLevel() {
    let level = new Uint16Array(1 + (walls.length * 5) + (platforms.length * 4));
    level[0] = 0;
    for (let i = 0; i < walls.length; i++) {
        let start = (i * 5) + 1;
        level[start] = 0;
        level[start + 1] = walls[i].top;
        level[start + 2] = walls[i].left;
        level[start + 3] = walls[i].height;
        level[start + 4] = walls[i].width;
    }
    for (let i = 0; i < platforms.length; i++) {
        let start = (i * 4) + 1 + (walls.length * 5);
        level[start] = 1;
        level[start + 1] = platforms[i].top;
        level[start + 2] = platforms[i].left;
        level[start + 3] = platforms[i].width;
    }
    return level;
}

function getBoardState() {
    let state = new Uint16Array(4);
    state[0] = 0;
    state[1] = 0;
    state[2] = bear.left;
    state[3] = bear.top;
    return state;
}

let bear = {
    left: 700,
    top: 117
};
wss.on('connection', function connection(ws) {
    ws.on('error', function() {

    });
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });
    ws.send(getLevel().buffer);
});
wss.on('error', function() {

});
