const protips = [
  "Focus the dropdown to quickly change option with arrow keys.",
];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function getProtip() {
  const i = getRandomInt(protips.length);
  return protips[i];
}
