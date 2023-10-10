import {animationCreate} from "../utils/animationCreate";

export class Player extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, hadTexture: string) {
        super(scene, x, y, texture);

        // Добавляем созданный персонаж в сцену
        scene.add.existing(this);

        this.had = scene.add.sprite(x, y, hadTexture);

        // Доавбляем анимации игроку
        animationCreate(scene, texture)
        animationCreate(scene, hadTexture)
    }

    private move(x: number, y: number)  {
        this.x += x;
        this.y += y;

        this.updateClothingPosition();
    }

    // Метод для обновления позиции элемента одежды
    private updateClothingPosition() {
        this.had.setPosition(this.x, this.y); // Установим позицию элемента одежды в соответствии с игроком
    }
}
