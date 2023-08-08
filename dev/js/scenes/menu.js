export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        const { width, height } = this.cameras.main;

        const startButton = this.add
            .text(width / 2, height / 2 - 50, 'Начать игру',  {
                fontFamily: 'CustomFont', // Используем имя, которое мы указали в ключе 'CustomFont'
                fontSize: '24px',
                fill: '#fff',
                backgroundColor: '#00f',
                padding: {
                    x: 10,
                    y: 5,
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
