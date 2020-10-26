function playerAlive(field) {
    const result = [];
    for (let i1 = 0; i1 < field.length; i1 += 1) {
        for (let i2 = 0; i2 < field[i1].length; i2 += 1) {
            if (field[i1][i2] === '\u0050') {
                result.push([i1, i2]);
            }
        }
    }
    return result.length !== 0;
}

function clearFire(field, y, x) {
    const cleanable = ['\u0046'];
    if (cleanable.includes(field[y][x + 1])) {
        field[y][x + 1] = ' ';
        if (cleanable.includes(field[y][x + 2])) {
            field[y][x + 2] = ' ';
            if (cleanable.includes(field[y][x + 3])) {
                field[y][x + 3] = ' ';
            }
        }
    }
    if (cleanable.includes(field[y][x - 1])) {
        field[y][x - 1] = ' ';
        if (cleanable.includes(field[y][x - 2])) {
            field[y][x - 2] = ' ';
            if (cleanable.includes(field[y][x - 3])) {
                field[y][x - 3] = ' ';
            }
        }
    }
    if (cleanable.includes(field[y + 1][x])) {
        field[y + 1][x] = ' ';
        if (cleanable.includes(field[y + 2][x])) {
            field[y + 2][x] = ' ';
            if (cleanable.includes(field[y + 3][x])) {
                field[y + 3][x] = ' ';
            }
        }
    }
    if (cleanable.includes(field[y - 1][x])) {
        field[y - 1][x] = ' ';
        if (cleanable.includes(field[y - 2][x])) {
            field[y - 2][x] = ' ';
            if (cleanable.includes(field[y - 3][x])) {
                field[y - 3][x] = ' ';
            }
        }
    }
    if (!playerAlive(field)) {
        alert('You Lose!');
    }
    field[y][x] = ' ';
}

export default clearFire;