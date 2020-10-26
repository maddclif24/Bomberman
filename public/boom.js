function boom(field, y, x) {
    const canDestroyed = [' ', '\u004D', '\u0050', '\u2573'];
    if (canDestroyed.includes(field[y][x + 1])) {
        field[y][x + 1] = '\u0046';
        if (canDestroyed.includes(field[y][x + 2])) {
            field[y][x + 2] = '\u0046';
            if (canDestroyed.includes(field[y][x + 3])) {
                field[y][x + 3] = '\u0046';
            }
        }
    }
    if (canDestroyed.includes(field[y][x - 1])) {
        field[y][x - 1] = '\u0046';
        if (canDestroyed.includes(field[y][x - 2])) {
            field[y][x - 2] = '\u0046';
            if (canDestroyed.includes(field[y][x - 3])) {
                field[y][x - 3] = '\u0046';
            }
        }
    }
    if (canDestroyed.includes(field[y + 1][x])) {
        field[y + 1][x] = '\u0046';
        if (canDestroyed.includes(field[y + 2][x])) {
            field[y + 2][x] = '\u0046';
            if (canDestroyed.includes(field[y + 3][x])) {
                field[y + 3][x] = '\u0046';
            }
        }
    }
    if (canDestroyed.includes(field[y - 1][x])) {
        field[y - 1][x] = '\u0046';
        if (canDestroyed.includes(field[y - 2][x])) {
            field[y - 2][x] = '\u0046';
            if (canDestroyed.includes(field[y - 3][x])) {
                field[y - 3][x] = '\u0046';
            }
        }
    }
}

export default boom;