export default class MeinMenuScene extends Phaser.Scene {
    constructor() {
        super('MeinMenuScene');
    }

    create() {
        const { width, height } = this.cameras.main;
        this.soundClick = this.sound.add('sound-ui-click', { loop: false, volume: 0.2 });
        this.music = this.sound.add('music-main', { loop: true, volume: 0.2 });

        this.music.play();

        const title = this.add.text(0, 0, 'The Last Defender - Rise of the King',
            {
                fontFamily: 'alundratext',
                fontSize: '55px',
                lineSpacing: '10',
                color: '#312F31',
            }).setOrigin(0);

        // В функции create, после создания текстового элемента
        const centerX = this.cameras.main.centerX;

        // Размещаем текстовый элемент по центру сцены
        title.setPosition(centerX - title.width / 2, 300);

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

        this.add.text(width / 2, height / 2 - 50, 'Купить победу',  {
                fontFamily: 'alundratext',
                fontSize: '36px',
                fill: '#312F31',
                backgroundColor: '#C4C4C4',
                padding: {
                    x: 40,
                    y: 10,
                },
            })
            .setOrigin(0.5, -1.5)
            .setInteractive();

        startButton.on('pointerover', () => {
            startButton.setTint(0xcccccc);
        });

        startButton.on('pointerout', () => {
            startButton.clearTint();
        });
    }

    startGame() {
        this.soundClick.play();
        this.scene.start('GameScene');
    }
}