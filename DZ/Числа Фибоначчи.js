function fibb(n) {
    if (n <= 1) {
        return n;
    }

    let fibPrev = 0; //предыдущее число
    let fibCurr = 1; //текущее

    for (let i = 2; i <= n; i++) {
        let temp = fibCurr;
        fibCurr += fibPrev;
        fibPrev = temp;
    }

    return fibCurr;
}

// Пример использования
const result = fibb(26);
console.log(result);
