export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    preload(): void {
        this.load.image('loaderBg', 'assets/images/loader.png');
        this.load.image('playerDefault', 'assets/sprites/player/player.png');

        this.load.on('progress', (value: any) => {
            console.log(value + '%');
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