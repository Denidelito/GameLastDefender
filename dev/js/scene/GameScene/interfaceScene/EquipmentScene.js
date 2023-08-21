import items from "../../../object/items.js";
import staff from "../../../object/items.js";
export class EquipmentScene extends Phaser.Scene {
    constructor() {
        super(EquipmentScene);
    }

    create() {
        // Создаем камеру
        const camera = this.cameras.main;
        camera.setSize(465, 388);
        camera.setPosition(1433, 22);
        // Центрируем камеру по размеру
        camera.centerOn(465 / 2, 388 / 2);
    }

    removeEquipment(Equip) {

    }

    addEquipment(EquipName, x, y, width, height) {
        // Создание оружие
        this.weapon = this.add.sprite(
            x,
            y,
            items[EquipName].sprite)
            .setOrigin(0, 0)
            .setDisplaySize(width, height);

        this.weapon.setInteractive();
        this.updateStat(EquipName, 'equip');

        this.weapon.on('pointerdown', (event) => {
            const InventoryScene = this.scene.get('InventoryScene');
            InventoryScene.addToInventory(EquipName);
            this.updateStat(EquipName, 'unEquip');
            this.weapon.destroy();
        });
    }

    updateStat(EquipName, status) {
        let characteristics = this.scene.get('GameScene').data.get('player').characteristics;

        if (status === 'equip') {
            characteristics.damage += staff[EquipName].stats.damage;
        } else {
            characteristics.damage -= staff[EquipName].stats.damage;
        }
    }
}