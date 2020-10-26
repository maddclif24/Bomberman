import getRandomNum from './getRandomNum.js';

function isCollision([y, x], roamM) {
    let collision = false;
    for (let i = 0; i < roamM.length; i += 1) {
        if (roamM[i][0] === y && roamM[i][1] === x) {
            collision = true;
        }
    }
    return collision;
}

function whereCanTheMonsterGo(monster, field, roamM) {
    const [y, x] = monster;
    const result = [];
    if (field[y - 1][x] === ' ' && !isCollision([y - 1, x], roamM)) {
        result.push('up');
    }
    if (field[y + 1][x] === ' ' && !isCollision([y + 1, x], roamM)) {
        result.push('down');
    }
    if (field[y][x - 1] === ' ' && !isCollision([y, x - 1], roamM)) {
        result.push('left');
    }
    if (field[y][x + 1] === ' ' && !isCollision([y, x + 1], roamM)) {
        result.push('right');
    }
    return result;
}

function step(field, monsters) {
    let roamM = [];
    for (let i = 0; i < monsters.length; i += 1) {
        let [y, x] = monsters[i];
        let directions = whereCanTheMonsterGo([y, x], field, roamM);
        const min = 0;
        const max = directions.length - 1;
        let randomNum = getRandomNum(min, max);
        let direction = directions[randomNum];
        if (direction === 'up') {
            roamM.push([y - 1, x]);
        }
        if (direction === 'down') {
            roamM.push([y + 1, x]);
        }
        if (direction === 'left') {
            roamM.push([y, x - 1]);
        }
        if (direction === 'right') {
            roamM.push([y, x + 1]);
        }
    }
    for (let i1 = 0; i1 < field.length; i1 += 1) {
        for (let i2 = 0; i2 < field[i1].length; i2 += 1) {
            if (field[i1][i2] === '\u004D') {
                field[i1][i2] = ' ';
            }
        }
    }
    return roamM;
}

export default step;