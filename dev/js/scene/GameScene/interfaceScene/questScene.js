import {playerMovement} from "../../../utils/playerMovement.js";

export default class QuestScene extends Phaser.Scene{
    constructor() {
        super(QuestScene);
    }

    create() {
        this.cameras.main.setSize(494, 264);
        this.cameras.main.setPosition(634, 759);
        // Центрируем камеру по размеру
        this.cameras.main.centerOn(494 / 2, 264 / 2); // Заменил 265 на 264

        this.containerQuest = this.add.container(113, 50);
        this.containerQuest.setSize(494, 264);
        this.containerQuest.setDepth(3);

        const zone = this.add.zone(0, 0, 494, 264).setOrigin(0).setInteractive();

        // Обработка скроллинга колесиком мыши
        zone.on('wheel', (pointer, deltaX, deltaY, deltaZ) => {
            // Изменяем позицию контейнера в соответствии с направлением прокрутки
            this.containerQuest.y -= deltaY;
            // Ограничение перемещения контейнера по вертикали, чтобы не выходил за пределы
            this.containerQuest.y = Phaser.Math.Clamp(this.containerQuest.y, -200, 50);
        });


        // this.updateQuest(buttonData);
    }

    updateQuest(scene, questData) {
        this.containerQuest.removeAll(true);

        let xOffset = 10;
        let yOffset = 10;
        const buttonWidth = (494 - 20) / 2;
        const buttonHeight = 88;

        questData.forEach((quest, key) => {
            const buttonContainer = this.add.container(xOffset, yOffset);

            const buttonBackground = this.add.image(0, 0, 'ui-quest-table');
            buttonBackground.setDisplaySize(buttonWidth, buttonHeight);

            const sprite = this.add.sprite(-80, 0, quest.info.avatar);
            sprite.setDisplaySize(64, 64);

            const buttonText = this.add.text(-30, -30, quest.info.name, {
                fontFamily: 'Arial',
                fontSize: '16px',
                color: '#ffffff'
            });

            buttonContainer.add([buttonBackground, sprite, buttonText]);

            this.containerQuest.add(buttonContainer);

            buttonBackground.setInteractive();

            buttonBackground.on('pointerdown', () => {
                if (this.scene.get('WorldScene').GameData.playerTarget !== key) {
                    this.scene.get('WorldScene').GameData.playerTarget = key;
                    this.scene.get('WorldScene').GameData.combat.active = false;

                    playerMovement(scene, scene.player, questData[key]);
                }
            });

            xOffset += buttonWidth + 10;

            if (xOffset + buttonWidth > 494) { // Заменил containerWidth на 494
                xOffset = 10;
                yOffset += buttonHeight + 10;
            }
        });
    }
}