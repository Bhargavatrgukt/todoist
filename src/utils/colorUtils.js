import colorPalette from "./colorPalette ";

export const colorForHash = (colorName, palette = colorPalette) => {
  return palette.find(
    (colorDetails) =>
      colorDetails.dataValue.toLowerCase() === colorName.toLowerCase()
  );
};
