import WorldScene from "./GameScene/WorldScene.js";
import playerData from "../object/player.js";
import enemiesData from "../object/enemies.js";
import QuestScene from "./GameScene/interfaceScene/QuestScene.js";
import InformationScene from "./GameScene/interfaceScene/InformationScene.js";
import InventoryScene from "./GameScene/interfaceScene/InventoryScene.js";
import SpecificationsScene from "./GameScene/interfaceScene/SpecificationsScene.js";
import PlayerBarScene from "./GameScene/interfaceScene/PlayerBarScene.js";
import player from "../object/player.js";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        // Объект с характеристиками игрока
        this.data.set('player', structuredClone(playerData));

        // Объект с характеристиками противников
        this.data.set('enemy', structuredClone(enemiesData));

        // Обект с данными о ведении боя
        this.data.set('combat', {
                active: false,
                // Время последнего нанесения урона
                lastDamageTime: 0,
                // Очередность ударов
                isCombatTurn: 'player',
                // Интервал уларов
                damageInterval: 2000,
        });

        // Хранилище enemy которые заспавнились на карте
        this.data.set('spawnEnemy', {
            livingEnemies: [],
            lastTimeSpawn: -20000,
            intervalTimeSpawn: 10000
        });

        this.cameras.main.setViewport(0, 0, 1920, 1080);

        this.add.image(0, 0, 'ui-game-interface').setOrigin(0);

        this.scene.add('WorldScene', WorldScene, true);
        this.scene.add('QuestScene', QuestScene, true);
        this.scene.add('InformationScene', InformationScene, true);
        this.scene.add('InventoryScene', InventoryScene, true);
        this.scene.add('SpecificationsScene', SpecificationsScene, true);
        this.scene.add('PlayerBarScene', PlayerBarScene, true);

    }

    resetGame() {
        this.scene.remove('WorldScene');
        this.scene.remove('QuestScene');
        this.scene.remove('InformationScene');
        this.scene.remove('InventoryScene');
        this.scene.remove('SpecificationsScene');
        this.scene.remove('PlayerBarScene');
        this.scene.start('GameOverScene');
    }
}