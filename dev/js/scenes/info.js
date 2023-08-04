export default class InfoScene extends Phaser.Scene {
    constructor() {
        super('InfoScene');
    }

    create() {
        this.cameras.main.setSize(710, 294);
        this.cameras.main.setPosition(28, 753);
        this.cameras.main.centerOn(710 / 2, 294 / 2); // Центрируем камеру по размеру

        // Слушаем события updatePlayerHealth и updateEnemyHealth, чтобы обновлять информацию о здоровье
        this.events.on('updatePlayerHealth', this.updatePlayerHealth, this);
        this.events.on('updateEnemyHealth', this.updateEnemyHealth, this);

        // Создаем фон для текстового элемента
        // Создаем затемненный фон для информационной сцены
        const graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 0.7);
        graphics.fillRect(0, 0, 710, 294);

        // Создаем текстовый элемент
        this.text = this.add.text(0, 0, '', { fontFamily: 'Arial', color: '#00ff00', wordWrap: { width: 310 } }).setOrigin(0);

        // Создаем маску для текстового элемента
        const mask = new Phaser.Display.Masks.GeometryMask(this, graphics);

        // Применяем маску к текстовому элементу
        this.text.setMask(mask);

        // Создаем интерактивную зону, которую можно "перетаскивать" внутри
        const zone = this.add.zone(0, 0, 710, 294).setOrigin(0).setInteractive();

        // Обрабатываем событие колесика мыши на зоне для скроллинга текста
        zone.on('wheel', (pointer, deltaX, deltaY, deltaZ) => {
            this.text.y -= deltaY * 2; // Изменяем позицию текста в соответствии с направлением прокрутки
            this.text.y = Phaser.Math.Clamp(this.text.y, -400, 0); // Ограничиваем позицию текста, чтобы не выходил за границы маски
        });

        this.log = [];

    }

    updateDialogModal(text) {
        this.log.push(text);
        this.text.setText(this.log.slice().reverse());
    }

    updatePlayerHealth(health) {
        // Обновляем текстовый объект с здоровьем игрока
        this.log.push(`Player Health: ${health}`)
        this.text.setText(this.log.slice().reverse());
    }

    updateEnemyHealth(health) {
        // Обновляем текстовый объект с здоровьем противника
        this.log.push(`Enemy Health: ${health}`)
        this.text.setText(this.log.slice().reverse());
    }
}
