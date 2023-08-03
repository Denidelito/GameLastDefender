import playerData from "../object/player";
import enemiesData from "../object/enemies";
import {calculatePlayerMovement} from "../utils/playerMovement";
import {setupCamera} from "../config/cameraSetup";
import {handleCombat} from "../helpers/combat";
import {spawnRandomEnemy} from "../helpers/enemySpawner";

export default class WorldScene extends Phaser.Scene {
    constructor() {
        super('WorldScene');
    }

    create() {
        // Загрузка фонового изображения или фонового цвета
        this.background = this.add.image(0, 0, 'land').setOrigin(0);

        // Вызываем функцию для создания и настройки камеры
        setupCamera(this, 959, 421, 25, 25);

        // Загрузка фонового изображения или фонового цвета
        this.background = this.add.image(0, 0, 'land').setOrigin(0);

        // Объект с характеристиками игрока
        this.playerData = playerData;

        // Создаем персонажа в виде спрайта
        this.player = this.add.sprite(playerData.x, playerData.y, 'playerSprite'); // Изображение playerSprite.png должно быть предварительно загружено с помощью загрузчика

        // Изменяем размер спрайта в соответствии с playerData.width и playerData.height
        this.player.setScale(playerData.width / this.player.width, playerData.height / this.player.height);

        // Флаг для отслеживания спавна противника
        this.isEnemySpawned = false;

        // Время последнего нанесения урона
        this.lastDamageTime = 0;

        // Переменная для отслеживания количества очков
        this.score = 0;

        // Объект с характеристиками противников
        this.enemiesData = enemiesData;

        // Флаг для отслеживания спавна противника
        this.isEnemySpawned = false;

        // Создаем текстовый объект для отображения имени противника
        this.enemyNameText = this.add.text(0, 0, '', { fontFamily: 'CustomFont', fontSize: '14px', fill: '#ffffff' });
        this.enemyNameText.setOrigin(0.5, 1); // Устанавливаем точку опоры для центрирования текста

    }
    update() {
        if (!this.isEnemySpawned) {
            spawnRandomEnemy (this, this.enemiesData);
        }
        // Обновляем позицию камеры, чтобы она следовала за персонажем
        this.cameras.main.scrollX = this.player.x - this.cameras.main.width / 2;
        this.cameras.main.scrollY = this.player.y - this.cameras.main.height / 2;

        // Вызываем функцию для определения направления движения персонажа
        const { directionX, directionY } = calculatePlayerMovement(this.player, this.enemy);

        handleCombat(this.player, this.enemy, this.lastDamageTime, this.score);

        // Изменяем позицию спрайта в соответствии с направлением
        this.player.x += directionX * this.playerData.speed;
        this.player.y += directionY * this.playerData.speed;

        if (this.playerData.health <= 0) {
            this.scene.get('GameScene').resetGame();
            this.playerData.health = 100;
        }
    }
}
