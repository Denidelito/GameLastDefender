export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    preload() {
        this.soundClick = this.sound.add('sound-ui-click', { loop: false, volume: 0.1 });

        const { width, height } = this.cameras.main;
        this.text = this.add.text(0, 0, 'Тебя поглотила пустыня',
            {
                fontFamily: 'alundratext',
                fontSize: '55px',
                lineSpacing: '10',
                color: '#312F31',
            }).setOrigin(0);

        // В функции create, после создания текстового элемента
        const centerX = this.cameras.main.centerX;

        // Размещаем текстовый элемент по центру сцены
        this.text.setPosition(centerX - this.text.width / 2, 300);

        const startButton = this.add.text(width / 2, height / 2 - 50, 'Вернуться в меню',
            {
                fontFamily: 'alundratext',
                fontSize: '36px',
                fill: '#312F31',
                backgroundColor: '#C4C4C4',
                padding: {
                    x: 40,
                    y: 10,
                },
            })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', this.startGame, this);

        startButton.on('pointerover', () => {
            startButton.setTint(0xcccccc);
        });

        startButton.on('pointerout', () => {
            startButton.clearTint();
        });
    }

    startGame() {
        this.soundClick.play();
        this.scene.start('MeinMenuScene');
    }
}