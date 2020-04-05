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

let validLength = false;
let validCharacters = false;

const collectPasswordCriteria = () => {
  let length;
  let characters;
  if (!validLength) {
    length = collectLength();
    console.log(`length:`, length);
  }
  if (!validCharacters) {
    characters = collectCharacters();
    console.log(`charas:`, characters);
  }
}

const collectLength = () => {
  let lengthInput = prompt(`What is your desired password length?`);
  let length = validateLength(lengthInput);
  return length;
}

const validateLength = (length) => {
  let parsedLength = parseInt(length);
  if (parsedLength >= 8 && parsedLength <= 128) {
    validLength = true;
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
  let characters = {
    lower: lowerInput,
    upper: upperInput,
    num: numInput,
    spec: specInput
  } 
  let passwordCharacters = validateCharacters(characters);
  return characters;
}

const validateCharacters = (characters) => {
  if (Object.values(characters).indexOf(true) > -1) {
    validCharacters = true;
    return characters;
  } else {
    alert(`Password must contain at least one category of characters (lowercase letters, uppercase letters, numbers, and/or special characters).`);
    collectPasswordCriteria();
  }
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
