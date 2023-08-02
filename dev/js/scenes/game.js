import WorldScene from './world';
export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        this.cameras.main.setViewport(0, 0, 1280, 720);

        this.add.image(0, 0, 'game_interface').setOrigin(0);

        this.scene.add('WorldScene', WorldScene, true);
    }
}
