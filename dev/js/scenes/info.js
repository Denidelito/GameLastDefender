export default class InfoScene extends Phaser.Scene {
    constructor() {
        super('InfoScene');
    }

    create() {
        this.cameras.main.setSize(477, 200);
        this.cameras.main.setPosition(25, 500);
        this.cameras.main.centerOn(477 / 2, 200 / 2); // Центрируем камеру по размеру

        // Создаем текстовый объект для отображения здоровья игрока
        this.playerHealthText = this.add.text(16, 16, 'Player Health: 100', { fontFamily: 'Arial', fontSize: '20px', fill: '#ffffff' });

        // Создаем текстовый объект для отображения здоровья противника
        this.enemyHealthText = this.add.text(16, 48, 'Enemy Health: 100', { fontFamily: 'Arial', fontSize: '20px', fill: '#ffffff' });

        // Слушаем события updatePlayerHealth и updateEnemyHealth, чтобы обновлять информацию о здоровье
        this.events.on('updatePlayerHealth', this.updatePlayerHealth, this);
        this.events.on('updateEnemyHealth', this.updateEnemyHealth, this);
    }

    updatePlayerHealth(health) {
        // Обновляем текстовый объект с здоровьем игрока
        this.playerHealthText.setText(`Player Health: ${health}`);
    }

    updateEnemyHealth(health) {
        // Обновляем текстовый объект с здоровьем противника
        this.enemyHealthText.setText(`Enemy Health: ${health}`);
    }
}
