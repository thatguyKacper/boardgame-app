const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);


function replaceCharacter(str: string, targetChar: string, replacementChar: string) {
  const regex = new RegExp(targetChar, 'g');

  const result = str.replace(regex, replacementChar);

  return result;
}

export { capitalizeFirstLetter, replaceCharacter };