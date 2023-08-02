export default class WorldScene extends Phaser.Scene {
    constructor() {
        super('WorldScene');
    }

    create() {
        // Загрузка фонового изображения или фонового цвета
        this.add.image(0, 0, 'land').setOrigin(0);
        this.player = this.add.rectangle(600, 600, 39, 50, 0xffffff).setOrigin(0);


        // Устанавливаем размеры камеры сцены WorldScene
        this.cameras.main.setSize(959, 421);
        this.cameras.main.setPosition(25, 25);
        this.cameras.main.centerOn(959 / 2, 421 / 2); // Центрируем камеру по размеру
    }

    update() {
        // Следование камеры за игроком
        this.cameras.main.scrollX = this.player.x - this.cameras.main.width / 2;
        this.cameras.main.scrollY = this.player.y - this.cameras.main.height / 2;
    }
}
