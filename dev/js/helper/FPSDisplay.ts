export class FPSDisplay {
    private scene: Phaser.Scene;
    private fpsText: Phaser.GameObjects.Text;
    private isVisible: boolean = true; // Флаг для управления видимостью текста

    constructor(scene: Phaser.Scene) {
        this.scene = scene;

        // Создайте текстовый объект для отображения FPS
        this.fpsText = this.scene.add.text(16, 16, 'FPS: 0', {
            fontSize: '24px',
        });

        // Обновляйте текст FPS на каждом кадре
        this.scene.events.on('update', this.update, this);
    }

    // Метод для отображения текста
    show() {
        this.isVisible = true;
        this.fpsText.visible = true;
    }

    // Метод для скрытия текста
    hide() {
        this.isVisible = false;
        this.fpsText.visible = false;
    }

    // Метод для переключения видимости текста (отображение/скрытие)
    toggleVisibility() {
        this.isVisible = !this.isVisible;
        this.fpsText.visible = this.isVisible;
    }

    update() {
        // Обновляем текст FPS только если видимость текста установлена в true
        if (this.isVisible) {
            this.fpsText.setText('FPS: ' + Math.round(this.scene.game.loop.actualFps));
        }
    }
}
