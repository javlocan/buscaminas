export const getRandomNumbers = (mines: number, size: number) => {
  const array: number[] = [];
  let random: number;
  for (let i = 0; i < mines; i++) {
    do {
      random = randomInt(size - 1);
    } while (array.includes(random)); // will return false if random isn't asigned

    array.push(random);
  }
  return array;
};

function randomInt(max: number) {
  return Math.floor(Math.random() * max);
}
