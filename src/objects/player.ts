import {equipItems} from "../data/items";

interface PlayerStats {
    health: number;
    damage: number;
    defense: number;
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
    private readonly equipped: playerEquipped;
    private readonly inventory: string[];

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'player');

        // Характеристики игрока
        this.stats = {
            health: 100,
            damage: 10,
            defense: 10,
            attackSpeed: 1,
            movementSpeed: 150,
            strength: 5,
            luck: 0.1,
        }

        this.equipped = {
            sword: 'empty',
            armor: 'empty',
            pants: 'empty',
            helmet: 'empty',
            shield: 'empty'
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

    //Поиск предмета в массиве equipItems
    findEquippedItemById(itemId: string) {
        return equipItems.find((item) => item.itemId === itemId)
    }

    // Метод для одевания предмета по индексу из инветаря
    equipItem(index: number): void {
        if (!(index >= 0 && index < this.inventory.length)) {
            return;
        }

        // @ts-ignore
        const {type: itemType, stats: itemStats}: string = this.findEquippedItemById(this.inventory[index]);
        // @ts-ignore
        const currentEquippedItem : string = this.equipped[itemType];
        // @ts-ignore
        this.equipped[itemType] = this.inventory[index];

        if (currentEquippedItem !== 'empty') {
            this.addItemToInventory(currentEquippedItem);
        }

        this.removeItemToInventory(index);

        // Обновлять статы у персонажа
        this.updateStats({stats: itemStats});
    }

    // Метод для снятия предмета и помещения его обратно в инвентарь
    unequipItem(equipSlot: string): void {
        // @ts-ignore
        let equipItemId: string = this.equipped[equipSlot];

        // @ts-ignore
        this.equipped[equipSlot] = 'empty';

        const {stats : itemStats} = this.findEquippedItemById(equipItemId);

        this.updateStats({stats: itemStats, removal: true})

        // Добавить предмет обратно в инвентарь
        this.addItemToInventory(equipItemId);
    }

    // Метод для получения предметов на персонаже
    getEquipItems(): playerEquipped {
        return this.equipped;
    }

    updateStats({ stats, removal = false }: { stats: object, removal?: boolean }) {
        for (let statsKey in stats) {
            if (!removal) {
                // @ts-ignore
                this.stats[statsKey] += stats[statsKey];
            } else {
                // @ts-ignore
                this.stats[statsKey] -= stats[statsKey];
            }
        }
    }
}