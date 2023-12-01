function pow(x, n) {
  if (n <= 0) {
    console.error("Функция поддерживает только натуральные значения n");
    return undefined;
  }

  let result = 1;
  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

const x = 2; //число
const n = 3; //степень
const result = pow(x, n);
console.log(`${x} в степени ${n} равно ${result}`);
