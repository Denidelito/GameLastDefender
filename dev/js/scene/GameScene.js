import WorldScene from "./GameScene/WorldScene.js";
import playerData from "../object/player.js";
import enemiesData from "../object/enemies.js";
import QuestScene from "./GameScene/interfaceScene/questScene.js";

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
            lastTimeSpawn: -12000,
            intervalTimeSpawn: 10000
        });

        this.cameras.main.setViewport(0, 0, 1920, 1080);

        this.add.image(0, 0, 'ui-game-interface').setOrigin(0);

        this.scene.add('WorldScene', WorldScene, true);
        this.scene.add('QuestScene', QuestScene, true);1
    }
}