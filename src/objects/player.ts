import {equipItems} from "../data/items";

interface PlayerStats {
    health: number;
    damage: number;
    attackSpeed: number;
    movementSpeed: number;
    strength: number;
    luck: number;
}

interface playerEquipped {
    sword: string;
    armor: string;
    pants: string;
    helmet: string;
    shield: string;
}

export class Player extends Phaser.GameObjects.Sprite {
    private readonly stats: PlayerStats;
    readonly equipped: playerEquipped;
    private readonly inventory: string[];

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'player');

        // Характеристики игрока
        this.stats = {
            health: 100,
            damage: 10,
            attackSpeed: 1,
            movementSpeed: 150,
            strength: 5,
            luck: 0.1,
        }


        // Инвентарь игрока
        this.inventory = [];

        scene.add.existing(this);
    }

    // Метод для получения харатеристик
    getStats(): PlayerStats {
        return this.stats;
    }

    // Метод для добавления предмета в инвентарь
    addItemToInventory(item: string): void {
        this.inventory.push(item);
    }

    // Метод для удаления предмета из инвентаря по индексу
    removeItemToInventory(index: number): void {
        if (index >= 0 && index < this.inventory.length) {
            this.inventory.splice(index, 1);
        }
    }

    // Метод для получения инвентаря
    getInventory(): string[] {
        return this.inventory;
    }

    // Метод для одевания предмета по индексу из инветаря
    equipItem(index: number): void {
        if (index >= 0 && index < this.inventory.length) {

            // Удалить предмет из инвентаря по индексу
            this.removeItemToInventory(index);
        }
    }

    // Метод для снятия предмета и помещения его обратно в инвентарь
    unequipItem(item: string): void {
        // Добавить предмет обратно в инвентарь
        this.addItemToInventory(item);
    }
}