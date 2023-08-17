import * as Phaser from "phaser";
import PreloadScene from "./scene/PreloadScene.js";

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        // Ширина окна игры
        width: 1920,
        // Высота окна игры
        height: 1080,
    },
    scene: [PreloadScene]
};

const game = new Phaser.Game(config);