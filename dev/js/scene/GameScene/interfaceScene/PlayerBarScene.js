export default class PlayerBarScene extends Phaser.Scene {
    constructor(PlayerBarScene) {
        super();
    }

    create() {
        // Создаем камеру
        const camera = this.cameras.main;
        camera.setSize(360, 108);
        camera.setPosition(48, 48);
        // Центрируем камеру по размеру
        camera.centerOn(360 / 2, 108 / 2);


        this.add.image(0, 0, 'ui-player-bar').setOrigin(0, 0);

        const player = this.scene.get('GameScene').data.get('player');

        // Создаем полоску здоровья
        this.playerHelthBar = this.add.graphics();
        this.playerManaBar = this.add.graphics();

        // Создаем текстовый элемент
        this.textBarHealth = this.add.text(194, 12, '100/100',
            {
                fontFamily: 'alundratext',
                fontSize: '18px',
                lineSpacing: '10',
                color: '#FFFFFF',
                wordWrap: { width: 72 }
            }).setOrigin(0);

        // Рисуем полоску здоровья с начальной шириной
        this.drawHealthBar((246 / 100) * player.characteristics.health)
        this.drawManaBar(100)
    }
    // Функция для перерисовки полоски здоровья с новой шириной
    drawHealthBar(newWidth) {
        // Очищаем graphics
        this.playerHelthBar.clear();

        this.textBarHealth.setText(newWidth+'/100');

        // Рисуем полоску с новой шириной
        this.playerHelthBar.fillStyle(0xD04648, 1);
        this.playerHelthBar.fillRect(108, 10, (244 / 100) * newWidth, 20);
    }
    drawManaBar(newWidth) {
        // Очищаем graphics
        this.playerManaBar.clear();

        // Рисуем полоску с новой шириной
        this.playerManaBar.fillStyle(0x597DCE, 1);
        this.playerManaBar.fillRect(108, 44, (244 / 100) * newWidth, 20);
    }

    // Функция для обновления полоски здоровья
    updateHealth(health) {
        // Обновляем размер полоски здоровья
        this.drawHealthBar(health);
    }
}