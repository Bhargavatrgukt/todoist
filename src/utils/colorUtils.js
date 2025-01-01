export const colorForHash = (colorName, colorPalette) => {
  return colorPalette.find(
    (colorDetails) =>
      colorDetails.dataValue.toLowerCase() === colorName.toLowerCase()
  );
};
