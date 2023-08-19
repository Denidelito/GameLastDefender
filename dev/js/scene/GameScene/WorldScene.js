import {createTilemap} from "../../utils/createTilemap.js";
import {createAnimations} from "../../utils/createAnimation.js";
import {cameraPlayer} from "../../config/cameraPlayer.js";
import {spawnRandomEnemy} from "../../helpers/enemy/enemySpawner.js";
import {createGrid} from "../../config/createGrid.js";
export default class WorldScene extends Phaser.Scene {
    constructor() {
        super('WorldScene');
    }

    create() {
        // Получаем информацию об игроке
        const player = this.scene.get('GameScene').data.get('player'),
            enemy = this.scene.get('GameScene').data.get('enemy');

        // Создаем камера на персонаже
        cameraPlayer(this, 1360, 640, 36, 36)

        // Создайем tilemap
        createTilemap(this);

        // Сетка
        // createGrid(this, this.map, true);

        // Создаем анимации
        createAnimations(this);

        // Создаем Enemy
        spawnRandomEnemy(this, enemy)

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

    update(time, delta) {
        super.update(time, delta);

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
    }
}