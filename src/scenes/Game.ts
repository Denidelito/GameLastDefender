import Phaser from 'phaser';
import {Player} from "../objects/player";
import {equipItems} from "../data/items";

export default class Demo extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.spritesheet('player', 'assets/sprites/player.png',{ frameWidth: 128, frameHeight: 128 });
  }

  create() {
    const player = new Player(this, 100, 100);

    player.addItemToInventory(equipItems[0].itemId);
    player.addItemToInventory(equipItems[1].itemId);
    player.addItemToInventory(equipItems[3].itemId);
  }
}
