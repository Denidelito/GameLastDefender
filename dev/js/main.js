import Phaser from 'phaser';
import '../css/style.css'

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,   // Устанавливаем ширину игры равной ширине окна браузера
    height: window.innerHeight, // Устанавливаем высоту игры равной высоте окна браузера
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};

const game = new Phaser.Game(config);

function preload() {
    // Здесь можно загрузить ресурсы, например, изображения, аудио и т.д.
    // Пример загрузки изображения (замените 'example' на имя вашего файла):
    this.load.image('example', 'path/to/your/image.png');
}

function create() {
    // Создание игровых объектов и настройка игровой сцены
    // Пример создания спрайта (замените 'example' на имя вашего спрайта и установите координаты):
    this.player = this.add.sprite(400, 300, 'example');
}

function update() {
    // Обновление игровой логики, вызывается на каждом кадре
    // Здесь можно добавить логику для движения объектов, обработки столкновений и т.д.
}
