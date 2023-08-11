import playerData from "../object/player";
import staff from "../object/items";
import enemiesData from "../object/enemies";
import EasyStar from 'easystarjs';
import { setupCamera } from "../config/cameraSetup";
import { spawnRandomEnemy } from "../helpers/enemySpawner";
import {createPlayerAnimations} from "../utils/playerMovement";
import player from "../object/player";

export default class WorldScene extends Phaser.Scene {
    constructor() {
        super('WorldScene');
    }

    create() {
        let tile;

        this.map = this.make.tilemap({ key: 'map' });
        this.map2 = this.make.tilemap({ key: 'map' });
        tile = this.map.addTilesetImage('tilemap', 'tiles');
        this.groundLayer = this.map.createLayer('main', tile, 0, 0);
        this.woodLayer = this.map.createLayer('wood', tile, 0, 0);
        this.hs = this.map2.createLayer('hs', tile, 0, 0).setDepth(3);


        // Настройте свойства тайлов (проходимость и др.)
        this.map.setCollisionByProperty({ collides: true });

        // Настройте параметры сетки
        const gridConfig = {
            width: this.map.width,
            height: this.map.height,
            cellSize: this.map.tileWidth,
            showHexGrid: false,
        };

        // Создайте сетку
        this.gridGraphics = this.add.graphics();
        this.gridGraphics.lineStyle(2, 0xffffff, 0.5);

        // Отобразите поля сетки, рисуя границы каждого тайла
        for (let row = 0; row < gridConfig.height; row++) {
            for (let col = 0; col < gridConfig.width; col++) {
                const x = col * gridConfig.cellSize;
                const y = row * gridConfig.cellSize;

                if (gridConfig.showHexGrid) {
                    this.gridGraphics.strokeRect(x, y, gridConfig.cellSize, gridConfig.cellSize);
                }
            }
        }

        // Получите данные тайлов
        const tileData = this.woodLayer.layer.data;
        const gridOccupied = [];

        // Создайте сетку для EasyStar
        const grid = [];
        for (let y = 0; y < tileData.length; y++) {
            const row = [];
            for (let x = 0; x < tileData[y].length; x++) {
                console.log()
                // Проверьте свойство "walkable" тайла
                const isWalkable = tileData[y][x].index === -1;
                // 0 - проходимый, 1 - непроходимый
                row.push(isWalkable ? 0 : 1);
            }
            grid.push(row);
        }
        // В конструкторе сцены
        this.easystar = new EasyStar.js();
        this.easystar.setGrid(grid);
        this.easystar.setAcceptableTiles([0]);
        // Если вы хотите включить диагональное передвижение
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
        this.player = this.add.sprite(this.GameData.playerData.x, this.GameData.playerData.y, 'playerSprite');
        this.player.setScale(
            playerData.width / this.player.width,
            playerData.height / this.player.height
        ).setOrigin(0, 0.5).setDepth(1);
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


        // Проверям здоровье персанажа и рестартим игру
        if (this.GameData.playerData.health <= 0) {
            this.scene.get('GameScene').resetGame();
            this.GameData.playerData.health = 100;
        }
    }
}
