function minDigit(x) {
    if (x < 0) {
        return "Число должно быть неотрицательным";
    }

    if (x === 0) {
        return 0;
    }

    let min = 9;

    while (x > 0) {
        const digit = x % 10;
        if (digit < min) {
            min = digit;
        }
        x = Math.floor(x / 10);
    }

    return min;
}

// Пример использования
const result = minDigit(9651);
console.log(result);
