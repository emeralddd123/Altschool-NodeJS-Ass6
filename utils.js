const generateSKU = (name) => {
  const firstThreeLetters = name.slice(0, 3).toUpperCase();
  const randomNumber = Math.floor(1000000 + Math.random() * 9000000);

  return `${firstThreeLetters}${randomNumber}`;
}


module.exports = { generateSKU }
