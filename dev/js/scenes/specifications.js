export default class SpecificationsScene extends Phaser.Scene{
    constructor() {
        super(SpecificationsScene);
    }

    create() {
        this.cameras.main.setSize(249, 152);
        this.cameras.main.setPosition(1015, 305);
        this.cameras.main.centerOn(249 / 2, 152 / 2); // Центрируем камеру по размеру

        this.text = this.add.text(0, 0, '123', { fontFamily: 'Arial', color: '#00ff00', wordWrap: { width: 310 } }).setOrigin(0);
    }
}