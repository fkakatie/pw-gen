`use strict`;

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
  let length = collectLength();
  let characters = collectCharacters();
  let chosenCharacters = removeFalseKeys(characters);
  console.log(`length:`, length);
  console.log(`charas:`, chosenCharacters);
  generatePassword(length, chosenCharacters);
}

const collectLength = () => {
  let lengthInput = prompt(`What is your desired password length?`, defaultLength);
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
  console.log(len);
  console.log(chars);
}

/* Getting a random number between two values source:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/
const genRandomNumber = (min, max) => {
  return (Math.random() * (max - min)) + min;
}

// Assignment Code
var generateBtn = document.querySelector(`#generate`);

// Write password to the #password input
// function writePassword() {
//   var password = generatePassword();
//   var passwordText = document.querySelector(`#password`);

//   passwordText.value = password;

// }

// Add event listener to generate button
generateBtn.addEventListener(`click`, collectPasswordCriteria);
