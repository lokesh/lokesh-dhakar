const jimp = require('jimp');

/**
 * Resizes image using Jimp
 *
 * @param {Object} img - Jimp img
 * @param {Object} [opts]
 * @param {Object} [opts.maxSize]
 * @param {Object} [opts.maxWidth]
 * @param {Object} [opts.maxHeight]
 * @returns {Promise} Promise returns Jimp img obj
 */
module.exports = async function (img, opts) {
  let isBig = false;
  const isWide = img.bitmap.width > img.bitmap.height;

  // Needs to be shrunk down?
  if (opts.maxSize) {
    isBig = ((img.bitmap.width > opts.maxSize)
      || (img.bitmap.height > opts.MaxSize));
  } else if (opts.maxWidth) {
    isBig = (img.bitmap.width > opts.maxWidth);
  } else if (opts.maxHeight) {
    isBig = (img.bitmap.height > opts.maxHeight);
  }

  if (isBig) {
    // wide
    if ((opts.maxSize && isWide) || (opts.maxWidth)) {
      return await img.resize(opts.maxSize || opts.maxWidth, jimp.AUTO);
    }
    // tall
    return await img.resize(jimp.AUTO, opts.maxSize || opts.maxHeight);
  } else {
    return img;
  }
}
