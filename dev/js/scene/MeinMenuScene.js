export default class MeinMenuScene extends Phaser.Scene {
    constructor() {
        super('MeinMenuScene');
    }

    create() {
        const { width, height } = this.cameras.main;

        const startButton = this.add
            .text(width / 2, height / 2 - 50, 'Начать игру',  {
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
        this.scene.start('GameScene');
    }
}