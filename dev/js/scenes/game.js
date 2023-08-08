import WorldScene from './world';
import InfoScene from './info';
import SpecificationsScene from "./specifications";
import playerData from "../object/player";
import InventoryScene from "./Inventory";
import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        this.cameras.main.setViewport(0, 0, 1920, 1080);

        this.add.image(0, 0, 'game_interface').setOrigin(0);

        if (!this.scene.isActive('WorldScene')) {
            this.scene.add('WorldScene', WorldScene, true);
            this.scene.add('InfoScene', InfoScene, true);
            this.scene.add('InventoryScene', InventoryScene, true);
            this.scene.add('SpecificationsScene', SpecificationsScene, true)
        }
    }
    resetGame() {
        this.score = 0;
        this.scene.remove('WorldScene')
        this.scene.remove('InfoScene')
        this.scene.remove('SpecificationsScene')
        this.scene.remove('InventoryScene')
        this.scene.restart()

    }
}
