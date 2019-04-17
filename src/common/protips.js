const protips = [
  "Focus the dropdown to quickly change option with arrow keys.",
  "Upload info.json and use the dashed box to verify the dimensions.",
  "Click QMK on the navbar to look at more keyboards!",
  "Press F11 to enter full screen, it's cool!"
];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function getProtip() {
  const i = getRandomInt(protips.length);
  return protips[i];
}
