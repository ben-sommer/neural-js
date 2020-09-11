const config = {
  binaryThresh: 0.5,
  hiddenLayers: [3],
  activation: 'sigmoid'
};

const net = new brain.NeuralNetwork(config);

const hexToNum = hex => {
    const raw = hex.substring(1);
    const colours = raw.match(/.{1,2}/g);
    const decimalColours = colours.map(c => parseInt(c, 16));
    return decimalColours.map(c => c/256);
}

const outputAnswer = ans => {
    // return 1 if confident of true result, -1 if confident
    // of false, and 0 if unsure
    return ans >= 0.6 ? 1 : ans <= 0.4 ? -1 : 0
};

net.train([
  {
    input: hexToNum("#d61702"),
    output: [1]
  },
  {
    input: hexToNum("#de4231"),
    output: [1]
  },
  {
    input: hexToNum("#b33309"),
    output: [1]
  },
  {
    input: hexToNum("#f01a41"),
    output: [1]
  },
  {
    input: hexToNum("#eb6105"),
    output: [1]
  },
  {
    input: hexToNum("#e8772c"),
    output: [1]
  },
  {
    input: hexToNum("#143eba"),
    output: [0]
  },
  {
    input: hexToNum("#305cdb"),
    output: [0]
  },
  {
    input: hexToNum("#102561"),
    output: [0]
  },
  {
    input: hexToNum("#0d0fa1"),
    output: [0]
  },
  {
    input: hexToNum("#2628eb"),
    output: [0]
  },
  {
    input: hexToNum("#200aa1"),
    output: [0]
  }
]);

const output = net.run(hexToNum("#c41a91"));
const result = outputAnswer(output);
console.log(result > 0 ? "POSITIVE" : result < 0 ? "NEGATIVE" : "UNSURE");

// TODO: Get user input for 5 colours they like, 5
// they dislike

// TODO: Run neural net for every hue and plot results
