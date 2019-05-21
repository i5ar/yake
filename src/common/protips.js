const protips = [
  "Focus the dropdown to quickly change option with arrow keys.",
  "Click the keyboard icon to download the SVG.",
  "Click the title to toggle the profiles."
];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function getProtip() {
  const i = getRandomInt(protips.length);
  return protips[i];
}
