import {createTilemap} from "../../utils/createTilemap.js";

export default class WorldScene extends Phaser.Scene {
    constructor() {
        super('WorldScene');
    }

    create() {
        createTilemap(this);

        console.log(this.data)
    }
}