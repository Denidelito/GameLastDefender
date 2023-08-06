export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        // Фоновое изображение
        this.add.image(0, 0, 'background').setOrigin(0);

        // Загрузка полосы (здесь показан простой способ, вы можете использовать свои спрайты для стилизации)
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


        this.load.image('playerSprite', 'assets/spritesheets/player.png');
        this.load.spritesheet('playerWalkLeft', 'assets/spritesheets/sprite/player/walk-left.png', {
            frameWidth: 128,
            frameHeight: 128,
            startFrame: 0,
            endFrame: 6
        });
        this.load.spritesheet('playerWalkRight', 'assets/spritesheets/sprite/player/walk-right.png', {
            frameWidth: 128,
            frameHeight: 128,
            startFrame: 0,
            endFrame: 6
        });
        this.load.spritesheet('playerWalkUp', 'assets/spritesheets/sprite/player/walk-up.png', {
            frameWidth: 128,
            frameHeight: 128,
            startFrame: 0,
            endFrame: 6
        });
        this.load.spritesheet('playerWalkDown', 'assets/spritesheets/sprite/player/walk-down.png', {
            frameWidth: 128,
            frameHeight: 128,
            startFrame: 0,
            endFrame: 6
        });


        this.load.image('land', 'assets/spritesheets/background/land.png');
        this.load.image('potionHP', 'assets/spritesheets/sprite/items/poution.png');
        this.load.image('game_interface', 'assets/spritesheets/background/game_interface.png');
    }

    create() {
        // По завершении загрузки переходим в сцену меню
        this.scene.start('MenuScene');
    }
}
