export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    preload(): void {
        this.load.image('loaderBg', 'assets/images/loader.png');
        this.load.spritesheet('player',
            'assets/sprites/player/player.png',
            true,
            {frameWidth: 128, frameHeight: 128}
        );
        this.load.spritesheet('player-had',
            'assets/sprites/player/player-had.png',
            true,
            {frameWidth: 128, frameHeight: 128}
        );

        this.load.on('progress', (value: any) => {
            console.log(Math.round(value * 100) + '%');
        });

        // Скрываем спрайт после завершения загрузки
        this.load.once('complete', () => {
            this.scene.start('GameScene');
        });
    }


    create() : void {
        // Создаем спрайт для отображения изображения во время загрузки
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'loaderBg');
    }
}