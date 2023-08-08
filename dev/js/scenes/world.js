import playerData from "../object/player";
import staff from "../object/items";
import enemiesData from "../object/enemies";
import { setupCamera } from "../config/cameraSetup";
import { handleCombat } from "../helpers/combat";
import { spawnRandomEnemy } from "../helpers/enemySpawner";
import {playWalkAnimation, createPlayerAnimations, calculatePlayerMovement} from "../utils/playerMovement";

export default class WorldScene extends Phaser.Scene {
    constructor() {
        super('WorldScene');
    }

    create() {
        // Загрузка фонового изображения или фонового цвета
        this.add.image(0, 0, 'land').setOrigin(0);

        // Вызываем функцию для создания и настройки камеры
        setupCamera(
            this,
            1467,
            660,
            21,
            24);


        this.GameData = {
            // Объект с характеристиками игрока
            playerData: playerData,
            // Объект с характеристиками противников
            enemiesData: enemiesData,
            combat: {
                // Время последнего нанесения урона
                lastDamageTime: 0,
                // Очередность ударов
                isCombatTurn: 'player',
                // Интервал уларов
                damageInterval: 1000
            },
            // Переменная для отслеживания количества очков
            score: 0,
            // Флаг для отслеживания движения по оси X
            isMovingOnX: true,
            // Флаг для отслеживания спавна противника
            isEnemySpawned: false
        }

        // Создаем персонажа в виде спрайта
        this.player = this.add.sprite(playerData.x, playerData.y, 'playerSprite');
        this.player.setScale(
            playerData.width / this.player.width,
            playerData.height / this.player.height
        );

        createPlayerAnimations(this);
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
            `Здоровье: ${playerData.health} / 100`,
            `Опыт: ${this.GameData.score}`,
            `Урон: ${playerData.damage}`)

        // Вызываем функцию для определения направления движения персонажа
        const { directionX, directionY } = calculatePlayerMovement(this.player, this.enemy);

        // Запуск боя
        handleCombat(this.player, this.enemy, this.GameData.combat, this.GameData.score);

        // Изменяем позицию спрайта в соответствии с направлением
        if (this.GameData.isMovingOnX) {
            this.player.x += directionX * this.GameData.playerData.speed;

            playWalkAnimation(this.player, directionX, directionY);

            if (directionX === 0) {
                this.GameData.isMovingOnX = false;
            }
        } else {
            this.player.y += directionY * this.GameData.playerData.speed;

            playWalkAnimation(this.player, directionX, directionY);

            if (directionY === 0) {
                this.GameData.isMovingOnX = true;
            }
        }

        // Проверям здоровье персанажа и рестартим игру
        if (this.GameData.playerData.health <= 0) {
            this.scene.get('GameScene').resetGame();
            this.GameData.playerData.health = 100;
        }
    }
}
