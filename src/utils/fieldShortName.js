const charCodeA = "a".charCodeAt(0);
const charCodeZ = "z".charCodeAt(0);
const alphabetLength = charCodeZ - charCodeA + 1;

function indexToLetters(index) {
  let text = "";
  while (index >= 0) {
    text = String.fromCharCode((index % alphabetLength) + charCodeA) + text;
    index = Math.floor(index / alphabetLength) - 1;
  }
  return text;
}

export default function fieldShortName(index, level = 0, prefix = "") {
  if (level === 0) return prefix + (index + 1);
  else {
    return prefix + indexToLetters(index);
  }
}
