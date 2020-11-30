import { APCA } from '../deps/APCAsRGBonly.98.js';

export const MODE_WCAG = 'wcag2';
export const MODE_APCA = 'apca';

/**
 * Color object in RGB format
 * @typedef {Object} RGB
 * @typedef {Integer} object.r
 * @typedef {Integer} object.g
 * @typedef {Integer} object.b
 */

/**
 * To-do:
 * - Support alpha values
 * @param  {String} text hex color
 * @param  {String} background hex color
 * @param  {String} contrast mode
 * @return {Number}
 */
export function getContrast(textColor, bgColor, mode = MODE_APCA) {
  if (mode === MODE_WCAG) {
    return wcagContrast(textColor, bgColor);
  } else {
    return apcaContrast(textColor, bgColor);
  }
}

/**
 * https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 * @param  {String} text hex color
 * @param  {String} background hex color
 * @return {Number} WCAG 2.1 contrast ratio
 */
function wcagContrast(textColor, bgColor) {
    const textLumi = luminance(hexToRgb(textColor));
    const bgLumi = luminance(hexToRgb(bgColor));
    const ratio = textLumi > bgLumi
      ? ((textLumi + 0.05) / (bgLumi + 0.05))
      : ((bgLumi + 0.05) / (textLumi + 0.05));
    return ratio.toFixed(2);
}

/**
 * https://www.myndex.com/SAPC/
 * Remove Lc unit identifier from string and returns absolute value.
 *
 * @param  {String} text hex color
 * @param  {String} background hex color
 * @return {Number} APCA contrast percentage
 */
function apcaContrast(textColor, bgColor) {
  const { r: textR, g: textG, b: textB } = hexToRgb(textColor);
  const { r: bgR, g: bgG, b: bgB } = hexToRgb(bgColor);
  let ratio = APCA(bgR, bgG, bgB, textR, textG, textB);
  return Math.abs(parseInt(ratio.split(' ')[0]))
}

/**
 * https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 * @param  {RGB} color
 * @return {Number} WCAG 2.1 relative luminance
 */
function luminance(color) {
  const { r, g, b } = color;

  const rgb = [r, g, b].map(val => {
    val = val / 255;
    return (val <= 0.03928)
      ? val / 12.92
      : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}


/**
 * [hexToRgb description]
 * @param  {String} hex color
 * @return {RGB}
 */
function hexToRgb(hex) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
