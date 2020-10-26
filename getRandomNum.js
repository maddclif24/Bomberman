const getRandomNum = (min, max) => {
    const a = Math.ceil(min);
    const b = Math.floor(max);
    return Math.floor(Math.random() * (b - a + 1)) + a;
};

export default getRandomNum;