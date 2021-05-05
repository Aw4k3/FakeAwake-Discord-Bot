class Viewport {
    client;
    width = 6;
    height = 4;
    background = ':black_large_square:';
    pixels = [];
    layers = [];
    sprites = [];

    constructor(Client, W, H, DefaultBG = ':black_large_square:') {
        this.client = Client;
        this.width = W;
        this.height = H;
        this.background = DefaultBG;
    }
    
    DrawRectangle(x = 0, y = 0, w = 1, h = 1, brush = ':white_large_square:', fill = true) {
        var pixelData = new Array(this.height).fill(null).map(() => new Array(this.width).fill(null));

        for (var i = 0; i < h; i++) {
            for (var j = 0; j < w; j++) {
                pixelData[y + i][x + j] = brush;
            }
        }

        if (!fill) {
            for (var i = 1; i < h - 1; i++) {
                for (var j = 1; j < w - 1; j++) {
                    pixelData[y + i][x + j] = null;
                }
            }
        }

        this.layers.push(pixelData);
    }

    DrawCircle(x = 0, y = 0, r = 1, brush = ':white_large_square:', fill = true) {
        var pixelData = new Array(this.height).fill(null).map(() => new Array(this.width).fill(null));

        pixelData[x][y + r] = brush;
        pixelData[x][y - r] = brush;
        pixelData[x + r][y] = brush;
        pixelData[x - r][y] = brush;

        var pixY = Math.round(Math.sqrt((r * r) - 1) + 0.5),
            pixX = 1;

        while (pixX < pixY) {
            pixelData[x + pixX][y + pixY] = brush;
            pixelData[x + pixX][y - pixY] = brush;
            pixelData[x - pixX][y + pixY] = brush;
            pixelData[x - pixX][y - pixY] = brush;
            pixelData[x + pixY][y + pixX] = brush;
            pixelData[x + pixY][y - pixX] = brush;
            pixelData[x - pixY][y + pixX] = brush;
            pixelData[x - pixY][y - pixX] = brush;
            pixX++;
            pixY = Math.round(Math.sqrt((r * r) - (pixX * pixX)) + 0.5);
        }

        if (pixX === pixY) {
            pixelData[x + pixX][y + pixY] = brush;
            pixelData[x + pixX][y - pixY] = brush;
            pixelData[x - pixX][y + pixY] = brush;
            pixelData[x - pixX][y - pixY] = brush;
        }

        /*
        for (var pixX = -r; pixX < r; pixX++) {
            var pixY = Math.round(Math.sqrt((r * r) - (pixX * pixX)) + 0.5);
            pixelData[x + pixX][y + pixY] = brush;
            pixelData[x + pixX][y - pixY] = brush;
            pixelData[x - pixX][y + pixY] = brush;
            pixelData[x - pixX][y - pixY] = brush;
        }
        */
        this.layers.push(pixelData);
    }

    CreateSprite(emoteID, x, y) {
        this.sprites.push(new Sprite(emoteID, x, y));
    }

    Render() {
        this.pixels = new Array(this.height).fill(0).map(() => new Array(this.width).fill(0));

        // Create Background
        for (var i = 0; i < this.height; i++) { // For each row
            for (var j = 0; j < this.width; j++) { // For each column
                this.pixels[i][j] = this.background;
            }
        }

        //Add Layers
        for (var layerIdx = 0; layerIdx < this.layers.length; layerIdx++) { // For each layer
            for (var i = 0; i < this.height; i++) { // For each row of pixels
                for (var j = 0; j < this.width; j++) { // For each column of pixels
                    if (this.layers[layerIdx][i][j] !== null) {
                        this.pixels[i][j] = this.layers[layerIdx][i][j];
                    }
                }
            }
        }

        // Add Sprites
        for (var i = 0; i < this.sprites.length; i++) {
            this.pixels[this.sprites[i].y][this.sprites[i].x] = this.client.emojis.cache.find(emote => emote.id === this.sprites[i].texture2D)
        }

        // Comma Remover
        for (var i = 0; i < this.height; i++) {
            this.pixels[i] = this.pixels[i].join('');
        }

        return this.pixels;
    }
}

class Sprite {
    texture2D = '773242571865587722';
    x = 0;
    y = 0;

    constructor(emoteID, x, y) {
        this.texture2D = emoteID;
        this.x = x;
        this.y = y;
    }
}

module.exports = Viewport;