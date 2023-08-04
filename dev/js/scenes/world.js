import playerData from "../object/player";
import enemiesData from "../object/enemies";
import { calculatePlayerMovement } from "../utils/playerMovement";
import { setupCamera } from "../config/cameraSetup";
import { handleCombat } from "../helpers/combat";
import { spawnRandomEnemy } from "../helpers/enemySpawner";
import {playWalkAnimation} from "../utils/playerMovement";

export default class WorldScene extends Phaser.Scene {
    constructor() {
        super('WorldScene');
    }

    create() {
        // Загрузка фонового изображения или фонового цвета
        this.background = this.add.image(0, 0, 'land').setOrigin(0);

        // Вызываем функцию для создания и настройки камеры
        setupCamera(this, 1467, 660, 21, 24);

        // Объект с характеристиками игрока
        this.playerData = playerData;

        // Объект с характеристиками противников
        this.enemiesData = enemiesData;

        // Создаем персонажа в виде спрайта
        this.player = this.add.sprite(playerData.x, playerData.y, 'playerSprite');
        this.player.setScale(playerData.width / this.player.width, playerData.height / this.player.height);

        // Добавляем анимацию ходьбы вправо
        this.anims.create({
            key: 'walk-left',
            frames: this.anims.generateFrameNumbers('playerWalkLeft', { start: 0, end: 5 }),
            frameRate: 8,
            repeat: -1,
        });
        this.anims.create({
            key: 'walk-right',
            frames: this.anims.generateFrameNumbers('playerWalkRight', { start: 0, end: 5 }),
            frameRate: 8,
            repeat: -1,
        });
        this.anims.create({
            key: 'walk-up',
            frames: this.anims.generateFrameNumbers('playerWalkUp', { start: 0, end: 5 }),
            frameRate: 8,
            repeat: -1,
        });
        this.anims.create({
            key: 'walk-down',
            frames: this.anims.generateFrameNumbers('playerWalkDown', { start: 0, end: 5 }),
            frameRate: 8,
            repeat: -1,
        });

        // Время последнего нанесения урона
        this.lastDamageTime = 0;
        this.isCombatTurn = 'player';

        // В начале создания персонажа
        this.isMovingOnX = true; // Флаг для отслеживания движения по оси X

        // Переменная для отслеживания количества очков
        this.score = 0;

        // Флаг для отслеживания спавна противника
        this.isEnemySpawned = false;
    }

    updatePlayer(itemName) {
        if (itemName === 'potion') {
            this.playerData.health += 100;
        }
    }

    update() {
        if (!this.isEnemySpawned) {
            spawnRandomEnemy(this, this.enemiesData);
        }
        // Обновляем позицию камеры, чтобы она следовала за персонажем
        this.cameras.main.scrollX = this.player.x - this.cameras.main.width / 2;
        this.cameras.main.scrollY = this.player.y - this.cameras.main.height / 2;

        // Вызываем функцию для определения направления движения персонажа
        const { directionX, directionY } = calculatePlayerMovement(this.player, this.enemy);

        handleCombat(this.player, this.enemy, this.lastDamageTime, this.score, this.isCombatTurn);

        // Изменяем позицию спрайта в соответствии с направлением
        if (this.isMovingOnX) {
            this.player.x += directionX * this.playerData.speed;

            playWalkAnimation(this.player, directionX, directionY);

            if (directionX === 0) {
                this.isMovingOnX = false;
            }
        } else {
            this.player.y += directionY * this.playerData.speed;

            playWalkAnimation(this.player, directionX, directionY);

            if (directionY === 0) {
                this.isMovingOnX = true;
            }
        }



        if (this.playerData.health <= 0) {
            this.scene.get('GameScene').resetGame();
            this.playerData.health = 100;
        }
    }
}
