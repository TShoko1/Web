function cesar(str, shift, action) {
    if (typeof str !== 'string' || typeof shift !== 'number' || (action !== 'encode' && action !== 'decode')) {
        return "Некорректные входные данные.";
    }

    const russianAlphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
    const alphabetLength = russianAlphabet.length;

    const cipher = (char, shift, action) => {
        const charLower = char.toLowerCase();
        const isUpperCase = char !== charLower;

        if (russianAlphabet.includes(charLower)) {
            const index = russianAlphabet.indexOf(charLower);
            let newIndex;

            if (action === 'encode') {
                newIndex = (index + shift) % alphabetLength;
            } else {
                newIndex = (index - shift + alphabetLength) % alphabetLength;
            }

            const newChar = russianAlphabet.charAt(newIndex);

            return isUpperCase ? newChar.toUpperCase() : newChar;
        }

        return char;
    };

    return str.split('').map(char => cipher(char, shift, action)).join('');
}

let messageToEncode = "эзтыхз фзъзъз";
let decodedMessage = cesar(messageToEncode, 8, 'decode');
console.log(decodedMessage);