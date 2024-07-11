export class BitmapFont {
  constructor() {
    this.BITMAP_FILE = '/img/fonts/bitmapfont.png';
    this.CHAR_HEIGHT = 25;
    this.CHAR_WIDTH = 25;
    this.charMap = new Map([
      [' ', {x: 0, y: 0}],
      ['!', {x: 1, y: 0}],
      ['"', {x: 2, y: 0}],
      ['_', {x: 3, y: 0}],
      ['\'', {x: 4, y: 0}],
      ['(', { x: 8, y: 0}],
      [')', { x: 9, y: 0}],
      ['*', { x: 10, y: 0}],
      ['0', {x: 5, y: 1}],
      ['1', {x: 6, y: 1}],
      ['2', {x: 7, y: 1}],
      ['3', {x: 8, y: 1}],
      ['4', {x: 9, y: 1}],
      ['5', {x: 10, y: 1}],
      ['6', {x: 11, y: 1}],
      ['7', {x: 12, y: 1}],
      ['8', {x: 0, y: 2}],
      ['9', {x: 1, y: 2}],
      ['A', {x: 9, y: 2}],
      ['B', {x: 10, y: 2}],
      ['C', {x: 11, y: 2}],
      ['D', {x: 0, y: 3}],
      ['E', {x: 1, y: 3}],
      ['F', {x: 2, y: 3}],
      ['G', {x: 3, y: 3}],
      ['H', {x: 4, y: 3}],
      ['I', {x: 5, y: 3}],
      ['J', {x: 6, y: 3}],
      ['K', {x: 7, y: 3}],
      ['L', {x: 8, y: 3}],
      ['M', {x: 9, y: 3}],
      ['N', {x: 10, y: 3}],
      ['O', {x: 11, y: 3}],
      ['P', {x: 0, y: 4}],
      ['Q', {x: 1, y: 4}],
      ['R', {x: 2, y: 4}],
      ['S', {x: 3, y: 4}],
      ['T', {x: 4, y: 4}],
      ['U', {x: 5, y: 4}],
      ['V', {x: 6, y: 4}],
      ['W', {x: 7, y: 4}],
      ['X', {x: 8, y: 4}],
      ['Y', {x: 9, y: 4}],
      ['Z', {x: 10, y: 4}],
    ]);
    this.imgMap = this.getImageMap();
  }

  getImageMap()
  {
    const img = new Image();
    img.src = this.BITMAP_FILE;
    return img;
  }

  drawLetter(ctx, letter, x, y, w, h)
  {
    const letterData = this.getLetter(letter);

    const srcX = letterData.x === 0 ? 0 : (letterData.x * this.CHAR_WIDTH) + letterData.x;
    const srcY = letterData.y === 0 ? 0 : (letterData.y * this.CHAR_HEIGHT) + letterData.y;

    ctx.save();
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(this.imgMap, srcX, srcY, this.CHAR_WIDTH, this.CHAR_HEIGHT, x, y, w, h);
    ctx.restore();
  }

  getLetter(letter)
  {
    let theLetter = letter.toString().toUpperCase();

    if (!this.charMap.has(theLetter)) theLetter = ' ';
    return this.charMap.get(theLetter);
  }
}
