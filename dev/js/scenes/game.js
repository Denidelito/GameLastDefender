import WorldScene from './world';
import InfoScene from './info';
export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        this.cameras.main.setViewport(0, 0, 1280, 720);

        this.add.image(0, 0, 'game_interface').setOrigin(0);

        this.scene.add('WorldScene', WorldScene, true);
        this.scene.add('InfoScene', InfoScene, true);

        // Создаем текстовый объект для отображения счета
        this.scoreText = this.add.text(1100, 125, 'Score: 0', { fontFamily: 'Arial', fontSize: '24px', fill: '#ffffff' });
    }

    updateScore(score) {
        // Обновляем текстовый объект с счетом
        this.scoreText.setText(`Score: ${score}`);
    }

}
