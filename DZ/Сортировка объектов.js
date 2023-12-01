function getSortedArray(array, key) {
    for (let i = 0; i < array.length - 1; i++) { //Внешний цикл (i) проходится по всем элементам массива за исключением последнего.
        for (let j = 0; j < array.length - i - 1; j++) { //Внутренний цикл (j) проходится по оставшимся элементам для сравнения.
            const currentValue = typeof array[j][key] === 'string'
                ? array[j][key].toLowerCase()
                : array[j][key];
            const nextValue = typeof array[j + 1][key] === 'string' // (currentValue и nextValue) извлекаются по указанному ключу (key)
                ? array[j + 1][key].toLowerCase()
                : array[j + 1][key];

            if (currentValue > nextValue) {
                const temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }

    return array;
}

// Пример использования
const objectsArray = [
    { name: 'John', age: 25 },
    { name: 'Alice', age: 22 },
    { name: 'Bob', age: 19 },
    { name: 'Gena', age: 30 },
    { name: 'Tom', age: 36 },
];

const sortedArray = getSortedArray(objectsArray, 'name');
console.log(sortedArray);
