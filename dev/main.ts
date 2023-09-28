import './css/style.css'
import * as phaser3 from "phaser3";
import PreloadScene from "./js/scene/PreloadScene";
import GameScene from "./js/scene/GameScene.ts";

const option: object = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        },
        fps: 60,
    },
    scene: [PreloadScene, GameScene]
}

new phaser3.Game(option)
