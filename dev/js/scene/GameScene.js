import WorldScene from "./GameScene/WorldScene.js";
import playerData from "../object/player.js";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        this.data.set('player', playerData);

        this.cameras.main.setViewport(0, 0, 1920, 1080);

        this.add.image(0, 0, 'ui-game-interface').setOrigin(0);

        this.scene.add('WorldScene', WorldScene, true);
    }
}