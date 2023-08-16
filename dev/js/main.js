import Phaser from 'phaser';
import PreloadScene from './scenes/preload';
import MenuScene from './scenes/menu';
import GameScene from './scenes/game';
import GameOverScene from "./scenes/gameOver";
import QuestScene from "./scenes/quest";

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
    scene: [PreloadScene, MenuScene, GameScene, GameOverScene, QuestScene],
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
                url: '../assets/fonts/vcrosdmonorusbyd.ttf',
            },
            {
                key: 'alundratext',
                url: '../assets/fonts/alundratext.ttf',
            },
        ],
    },


};


const game = new Phaser.Game(config);
