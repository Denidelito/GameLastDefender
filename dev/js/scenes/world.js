import playerData from "../object/player";
import staff from "../object/items";
import enemiesData from "../object/enemies";
import {createTilemap} from "../utils/createTilemap";
import { setupCamera } from "../config/cameraSetup";
import { spawnRandomEnemy } from "../helpers/enemySpawner";
import {createAnimations} from "../utils/createAnimation";
import {wordGrid} from "../helpers/worldGrid";
import {handleCombat} from "../helpers/combat";

export default class WorldScene extends Phaser.Scene {
    constructor() {
        super('WorldScene');
    }

    create() {
        createTilemap(this);

        wordGrid(this, this.map, false)

        // Включить диагональное передвижение
        // this.easystar.enableDiagonals();

        // Вызываем функцию для создания и настройки камеры
        setupCamera(
            this,
            1362,
            640,
            36,
            36);

        this.GameData = {
            // Объект с характеристиками игрока
            playerData: structuredClone(playerData),
            playerTarget: null,
            // Объект с характеристиками противников
            enemiesData: structuredClone(enemiesData),
            // Массив с живыми противниками
            spawnEnemy: {
                lastTimeSpawn: 0,
                intervalTimeSpawn: 5000,
                livingEnemies: [],
            },
            combat: {
                active: false,
                // Время последнего нанесения урона
                lastDamageTime: 0,
                // Очередность ударов
                isCombatTurn: 'player',
                // Интервал уларов
                damageInterval: 2000,
            },
            // Переменная для отслеживания количества очков
            score: 0,
            // Флаг для отслеживания спавна противника
            isEnemySpawned: false
        }

        // Создаем персонажа в виде спрайта
        this.player = this.add.sprite(
            this.GameData.playerData.x,
            this.GameData.playerData.y,
            'playerSprite');
        this.player.setScale(
            playerData.width / this.player.width,
            playerData.height / this.player.height
        ).setOrigin(0, 0.5).setDepth(1);

        createAnimations(this);
        spawnRandomEnemy(this, this.GameData.enemiesData);

        this.GameData.isAnimationCreate = true;
    }

    updatePlayer(idStaff) {

        // Получаем выьранный предмет
        const currentStaff = staff[idStaff];

        // Проверяем к какому типу он оттносится
        if (currentStaff.type === 'potion') {

            // Обновлям характеристики игрока
            const playerSpecifications  = this.GameData.playerData;

            playerSpecifications.health += currentStaff.stats.health;
            playerSpecifications.damage += currentStaff.stats.damage;
            playerSpecifications.speed += currentStaff.stats.speed;
        }
    }

    update() {
        // Если противник мертв спавним нового
        if (this.player.scene.time.now - this.GameData.spawnEnemy.lastTimeSpawn >= this.GameData.spawnEnemy.intervalTimeSpawn && this.GameData.spawnEnemy.livingEnemies.length <= 10) {
            spawnRandomEnemy(this, this.GameData.enemiesData);

            this.GameData.spawnEnemy.lastTimeSpawn = this.player.scene.time.now;

            this.scene.get('QuestScene').updateQuest(this, this.GameData.spawnEnemy.livingEnemies)
        }

        if (this.GameData.combat.active) {
            handleCombat(this, this.player, this.GameData.spawnEnemy.livingEnemies[this.GameData.playerTarget], this.GameData.combat, this.GameData.score);
        }

        // Обновляем позицию камеры, чтобы она следовала за персонажем
        const mainCamera = this.cameras.main
        mainCamera.scrollX = this.player.x - mainCamera.width / 2;
        mainCamera.scrollY = this.player.y - mainCamera.height / 2;

        // Обновляем характеристики персонажа
        this.scene.get('SpecificationsScene').updateInformationPlayer(
            `Сила: ${this.GameData.playerData.characteristics.force}`,
            `Ловкость: ${this.GameData.playerData.characteristics.agility}`,
            `Удача: ${this.GameData.playerData.characteristics.luck}`,
            `Урон: ${this.GameData.playerData.characteristics.damage}`,
            `Защита: ${this.GameData.playerData.characteristics.protection}`,
        )


        // Проверям здоровье персанажа и рестартим игру
        if (this.GameData.playerData.health <= 0) {
            this.scene.get('GameScene').resetGame();
        }
    }
}
