import WorldScene from "./GameScene/WorldScene.js";
import playerData from "../object/player.js";
import enemiesData from "../object/enemies.js";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        // Объект с характеристиками игрока
        this.data.set('player', structuredClone(playerData));

        // Объект с характеристиками противников
        this.data.set('enemy', structuredClone(enemiesData));

        // Хранилище enemy которые заспавнились на карте
        this.data.set('spawnEnemy', {
            livingEnemies: []
        });

        this.cameras.main.setViewport(0, 0, 1920, 1080);

        this.add.image(0, 0, 'ui-game-interface').setOrigin(0);

        this.scene.add('WorldScene', WorldScene, true);
    }
}