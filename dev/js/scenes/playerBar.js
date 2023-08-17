export default class PlayerBarScene extends Phaser.Scene{
    constructor() {
        super('PlayerBarScene');
    }

    create() {
        this.cameras.main.setSize(494, 264);
        this.cameras.main.setPosition(48, 48);
        // Центрируем камеру по размеру
        this.cameras.main.centerOn(494 / 2, 264 / 2);

        this.add.image(0, 0, 'player_bar').setOrigin(0, 0);
    }
}
