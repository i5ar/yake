const protips = [
  "Focus the dropdown to quickly change option with arrow keys.",
  "Press F11 to enter full screen, it's cool!"
];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function getProtip() {
  const i = getRandomInt(protips.length);
  return protips[i];
}
