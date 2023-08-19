import {createTilemap} from "../../utils/createTilemap.js";
import {createAnimations} from "../../utils/createAnimation.js";
export default class WorldScene extends Phaser.Scene {
    constructor() {
        super('WorldScene');
    }

    create() {
        // Создайем tilemap
        createTilemap(this);

        // Создаем анимации
        createAnimations(this);

        // Получаем информацию об игроке
        const player = this.scene.get('GameScene').data.get('player');

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


    }
}