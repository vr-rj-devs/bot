import chalk from "chalk";

export const makeGradient = (string: string, colors: (keyof chalk.Chalk)[]) => {
  const characters = string.split("");
  let colorIdx = 0;
  let gradientString = "";

  const thresholdIncrement = characters.length / colors.length;
  let threshold = thresholdIncrement - 1;
  for (let i = 0; i < characters.length; i++) {
    gradientString += (chalk[colors[colorIdx]] as chalk.ChalkFunction)(characters[i]);
    if (i >= threshold) {
      colorIdx++;
      threshold += thresholdIncrement;
    }
  }

  return gradientString;
};
export const Gradients = {
  christmas: (string: string) => makeGradient(string, ["red", "cyan", "white"]),
};
