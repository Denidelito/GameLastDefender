import Phaser from 'phaser';
import PreloadScene from './scenes/preload';
import MenuScene from './scenes/menu';
import GameScene from './scenes/game';

const config = {
    type: Phaser.WEBGL,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        // Ширина окна игры
        width: 1920,
        // Высота окна игры
        height: 1080,
    },
    scene: [PreloadScene, MenuScene, GameScene],
    /*physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
        },
    },*/
    loader: {
        fonts: [
            {
                key: 'CustomFont',
                url: 'assets/fonts/vcrosdmonorusbyd.ttf',
            },
        ],
    },


};


const game = new Phaser.Game(config);
