import Phaser from 'phaser';
import PreloadScene from './scenes/preload';
import MenuScene from './scenes/menu';
import GameScene from './scenes/game';

const config = {
    type: Phaser.AUTO,
    width: 1280,   // Устанавливаем ширину игры равной ширине окна браузера
    height: 720, // Устанавливаем высоту игры равной высоте окна браузера
    parent: 'game-container',
    scene: [PreloadScene, MenuScene, GameScene],
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
