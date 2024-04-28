function hexToRgb(hex) {
  hex = hex.replace(/^#/, "");
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  return { r, g, b };
}

function rgbToHex(r, g, b) {
  let hexR = r.toString(16).padStart(2, "0");
  let hexG = g.toString(16).padStart(2, "0");
  let hexB = b.toString(16).padStart(2, "0");
  return `#${hexR}${hexG}${hexB}`;
}

export const averageColor = (hexCodes) => {
  let totalR = 0;
  let totalG = 0;
  let totalB = 0;
  const count = hexCodes.length;
  hexCodes.forEach((hex) => {
    const { r, g, b } = hexToRgb(hex);
    totalR += r;
    totalG += g;
    totalB += b;
  });
  const avgR = Math.round(totalR / count);
  const avgG = Math.round(totalG / count);
  const avgB = Math.round(totalB / count);
  return rgbToHex(avgR, avgG, avgB);
};
