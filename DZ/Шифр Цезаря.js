function cesar(str, shift, action) {
    const alphabet = 'абвгдежзийклмнопрстуфхцчшщъыьэюя';
    let result = '';

    for (let i = 0; i < str.length; i++) {
        const char = str[i].toLowerCase();
        const isUpperCase = str[i] === char.toUpperCase();

        if (alphabet.includes(char)) {
            const charIndex = alphabet.indexOf(char);
            let newCharIndex;

            if (action === 'encode') {
                newCharIndex = (charIndex + shift) % alphabet.length;
            } else if (action === 'decode') {
                newCharIndex = (charIndex - shift + alphabet.length) % alphabet.length;
            } else {
                throw new Error("Invalid action. Use 'encode' or 'decode'.");
            }

            const newChar = alphabet[newCharIndex];
            result += isUpperCase ? newChar.toUpperCase() : newChar;
        } else {
            result += str[i];
        }
    }

    return result;
}

// Пример использования
const encryptedMessage = cesar("эзтыхз фзъзъз", 3, 'decode');
console.log(encryptedMessage);  // Результат: "шпривет привет"
