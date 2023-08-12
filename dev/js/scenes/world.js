import playerData from "../object/player";
import staff from "../object/items";
import enemiesData from "../object/enemies";
import {createTilemap} from "../utils/createTilemap";
import { setupCamera } from "../config/cameraSetup";
import { spawnRandomEnemy } from "../helpers/enemySpawner";
import {createAnimations} from "../utils/createAnimation";
import {wordGrid} from "../helpers/worldGrid";

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
            1467,
            660,
            21,
            24);

        this.GameData = {
            // Объект с характеристиками игрока
            playerData: structuredClone(playerData),
            // Объект с характеристиками противников
            enemiesData: structuredClone(enemiesData),
            combat: {
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
        if (!this.GameData.isEnemySpawned) {
            spawnRandomEnemy(this, this.GameData.enemiesData);
        }

        // Обновляем позицию камеры, чтобы она следовала за персонажем
        const mainCamera = this.cameras.main
        mainCamera.scrollX = this.player.x - mainCamera.width / 2;
        mainCamera.scrollY = this.player.y - mainCamera.height / 2;

        // Обновляем характеристики персонажа
        this.scene.get('SpecificationsScene').updateInformationPlayer(
            'Уровень: 1',
            `Здоровье: ${this.GameData.playerData.health} / 100`,
            `Опыт: ${this.GameData.score}`,
            `Урон: ${playerData.damage}`)


        // Проверям здоровье персанажа и рестартим игру
        if (this.GameData.playerData.health <= 0) {
            this.scene.get('GameScene').resetGame();
        }
    }
}
