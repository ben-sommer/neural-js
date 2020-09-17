const config = {
  binaryThresh: 0.5,
  hiddenLayers: [3],
  activation: 'sigmoid'
};

const net = new brain.NeuralNetwork(config);

const goodColours = ["#2a5937", "#0d5452", "#1f401c", "#524831", "#360a2d", "#9e8316"].map(x => ({ input: hexToNum(x), output: [1]}));
const badColours = ["#e6156c", "#1dab74", "#4ce61e", "#dba50f", "#e36905", "#07e7eb"].map(x => ({ input: hexToNum(x), output: [0]}));

const trainingData = goodColours.concat(badColours);

net.train(trainingData);

const output = net.run(hexToNum("#c41a91"));
const result = outputAnswer(output);
console.log(result > 0 ? "POSITIVE" : result < 0 ? "NEGATIVE" : "UNSURE");

displayColours(trainingData);

outputColours("hue", net);
outputColours("saturation", net);
outputColours("lightness", net);

// TODO: Get user input for 5 colours they like, 5
// they dislike

// TODO: Run neural net for every hue and plot results
