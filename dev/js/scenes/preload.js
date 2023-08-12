export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        // Загрузка полосы
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 4, height / 2 - 30, width / 2, 50);

        // Обновление полосы загрузки
        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width / 4 + 10, height / 2 - 20, (width / 2 - 20) * value, 30);
        });

        // Спрайт персанажа
        this.load.image('playerSprite', 'assets/spritesheets/player.png');

        // Загрузка анимаций
        this.load.spritesheet(
            'playerIdle',
            'assets/spritesheets/sprite/player/idle.png', {
            frameWidth: 192,
            frameHeight: 192,
            startFrame: 0,
            endFrame: 5
        });
        this.load.spritesheet(
            'playerWalkLeft',
            'assets/spritesheets/sprite/player/walk-left.png', {
            frameWidth: 192,
            frameHeight: 192,
            startFrame: 0,
            endFrame: 5
        });
        this.load.spritesheet(
            'playerWalkRight',
            'assets/spritesheets/sprite/player/walk-right.png', {
            frameWidth: 192,
            frameHeight: 192,
            startFrame: 0,
            endFrame: 5
        });
        this.load.spritesheet(
            'playerWalkUp',
            'assets/spritesheets/sprite/player/walk-up.png', {
            frameWidth: 192,
            frameHeight: 192,
            startFrame: 0,
            endFrame: 6
        });
        this.load.spritesheet(
            'playerWalkDown',
            'assets/spritesheets/sprite/player/walk-down.png',
            {
            frameWidth: 192,
            frameHeight: 192,
            startFrame: 0,
            endFrame: 6
        });
        this.load.spritesheet(
            'playerAttack',
            'assets/spritesheets/sprite/player/attack.png',
            {
            frameWidth: 192,
            frameHeight: 192,
            startFrame: 0,
            endFrame: 4
        });
        this.load.spritesheet(
            'enemy1Idle',
            'assets/spritesheets/sprite/enemy/slime-idle.png',
            {
            frameWidth: 192,
            frameHeight: 192,
            startFrame: 0,
            endFrame: 4
        });

        // Спрайт зелья здоровья
        this.load.image('potionHP', 'assets/spritesheets/sprite/items/poution.png');
        this.load.image('game_interface', 'assets/spritesheets/background/game_interface.png');

        this.load.tilemapTiledJSON('map', 'assets/tilemaps/tilemaps.tmj');
        this.load.image('tiles', 'assets/images/terrain_atlas.png');
    }

    create() {
        // По завершении загрузки переходим в сцену меню
        this.scene.start('MenuScene');
    }
}
