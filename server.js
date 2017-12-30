

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

const gates = [{
    left: 20,
    top: 750,
    side: 0
}, {
    left: 1600 - 20 - 60,
    top: 750,
    side: 1
}];

const ballHolders = [{
    id: 0,
    left: 730,
    top: 60
}, {
    id: 1,
    left: 730,
    top: 40
}, {
    id: 2,
    left: 710,
    top: 70
}, {
    id: 3,
    left: 710,
    top: 50
}, {
    id: 4,
    left: 710,
    top: 30
}, {
    id: 5,
    left: 690,
    top: 60
}, {
    id: 6,
    left: 690,
    top: 40
}, {
    id: 7,
    left: 670,
    top: 70
}, {
    id: 8,
    left: 670,
    top: 50
}, {
    id: 9,
    left: 670,
    top: 30
}, {
    id: 10,
    left: 650,
    top: 60
}, {
    id: 11,
    left: 650,
    top: 40
}, {
    id: 12,
    left: 1600 - 730 - 15,
    top: 60
}, {
    id: 13,
    left: 1600 - 730 - 15,
    top: 40
}, {
    id: 14,
    left: 1600 - 710 - 15,
    top: 70
}, {
    id: 15,
    left: 1600 - 710 - 15,
    top: 50
}, {
    id: 16,
    left: 1600 - 710 - 15,
    top: 30
}, {
    id: 17,
    left: 1600 - 690 - 15,
    top: 60
}, {
    id: 18,
    left: 1600 - 690 - 15,
    top: 40
}, {
    id: 19,
    left: 1600 - 670 - 15,
    top: 70
}, {
    id: 20,
    left: 1600 - 670 - 15,
    top: 50
}, {
    id: 21,
    left: 1600 - 670 - 15,
    top: 30
}, {
    id: 22,
    left: 1600 - 650 - 15,
    top: 60
}, {
    id: 23,
    left: 1600 - 650 - 15,
    top: 40
}];

const balls = [{
    id: 0,
    left: 793,
    top: 706
}, {
    id: 1,
    left: 776,
    top: 706
}, {
    id: 2,
    left: 810,
    top: 706
}, {
    id: 3,
    left: 803,
    top: 690
}, {
    id: 4,
    left: 785,
    top: 690
}, {
    id: 5,
    left: 793,
    top: 674
}, {
    id: 6,
    left: 793,
    top: 614
}, {
    id: 7,
    left: 776,
    top: 614
}, {
    id: 8,
    left: 810,
    top: 614
}, {
    id: 9,
    left: 803,
    top: 598
}, {
    id: 10,
    left: 785,
    top: 598
}, {
    id: 11,
    left: 793,
    top: 582
}, {
    id: 12,
    left: 961,
    top: 521
}, {
    id: 13,
    left: 944,
    top: 521
}, {
    id: 14,
    left: 978,
    top: 521
}, {
    id: 15,
    left: 971,
    top: 505
}, {
    id: 16,
    left: 951,
    top: 505
}, {
    id: 17,
    left: 961,
    top: 489
}, {
    id: 18,
    left: 1600 - 961 - 14,
    top: 521
}, {
    id: 19,
    left: 1600 - 944 - 14,
    top: 521
}, {
    id: 20,
    left: 1600 - 978 - 14,
    top: 521
}, {
    id: 21,
    left: 1600 - 971 - 14,
    top: 505
}, {
    id: 22,
    left: 1600 - 951 - 14,
    top: 505
}, {
    id: 23,
    left: 1600 - 961 - 14,
    top: 489
}, {
    id: 24,
    left: 190,
    top: 614
}, {
    id: 25,
    left: 173,
    top: 614
}, {
    id: 26,
    left: 207,
    top: 614
}, {
    id: 27,
    left: 200,
    top: 598
}, {
    id: 28,
    left: 180,
    top: 598
}, {
    id: 29,
    left: 190,
    top: 582
}, {
    id: 30,
    left: 1600 - 190 - 14,
    top: 614
}, {
    id: 31,
    left: 1600 - 173 - 14,
    top: 614
}, {
    id: 32,
    left: 1600 - 207 - 14,
    top: 614
}, {
    id: 33,
    left: 1600 - 200 - 14,
    top: 598
}, {
    id: 34,
    left: 1600 - 180 - 14,
    top: 598
}, {
    id: 35,
    left: 1600 - 190 - 14,
    top: 582
}, {
    id: 36,
    left: 308,
    top: 816
}, {
    id: 37,
    left: 325,
    top: 816
}, {
    id: 38,
    left: 291,
    top: 816
}, {
    id: 39,
    left: 316,
    top: 800
}, {
    id: 40,
    left: 299,
    top: 800
}, {
    id: 41,
    left: 308,
    top: 784
}, {
    id: 42,
    left: 1600 - 308 - 14,
    top: 816
}, {
    id: 43,
    left: 1600 - 325 - 14,
    top: 816
}, {
    id: 44,
    left: 1600 - 291 - 14,
    top: 816
}, {
    id: 45,
    left: 1600 - 316 - 14,
    top: 800
}, {
    id: 46,
    left: 1600 - 299 - 14,
    top: 800
}, {
    id: 47,
    left: 1600 - 308 - 14,
    top: 784
}];

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
//   2 = GOAL
// 1 = BALL
// 2 = BALL HOLDER
function getLevel() {
    let level = new Uint16Array(1 + (walls.length * 5) + (platforms.length * 4) + (gates.length * 4));
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
    for (let i = 0; i < gates.length; i++) {
        let start = (i * 4) + 1 + (walls.length * 5) + (platforms.length * 4);
        level[start] = 2;
        level[start + 1] = gates[i].top;
        level[start + 2] = gates[i].left;
        level[start + 3] = gates[i].side;
    }
    return level;
}

function getBall() {
    let ball = new Uint16Array(1 + (balls.length * 3));
    ball[0] = 1;
    for (let i = 0; i < balls.length; i++) {
        let start = (i * 3) + 1;
        ball[start] = balls[i].id;
        ball[start + 1] = balls[i].top;
        ball[start + 2] = balls[i].left;
    }
    return ball;
}

function getBallHolders() {
    let data = new Uint16Array(1 + (ballHolders.length * 4));
    data[0] = 2;
    for (let i = 0; i < ballHolders.length; i++) {
        let start = (i * 4) + 1;
        data[start] = ballHolders[i].id;
        data[start + 1] = ballHolders[i].top;
        data[start + 2] = ballHolders[i].left;
        data[start + 3] = ballHolders[i].side;
    }
    return data;
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
    ws.send(getBall().buffer);
    ws.send(getBallHolders().buffer);
});
wss.on('error', function() {

});
