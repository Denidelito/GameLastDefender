export default class WorldScene extends Phaser.Scene {
    constructor() {
        super('WorldScene');
    }

    create() {
        // Загрузка фонового изображения или фонового цвета
        this.background = this.add.image(0, 0, 'land').setOrigin(0);

        // Устанавливаем размеры камеры сцены WorldScene
        this.cameras.main.setSize(959, 421);
        this.cameras.main.setPosition(25, 25);
        this.cameras.main.centerOn(959 / 2, 421 / 2); // Центрируем камеру по размеру
        // Загрузка фонового изображения или фонового цвета
        this.background = this.add.image(0, 0, 'land').setOrigin(0);

        // Объект с характеристиками игрока
        this.playerData = {
            x: 100,
            y: 300,
            width: 39,
            height: 50,
            speed: 2, // Скорость передвижения игрока
            health: 100, // Здоровье игрока
            damage: 10 // Урон, который игрок наносит
        };

        // Создаем игрока с использованием характеристик из объекта playerData
        this.player = this.add.rectangle(this.playerData.x, this.playerData.y, this.playerData.width, this.playerData.height, 0xffffff).setOrigin(0);

        // Устанавливаем размеры камеры сцены WorldScene
        this.cameras.main.setSize(959, 421);
        this.cameras.main.setPosition(25, 25);

        // Переменные для определения направления движения игрока
        this.directionX = 0;
        this.directionY = 0;


        // Флаг для отслеживания спавна противника
        this.isEnemySpawned = false;

        // Время последнего нанесения урона
        this.lastDamageTime = 0;

        // Устанавливаем интервал нанесения урона в 1 секунду
        this.damageInterval = 1000;

        // Переменная для отслеживания количества очков
        this.score = 0;


        // Объект с характеристиками противников
        this.enemiesData = [
            {
                type: 'enemy1',
                name: 'Противник 1', // Имя противника
                health: 50,
                damage: 5,
                color: 0xff0000 // Красный цвет
            },
            {
                type: 'enemy2',
                name: 'Противник 2', // Имя противника
                health: 80,
                damage: 8,
                color: 0x00ff00 // Зеленый цвет
            },
            {
                type: 'enemy3',
                name: 'Противник 3', // Имя противника
                health: 100,
                damage: 12,
                color: 0x0000ff // Синий цвет
            }
            // Можете добавить больше типов противников с их характеристиками и цветами по аналогии
        ];

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
        // Перемещение плеера к противнику
        this.player.x += this.directionX * this.playerData.speed;
        this.player.y += this.directionY * this.playerData.speed;

        // Ограничиваем позицию камеры, чтобы она не выходила за края фонового изображения
        const halfWidth = this.cameras.main.width / 2;
        const halfHeight = this.cameras.main.height / 2;
        const maxX = this.background.width - halfWidth;
        const maxY = this.background.height - halfHeight;
        this.cameras.main.scrollX = Phaser.Math.Clamp(this.player.x - halfWidth, 0, maxX);
        this.cameras.main.scrollY = Phaser.Math.Clamp(this.player.y - halfHeight, 0, maxY);

        // Определяем расстояние между плеером и противником
        const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.enemy.x, this.enemy.y);

        // Проверяем, достаточно ли прошло времени с момента последнего нанесения урона
        const currentTime = this.time.now;
        if (currentTime - this.lastDamageTime >= this.damageInterval) {
            // Если расстояние меньше определенного значения, игрок и противник начинают наносить урон друг другу
            if (distance < 50) {
                this.playerData.health -= this.enemy.damage;
                this.enemy.health -= this.playerData.damage;

                // Обновление показателей здоровья в информации
                this.scene.get('InfoScene').updatePlayerHealth(this.playerData.health);
                this.scene.get('InfoScene').updateEnemyHealth(this.enemy.health);

                // Проверяем состояние здоровья противника
                if (this.enemy.health <= 0) {
                    // Если здоровье противника меньше или равно 0, удаляем противника и спавним нового
                    this.enemy.destroy();
                    this.isEnemySpawned = false;
                    this.spawnRandomEnemy();

                    // Прибавляем 10 очков к счету после убийства противника
                    this.score += 10;

                    // Обновляем счет на сцене Game
                    this.scene.get('GameScene').updateScore(this.score);

                }

                // Обновляем время последнего нанесения урона
                this.lastDamageTime = currentTime;
            }
        }

        // Если расстояние меньше определенного значения, останавливаем плеера
        if (distance < 50) {
            this.directionX = 0;
            this.directionY = 0;
        } else {
            // Определяем направление движения плеера по горизонтали и вертикали
            if (this.player.x < this.enemy.x) {
                this.directionX = 1; // Движение вправо
            } else if (this.player.x > this.enemy.x) {
                this.directionX = -1; // Движение влево
            } else {
                this.directionX = 0; // Стоп по горизонтали
            }

            if (this.player.y < this.enemy.y) {
                this.directionY = 1; // Движение вниз
            } else if (this.player.y > this.enemy.y) {
                this.directionY = -1; // Движение вверх
            } else {
                this.directionY = 0; // Стоп по вертикали
            }
        }
    }
}
