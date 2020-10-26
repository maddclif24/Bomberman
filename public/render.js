import boom from './boom.js';
import clearFire from './clearFire.js';
import step from './moveMonsters.js';
import getRandomNum from './getRandomNum.js';

function giveWall(n, bricks, players, monsters) {
    const result = [];
    for (let i = 0; i <= n; i += 1) {
        if (bricks.includes(i)) {
            result.push('\u2588');
        } else if (players.includes(i)) {
            result.push('\u0050');
        } else if (monsters.includes(i)) {
            result.push('\u004D');
        } else result.push(' ');
    }
    return result;
}

function numberForBricks(num) {
    const result = [];
    for (let i = 0; i <= num; i += 1) {
        result.push(i);
    }
    return result;
}

function makeMonsters(h, w, field) {
    const countMonsters = Math.floor(((w - 1) * (h - 1) * 2) / 100);
    const monsters = [];
    for (let i = 0; i <= countMonsters; i += 1) {
        const monster = getRandomNum(1, w - 1);
        if (monsters.includes(monster)) {
            i -= 1;
        } else monsters.push(monster);
    }
    for (let i = 1; i < monsters.length; i += 1) {
        field[i][monsters[i]] = '\u004D';
    }
    return monsters;
}

function makePlayer(field, w, h) {
    let done = false;
    let result;
    while (!done) {
        const y = getRandomNum(1, h - 1);
        const x = getRandomNum(1, w - 1);
        if (field[y][x] === ' ') {
            field[y][x] = '\u0050';
            result = [y, x];
            done = true;
        }
    }
    return result;
}

function makeBricks(field, w, h) {
    const bricksCount = Math.floor(((w - 1) * (h - 1) * 18) / 100);
    let currentBricksCount = 0;
    while (currentBricksCount < bricksCount) {
        const y = getRandomNum(1, h - 1);
        const x = getRandomNum(1, w - 1);
        if (field[y][x] === ' ') {
            field[y][x] = '\u2588';
            currentBricksCount += 1;
        }
    }
}

function makeBoxes(field, w, h) {
    const boxesCount = Math.floor(((w - 1) * (h - 1) * 18) / 100);
    let currentBoxesCount = 0;
    while (currentBoxesCount < boxesCount) {
        const y = getRandomNum(1, h - 1);
        const x = getRandomNum(1, w - 1);
        if (field[y][x] === ' ') {
            field[y][x] = '\u2573';
            currentBoxesCount += 1;
        }
    }
}

function getField(h, w) {
    const horBricks = numberForBricks(w);

    const result = [
        giveWall(w, horBricks, [], []),
    ];

    for (let i = 1; i <= h; i += 1) {
      if (i === h) {
        result.push(giveWall(w, horBricks, [], []));
       } else result.push(giveWall(w, [0, w], [], []));
    }
    return result;
}

function makeField() {
    const minWidth = 20;
    const maxWidth = 50;
    const minHeight = 10;
    const maxHeight = 15;
    const widthField = getRandomNum(minWidth, maxWidth);
    const heightField = getRandomNum(minHeight, maxHeight);
    const field1 = getField(heightField, widthField);
    makeMonsters(heightField, widthField, field1);
    makeBricks(field1, widthField, heightField);
    makeBoxes(field1, widthField, heightField);
    const wherePlayer = makePlayer(field1, widthField, heightField);
    return [field1, wherePlayer];
}

const [field, player] = makeField();

function render(field) {
    const pre = document.getElementById('pre-field');
    for (const col of field) {
        for (const item of col) {
            pre.textContent += item;
        }
        pre.textContent += '\n';
    }
}

let indexX = player[1];
let indexY = player[0];

render(field);

function getMonsters(field) {
    const result = [];
    for (let i1 = 0; i1 < field.length; i1 += 1) {
        for (let i2 = 0; i2 < field[i1].length; i2 += 1) {
            if (field[i1][i2] === '\u004D') {
                result.push([i1, i2]);
            }
        }
    }
    return result;
}


setInterval(() => {
    let monsters = getMonsters(field);
    if (monsters.length === 0) {
        alert('You Win!');
        return;
    }
    monsters = step(field, monsters);
    for (let i = 0; i < monsters.length; i += 1) {
        let [y, x] = monsters[i];
        field[y][x] = '\u004D';
    }
    document.getElementById('pre-field').textContent = '';
    render(field);
}, 500);

document.addEventListener('keydown', function (event) {
    if (event.code === 'KeyA') {
        if (field[indexY][indexX - 1] === ' ') {
            field[indexY][indexX] = field[indexY][indexX] === '\u0042' ? '\u0042' : ' ';
            indexX -= 1;
            field[indexY][indexX] = '\u0050';
        }
        document.getElementById('pre-field').textContent = '';
        render(field);
    }
    if (event.code === 'KeyS') {
        if (field[indexY + 1][indexX] === ' ') {
            field[indexY][indexX] = field[indexY][indexX] === '\u0042' ? '\u0042' : ' ';
            indexY += 1;
            field[indexY][indexX] = '\u0050';
        }
        document.getElementById('pre-field').textContent = '';
        render(field);
    }
    if (event.code === 'KeyW') {
        if (field[indexY - 1][indexX] === ' ') {
            field[indexY][indexX] = field[indexY][indexX] === '\u0042' ? '\u0042' : ' ';
            indexY -= 1;
            field[indexY][indexX] = '\u0050';
        }
        document.getElementById('pre-field').textContent = '';
        render(field);
    }
    if (event.code === 'KeyD') {
        if (field[indexY][indexX + 1] === ' ') {
            field[indexY][indexX] = field[indexY][indexX] === '\u0042' ? '\u0042' : ' ';
            indexX += 1;
            field[indexY][indexX] = '\u0050';
        }
        document.getElementById('pre-field').textContent = '';
        render(field);
    }
    if (event.code === 'Space') {
        const [y, x] = [indexY, indexX];
        field[indexY][indexX] = '\u0042';
        document.getElementById('pre-field').textContent = '';
        render(field);
        setTimeout(() => {
            boom(field, y, x);
            document.getElementById('pre-field').textContent = '';
            render(field);
            setTimeout(() => {
               clearFire(field, y, x);
               document.getElementById('pre-field').textContent = '';
               render(field);
            }, 1000);
        }, 2500);
    }
});
