import * as Phaser from "phaser";
import PreloadScene from "./scene/PreloadScene.js";
import MeinMenuScene from "./scene/MeinMenuScene.js";
import GameScene from "./scene/GameScene.js";
import GameOverScene from "./scene/GameOverScene.js";

const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        // Ширина окна игры
        width: 1920,
        // Высота окна игры
        height: 1080,
    },
    pixelArt: true,
    scene: [PreloadScene, MeinMenuScene, GameScene, GameOverScene]
};

const game = new Phaser.Game(config);