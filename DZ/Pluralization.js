function pluralizeRecords(n) {
    let recordsString = `В результате выполнения запроса было найдено ${n} `;

    if (n % 10 === 1 && n % 100 !== 11) {
        recordsString += "запись";
    } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
        recordsString += "записи";
    } else {
        recordsString += "записей";
    }

    return recordsString;
}

// Пример использования
const numberOfRecords = 1;
console.log(pluralizeRecords(numberOfRecords));