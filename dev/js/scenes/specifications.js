export default class SpecificationsScene extends Phaser.Scene{
    constructor() {
        super(SpecificationsScene);
    }

    create() {
        this.cameras.main.setSize(370, 224);
        this.cameras.main.setPosition(1524, 458);
        this.cameras.main.centerOn(370 / 2, 224 / 2); // Центрируем камеру по размеру

        this.text = this.add.text(0, 0, '123', { fontFamily: 'Arial', color: '#00ff00', wordWrap: { width: 310 } }).setOrigin(0);
    }
}