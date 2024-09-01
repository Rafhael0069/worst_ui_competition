export function invertCharacter(char) {
    // Verifica se o caractere é uma letra minúscula
    if (char >= 'a' && char <= 'z') {
      return String.fromCharCode('z'.charCodeAt(0) - (char.charCodeAt(0) - 'a'.charCodeAt(0)));
    }
    // Verifica se o caractere é uma letra maiúscula
    if (char >= 'A' && char <= 'Z') {
      return String.fromCharCode('Z'.charCodeAt(0) - (char.charCodeAt(0) - 'A'.charCodeAt(0)));
    }
    // Verifica se o caractere é um número
    if (char >= '0' && char <= '9') {
      return String.fromCharCode('9'.charCodeAt(0) - (char.charCodeAt(0) - '0'.charCodeAt(0)));
    }
    // Retorna o caractere original se não for letra ou número
    return char;
  }
  
  export function invertInput(input) {
    return input.split('').map(invertCharacter).join('');
  }
  