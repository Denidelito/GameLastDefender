import {createLoadingBar} from "../config/createLoadingBar.js";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        createLoadingBar(this);

        // Загрузка анимаций
        this.load.spritesheet(
            'playerIdle',
            'assets/anim/player/idle.png',
            {
                frameWidth: 192,
                frameHeight: 192,
                startFrame: 0,
                endFrame: 5
            });
        this.load.spritesheet(
            'playerWalkLeft',
            'assets/anim/player/walk-left.png',
            {
                frameWidth: 192,
                frameHeight: 192,
                startFrame: 0,
                endFrame: 5
            });
        this.load.spritesheet(
            'playerWalkRight',
            'assets/anim/player/walk-right.png',
            {
                frameWidth: 192,
                frameHeight: 192,
                startFrame: 0,
                endFrame: 5
            });
        this.load.spritesheet(
            'playerWalkUp',
            'assets/anim/player/walk-up.png',
            {
                frameWidth: 192,
                frameHeight: 192,
                startFrame: 0,
                endFrame: 6
            });
        this.load.spritesheet(
            'playerWalkDown',
            'assets/anim/player/walk-down.png',
            {
                frameWidth: 192,
                frameHeight: 192,
                startFrame: 0,
                endFrame: 6
            });
        this.load.spritesheet(
            'playerAttack',
            'assets/anim/player/attack.png',
            {
                frameWidth: 192,
                frameHeight: 192,
                startFrame: 0,
                endFrame: 4
            });
        this.load.spritesheet(
            'enemy1Idle',
            'assets/anim/enemy/slime-idle.png',
            {
                frameWidth: 192,
                frameHeight: 192,
                startFrame: 0,
                endFrame: 4
            });
        this.load.spritesheet(
            'enemy1Attack',
            'assets/anim/enemy/slime-attack.png',
            {
                frameWidth: 192,
                frameHeight: 192,
                startFrame: 0,
                endFrame: 7
            });
        this.load.spritesheet(
            'enemy1die',
            'assets/anim/enemy/slime-die.png',
            {
                frameWidth: 192,
                frameHeight: 192,
                startFrame: 0,
                endFrame: 5
            });

        //Спрайт персонажа
        this.load.image('playerSprite', 'assets/sprites/player/player.png')

        // Предметы
        this.load.image('potionHP', 'assets/sprites/items/potion.png');
        this.load.image('stick', 'assets/sprites/items/stick.png');

        // Игровой интерфейс
        this.load.image('ui-game-interface', 'assets/ui/gameInterface.png');

        // Карта мира
        this.load.tilemapTiledJSON('tilemaps', 'assets/tilemaps/OldCastleTilemap.tmj');
        this.load.image('terrain-atlas', 'assets/tilemaps/terrain_atlas.png');
    }


    create() {
        // По завершении загрузки переходим в сцену меню
        this.scene.start('MeinMenuScene');
    }
}