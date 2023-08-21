export default class ChaosBarScene extends Phaser.Scene {
    constructor() {
        super('ChaosBarScene');
    }

    create() {
        // Создаем камеру
        const camera = this.cameras.main;
        camera.setSize(76, 324);
        camera.setPosition(524, 718);
        // Центрируем камеру по размеру
        camera.centerOn(76 / 2, 324 / 2);


        // Создаем полоску хаоса
        this.playerHelthBar = this.add.graphics();

        // Рисуем полоску здоровья с начальной шириной
        this.drawChaosBar((322 / 100) * 80);

        // Создаем текстовый элемент
        this.textBarHealth = this.add.text(24, 225, 'Шкала хаоса',
            {
                fontFamily: 'alundratext',
                fontSize: '24px',
                lineSpacing: '10',
                color: '#C4C4C4',
                wordWrap: { width: 162 }
            }).setOrigin(0).setAngle(-90);

    }
    // Функция для перерисовки полоски здоровья с новой шириной
    drawChaosBar(newHeight) {
        // Очищаем graphics
        this.playerHelthBar.clear();

        // Рисуем полоску с новой шириной
        this.playerHelthBar.fillStyle(0xDA3B3B, 1);
        this.playerHelthBar.fillRect(4, 322 - newHeight, 68, newHeight);
    }

    // Функция для обновления полоски здоровья
    updateChaos(health) {
        // Обновляем размер полоски здоровья
        this.drawHealthBar(health);
    }
}