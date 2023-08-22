import {spawnRandomEnemy} from "../../helpers/enemy/enemySpawner.js";
import {createTilemap} from "../../utils/createTilemap.js";
import {createAnimations} from "../../utils/createAnimation.js";
import {cameraPlayer} from "../../config/cameraPlayer.js";
import {createGrid} from "../../config/createGrid.js";
import {combatEnemy} from "../../helpers/enemy/enemyCombat.js";
import staff from "../../object/items.js";

export default class WorldScene extends Phaser.Scene {
    constructor() {
        super('WorldScene');
    }

    create() {
        this.soundAttack = this.sound.add('sound-player-attack', { loop: true, volume: 0.1 });
        // Получаем информацию об игроке
        const player = this.scene.get('GameScene').data.get('player');

        // Создаем камера на персонаже
        cameraPlayer(this, 1360, 640, 36, 36)

        // Создайем tilemap
        createTilemap(this);

        // Создаем анимации
        createAnimations(this);

        this.scene.get('GameScene').data.get('spawnEnemy');

        // Создаем персонажа в виде спрайта
        this.playerSprite = this.add.sprite(
            player.spawnPosition.x,
            player.spawnPosition.y,
            player.sprites);

        // Задаем размеры спрайте Player
        this.playerSprite.setScale(
            player.sizeSprite.width / this.playerSprite.width,
            player.sizeSprite.height / this.playerSprite.height
        ).setOrigin(0, 0.5).setDepth(1);

        // Включаем анимацию idle у player
        this.playerSprite.anims.play('idle', true);
    }


    updatePlayer(idStaff) {
        // Получаем выьранный предмет
        const currentStaff = staff[idStaff],
            player = this.scene.get('GameScene').data.get('player');

        // Проверяем к какому типу он оттносится
        if (currentStaff.type === 'potion') {
            // Обновлям характеристики игрока
            if (player.characteristics.health + currentStaff.stats.health < 100) {
                player.characteristics.health += currentStaff.stats.health;
            } else {
                player.characteristics.health = 100;
            }
        }
    }

    update(time, delta) {
        super.update(time, delta);

        const spawnEnemy = this.scene.get('GameScene').data.get('spawnEnemy'),
            enemy = this.scene.get('GameScene').data.get('enemy'),
            combat = this.scene.get('GameScene').data.get('combat'),
            player = this.scene.get('GameScene').data.get('player'),
            worldChaos = this.scene.get('GameScene').data.get('worldChaos');

        // Обновляем позицию камеры, чтобы она следовала за персонажем
        const mainCamera = this.cameras.main

        // Вычисляем новые значения scrollX и scrollY, учитывая границы tilemap и размеры камеры
        const newScrollX = Phaser.Math.Clamp(
            this.playerSprite.x - mainCamera.width / 2,
            0,
            this.map.widthInPixels - mainCamera.width
        );

        const newScrollY = Phaser.Math.Clamp(
            this.playerSprite.y - mainCamera.height / 2,
            0,
            this.map.heightInPixels - mainCamera.height
        );

        // Устанавливаем новые значения scrollX и scrollY
        mainCamera.scrollX = newScrollX;
        mainCamera.scrollY = newScrollY;

        // Если противник мертв спавним нового
        if (time - spawnEnemy.lastTimeSpawn >= spawnEnemy.intervalTimeSpawn) {
            spawnRandomEnemy(this, enemy);

            spawnEnemy.lastTimeSpawn = time;

            this.scene.get('QuestScene').updateQuest(this, spawnEnemy.livingEnemies)
        }

        // Проверяем нужно ли атаковать
        if (combat.active) {
            combatEnemy(this, this.playerSprite, spawnEnemy.livingEnemies[player.target], combat);
        }

        this.scene.get('PlayerBarScene').updateHealth(player.characteristics.health);
        this.scene.get('ChaosBarScene').updateChaos(worldChaos.current);

        // Обновляем характеристики персонажа
        this.scene.get('SpecificationsScene').updateInformationPlayer(
            `Сила: ${player.characteristics.force}`,
            `Ловкость: ${player.characteristics.agility}`,
            `Удача: ${player.characteristics.luck}`,
            `Урон: ${player.characteristics.damage}`,
            `Защита: ${player.characteristics.protection}`,
        )

        // Проверям здоровье персанажа и рестартим игру
        if (player.characteristics.health <= 0 || worldChaos.current >= worldChaos.max) {
            this.scene.get('GameScene').resetGame();
        }
    }
}