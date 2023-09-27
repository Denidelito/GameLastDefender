import {FPSDisplay} from "../helper/FPSDisplay.ts";
export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }
    create() : void {
        new FPSDisplay(this);

    }

    update(time: number, delta: number) {
        super.update(time, delta);

    }
}