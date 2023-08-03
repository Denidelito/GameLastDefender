import Phaser from 'phaser';
import PreloadScene from './scenes/preload';
import MenuScene from './scenes/menu';
import GameScene from './scenes/game';

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT, // Формат масштабирования (FIT - масштабирует содержимое с сохранением пропорций, но не обрезает, SHOW_ALL - масштабирует содержимое с сохранением пропорций и обрезает, RESIZE - изменяет размер canvas и содержимого без сохранения пропорций)
        autoCenter: Phaser.Scale.CENTER_BOTH, // Располагает игровое окно по центру экрана (CENTER_BOTH) или только по горизонтали/вертикали (CENTER_HORIZONTALLY/CENTER_VERTICALLY)
        width: 1280, // Ширина окна игры
        height: 720, // Высота окна игры
    },
    scene: [PreloadScene, MenuScene, GameScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
        },
    },
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
