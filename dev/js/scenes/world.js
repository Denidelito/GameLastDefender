import playerData from "../object/player";
import enemiesData from "../object/enemies";
import {calculatePlayerMovement} from "../utils/playerMovement";
import {setupCamera} from "../config/cameraSetup";
import {handleCombat} from "../helpers/combat";

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

        // Устанавливаем размеры камеры сцены WorldScene
        this.cameras.main.setSize(959, 421);
        this.cameras.main.setPosition(25, 25);

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

        this.spawnRandomEnemy();
    }
    spawnRandomEnemy() {
        // Проверяем флаг, чтобы убедиться, что на сцене нет другого противника
        if (this.isEnemySpawned) {
            return; // Возвращаемся, если противник уже заспавнен
        }

        // Генерируем случайные координаты для противника в пределах размеров сцены
        const randomX = Phaser.Math.Between(0, 1920);
        const randomY = Phaser.Math.Between(0, 1080);


        this.enemy = this.add.rectangle(randomX, randomY, 28, 28).setOrigin(0);

        // Обновляем характеристики противника на основе случайного выбора из объекта enemiesData
        const randomIndex = Phaser.Math.Between(0, this.enemiesData.length - 1);
        const randomEnemy = this.enemiesData[randomIndex];
        this.enemy.x = randomX;
        this.enemy.y = randomY;
        this.enemy.health = randomEnemy.health;
        this.enemy.damage = randomEnemy.damage;
        this.enemy.setFillStyle(randomEnemy.color);

        // Обновляем текстовые объекты с именем и здоровьем противника
        this.enemyNameText.setText(randomEnemy.name);
        this.enemyNameText.setPosition(this.enemy.x + this.enemy.width / 2, this.enemy.y); // Позиционируем над противником

        // Устанавливаем флаг в true, чтобы отметить, что противник заспавнен
        this.isEnemySpawned = true;


    }

    updateScore(score) {
        // Обновляем текстовый объект с счетом
        this.scoreText.setText(`Score: ${score}`);

        // Передаем счет на сцену InfoScene
        this.infoScene.updateScore(score);
    }
    update() {
        // Обновляем позицию камеры, чтобы она следовала за персонажем
        this.cameras.main.scrollX = this.player.x - this.cameras.main.width / 2;
        this.cameras.main.scrollY = this.player.y - this.cameras.main.height / 2;

        // Вызываем функцию для определения направления движения персонажа
        const { directionX, directionY } = calculatePlayerMovement(this.player, this.enemy);

        handleCombat(this.player, this.enemy, this.lastDamageTime, this.score);

        // Изменяем позицию спрайта в соответствии с направлением
        this.player.x += directionX * this.playerData.speed;
        this.player.y += directionY * this.playerData.speed;

    }
}
