export default class InformationScene extends Phaser.Scene {
    constructor() {
        super('InformationScene');
    }

    create() {
        // Создаем камеру
        const camera = this.cameras.main;
        camera.setSize(462, 284);
        camera.setPosition(25, 774);
        // Центрируем камеру по размеру
        camera.centerOn(462 / 2, 284 / 2);

        // Создаем затемненный фон для информационной сцены
        const graphics = this.add.graphics();
        graphics.fillStyle(0xC4C4C4, 0);
        graphics.fillRect(0, 0, 462, 284);

        // Создаем текстовый элемент
        this.text = this.add.text(0, 0, '',
            {
                fontFamily: 'alundratext',
                fontSize: '24px',
                lineSpacing: '10',
                color: '#ACACAC',
                wordWrap: { width: 462 }
            }).setOrigin(0);

        // Создаем маску для текстового элемента
        const mask = new Phaser.Display.Masks.GeometryMask(this, graphics);

        // Применяем маску к текстовому элементу
        this.text.setMask(mask);

        // Создаем интерактивную зону, которую можно "перетаскивать" внутри
        const zone = this.add.zone(0, 0, 462, 294).setOrigin(0).setInteractive();

        // Обрабатываем событие колесика мыши на зоне для скроллинга текста
        zone.on('wheel', (pointer, deltaX, deltaY, deltaZ) => {

            // Изменяем позицию текста в соответствии с направлением прокрутки
            this.text.y -= deltaY * 2;

            // Ограничиваем позицию текста, чтобы не выходил за границы маски
            this.text.y = Phaser.Math.Clamp(this.text.y, -400, 0);
        });

        this.log = [];
    }

    // Функция для обновления текста в диалоговом окне
    updateDialogModal(text) {
        this.log.push(text);
        this.text.setText(this.log.slice().reverse());
    }
}
