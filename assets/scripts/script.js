const alphabet = [
  `a`, `b`, `c`, `d`, `e`, 
  `f`, `g`, `h`, `i`, `j`, 
  `k`, `l`, `m`, `n`, `o`, 
  `p`, `q`, `r`, `s`, `t`, 
  `u`, `v`, `w`, `x`, `y`, `z`
];

const symbols = [
  `!`, `@`, `#`, `$`, `%`, 
  `^`, `&`, `*`, `(`, `)`, 
  `-`, `_`, `+`, `=`, `?`
];

const numbers = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

let defaultLength;

const collectPasswordCriteria = () => {
  let length;
  if (defaultLength) {
    length = defaultLength;
  } else {
    length = collectLength();
  }
  let characters = collectCharacters();
  let chosenCharacters = removeFalseKeys(characters);
  generatePassword(length, chosenCharacters);
}

const collectLength = () => {
  let lengthInput = prompt(`What is your desired password length?`);
  let validLength = validateLength(lengthInput);
  return validLength;
}

const validateLength = length => {
  let parsedLength = parseInt(length);
  if (parsedLength >= 8 && parsedLength <= 128) {
    defaultLength = parsedLength;
    return parsedLength;
  } else {
    alert(`Password must contain between 8 - 128 characters.`);
    collectPasswordCriteria();
  }
}

const collectCharacters = () => {
  let lowerInput = 
    confirm(`Would you like to include lowercase letters in your password?`)
  let upperInput = 
    confirm(`Would you like to include uppercase letters in your password?`)
  let numInput = 
    confirm(`Would you like to include numbers in your password?`)
  let specInput = 
    confirm(`Would you like to include special characters in your password?`)
  let charactersObj = {
    lower: lowerInput,
    upper: upperInput,
    num: numInput,
    spec: specInput
  };
  let passwordCharacters = validateCharacters(charactersObj);
  return passwordCharacters;
}

const validateCharacters = characters => {
  if (Object.values(characters).indexOf(true) > -1) {
    return characters;
  } else {
    alert(`Password must contain at least one category of characters (lowercase letters, uppercase letters, numbers, and/or special characters).`);
    collectPasswordCriteria();
  }
}

const removeFalseKeys = characters => {
  /* Remove key where value is false in JavaScript source: 
      https://stackoverflow.com/questions/39505409/remove-key-where-value-is-false-in-javascript
  */
  Object.keys(characters).forEach(key => {
    if (characters[key] === false) {
      delete characters[key];
    }
  });
  let chosenCharacters = Object.keys(characters);
  return chosenCharacters; 
}

const generatePassword = (len, chars) => {
  let characterArr = [];
  // ensure at least one of each checked character is included
  for (let i = 0; i < chars.length; i++) {
    switch (chars[i]) {
      case `lower`:
        let randomLowerI = genRandomNumber(0, alphabet.length);
        pushToArr(characterArr, alphabet, randomLowerI);
        break;
      case `upper`:
        let randomUpperI = genRandomNumber(0, alphabet.length);
        pushToArr(characterArr, alphabet, randomUpperI, `upper`);
        break;
      case `num`:
        let randomNumI = genRandomNumber(0, numbers.length);
        pushToArr(characterArr, numbers, randomNumI);
        break;
      case `spec`:
        let randomSpecI = genRandomNumber(0, symbols.length);
        pushToArr(characterArr, symbols, randomSpecI);
        break;
      default:
        break;
    }
  }
  let remainingChars = len - chars.length;
  for (let j = 0; j < remainingChars; j++) {
    let randomNum = genRandomNumber(0, chars.length);
    let thisKey = chars[randomNum];
    switch (thisKey) {
      case `lower`:
        let randomLowerI = genRandomNumber(0, alphabet.length);
        pushToArr(characterArr, alphabet, randomLowerI);
        break;
      case `upper`:
        let randomUpperI = genRandomNumber(0, alphabet.length);
        pushToArr(characterArr, alphabet, randomUpperI, `upper`);
        break;
      case `num`:
        let randomNumI = genRandomNumber(0, numbers.length);
        pushToArr(characterArr, numbers, randomNumI);
        break;
      case `spec`:
        let randomSpecI = genRandomNumber(0, symbols.length);
        pushToArr(characterArr, symbols, randomSpecI);
        break;
      default:
        break;
    }
  }
  // console.log(characterArr);
  let shuffledArr = shuffleArr(characterArr);
  let pwStr = shuffledArr.join(``);
  // console.log(shuffledArr);
  defaultLength = ``;
  writePassword(pwStr);
}

const pushToArr = (pwArr, charArr, i, upper) => {
  if (upper) {
    pwArr.push(charArr[i].toUpperCase());
  } else {
    pwArr.push(charArr[i]);
  }
}

/* Getting a random number between two values source:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/
const genRandomNumber = (min, max) => {
  return Math.floor((Math.random() * (max - min)) + min);
}

/* Knuth Shuffle source:
    https://github.com/Daplie/knuth-shuffle/blob/master/index.js
*/
const shuffleArr = arr => {
  let currentIndex = arr.length;
  let temporaryValue;
  let randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temporaryValue;
    }

    return arr;
}

// Write password to the #password input
const writePassword = password => {
  let $passwordText = document.querySelector(`#password`);
  $passwordText.value = password;
}

const writeCopyYear = () => {
  let year = new Date().getFullYear();
  if (year > 2019) {
    let decade = year.toString().slice(-2);
    const $copySpan = document.querySelector(`#copy-year`);
    $copySpan.textContent = `-${decade}`;
  }
}

// Assignment Code
document.addEventListener(`DOMContentLoaded`, () => {
  writeCopyYear();
  const $generateBtn = document.querySelector(`#generate`);
  // Add event listener to generate button
  $generateBtn.addEventListener(`click`, collectPasswordCriteria);
});
