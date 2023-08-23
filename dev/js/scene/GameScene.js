import WorldScene from "./GameScene/WorldScene.js";
import playerData from "../object/player.js";
import enemiesData from "../object/enemies.js";
import QuestScene from "./GameScene/interfaceScene/QuestScene.js";
import InformationScene from "./GameScene/interfaceScene/InformationScene.js";
import InventoryScene from "./GameScene/interfaceScene/InventoryScene.js";
import SpecificationsScene from "./GameScene/interfaceScene/SpecificationsScene.js";
import PlayerBarScene from "./GameScene/interfaceScene/PlayerBarScene.js";
import player from "../object/player.js";
import ChaosBarScene from "./GameScene/interfaceScene/ChaosBarScene.js";
import {EquipmentScene} from "./GameScene/interfaceScene/EquipmentScene.js";
import MeinMenuScene from "./MeinMenuScene.js";

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

        // Хранилище enemy которые заспавнились на карте
        this.data.set('worldChaos', {
            current: 0,
            max: 100
        });

        this.cameras.main.setViewport(0, 0, 1920, 1080);

        this.add.image(0, 0, 'ui-game-interface').setOrigin(0);

        this.scene.add('WorldScene', WorldScene, true);
        this.scene.add('QuestScene', QuestScene, true);
        this.scene.add('InformationScene', InformationScene, true);
        this.scene.add('InventoryScene', InventoryScene, true);
        this.scene.add('SpecificationsScene', SpecificationsScene, true);
        this.scene.add('PlayerBarScene', PlayerBarScene, true);
        this.scene.add('ChaosBarScene', ChaosBarScene, true);
        this.scene.add('EquipmentScene', EquipmentScene, true);

    }

    resetGame() {
        this.scene.remove('WorldScene');
        this.scene.remove('QuestScene');
        this.scene.remove('InformationScene');
        this.scene.remove('InventoryScene');
        this.scene.remove('SpecificationsScene');
        this.scene.remove('PlayerBarScene');
        this.scene.remove('ChaosBarScene');
        this.scene.remove('EquipmentScene');
        this.scene.start('GameOverScene');
    }
}