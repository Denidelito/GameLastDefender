import staff from "../object/items";
export default class InventoryScene extends Phaser.Scene {
    constructor() {
        super('InventoryScene');
        this.inventorySlots = [];
        this.inventoryItems = [];
    }

    create() {
        this.playerInventory = this.scene.get('WorldScene').GameData.playerData.inventory;

        // Созаем камеру
        this.cameras.main.setSize(820, 281);
        this.cameras.main.setPosition(1060, 764);
        // Центрируем камеру по размеру
        this.cameras.main.centerOn(820 / 2, 281 / 2);

        // Создание сетки предметов
        const gridSize = { rows: 2, cols: 5 };
        const itemSize = { width: 120, height: 120 };
        const gridOffset = { x: 100, y: 80 };
        const spacing = 10;


        for (let row = 0; row < gridSize.rows; row++) {
            for (let col = 0; col < gridSize.cols; col++) {
                const x = gridOffset.x + col * (itemSize.width + spacing);
                const y = gridOffset.y + row * (itemSize.height + spacing);

                // Создание "слотов" для предметов (может быть спрайт, текст и т.д.)
                const slot = this.add.rectangle(x, y, itemSize.width, itemSize.height, 0xffffff);
                slot.setStrokeStyle(2, 0xaaaaaa);
                slot.setInteractive(); // Сделать слоты интерактивными
                this.inventorySlots.push(slot);

                // Проверяем, является ли это событие событием правой кнопки мыши
                const itemIndex = row * gridSize.cols + col;

                // Добавляем обработчики событий для отображения описания при наведении
                slot.on('pointerover', () => {
                    console.log(itemIndex)
                    if (this.inventoryItems[row * gridSize.cols + col]) {
                        // Показываем описание предмета в каком-то текстовом поле или окне
                        console.log(`Description: ${staff[this.playerInventory[itemIndex]].description}`);
                    }
                });
                slot.on('pointerdown', (event, localX, localY) => {
                    if (this.itemContextMenu) {
                        this.itemContextMenu.destroy();
                    }
                    if (this.playerInventory[itemIndex] !== undefined && this.playerInventory[itemIndex] !== null) {
                        this.showInventoryItemContextMenu(
                            this, event.x - this.cameras.main.x,
                            event.y - this.cameras.main.y,
                            itemIndex);
                    }
                });
                slot.on('pointerout', () => {
                    // Скрываем описание при уходе курсора с ячейки
                    // console.log('Description hidden');
                });

            }
        }

        this.scene.get('WorldScene').GameData.playerData.inventory.forEach((item) => {
            this.addToInventory(item);
        })
    }

    showInventoryItemContextMenu(scene, x, y, itemIndex) {
        const container = scene.add.container(x, y);
        scene.itemContextMenu = container;

        const background = scene.add.graphics();
        background.fillStyle(0x854C30, 1);
        background.fillRect(-50, -30, 200, 90);
        container.add(background);

        const button1 = scene.add.text(-40, -20, 'Использовать', {
            fontFamily: 'alundratext',
            fontSize: '24px',
            lineSpacing: '10',
            color: '#D9D9D9', });
        button1.setInteractive({ useHandCursor: true });
        button1.on('pointerdown', () => {

            scene.playerInventory[itemIndex] = scene.itemUse(scene, scene.playerInventory[itemIndex], scene.inventorySlots[itemIndex]);

            container.destroy();
        });
        container.add(button1);

        const button2 = scene.add.text(-40, 20, 'Продать', {
            fontFamily: 'alundratext',
            fontSize: '24px',
            lineSpacing: '10',
            color: '#D9D9D9', });
        button2.setInteractive({ useHandCursor: true });
        button2.on('pointerdown', () => {
            // Действие при нажатии на кнопку 2
            container.destroy();
        });
        container.add(button2);
    }

    itemUse(scene, item, slot) {

        if (item !== null) {

            scene.scene.get('WorldScene').updatePlayer(item);

            // Убираем спрайт предмета из слота
            if (slot.itemSprite) {
                slot.itemSprite.destroy();
                slot.itemSprite = null;
            }
            item = null
        }

        return item
    }

    addToInventory(itemName) {

        // Проверяем, есть ли свободные слоты в инвентаре
        const emptySlotIndex = this.playerInventory.findIndex(item => !item);
        const dropStaff = staff[itemName];


        const hasNullValue = this.playerInventory.some(item => item === null);

        if (this.inventorySlots.length !== this.playerInventory.length || hasNullValue) {
            if (emptySlotIndex !== -1) {
                // Добавляем предмет в свободный слот
                this.playerInventory[emptySlotIndex] = itemName;

                // Обновляем отображение слота
                const slot = this.inventorySlots[emptySlotIndex];
                const itemSprite = this.add.sprite(slot.x, slot.y, dropStaff.sprite);
                itemSprite.setDisplaySize(120, 120);
                this.inventorySlots[emptySlotIndex].itemSprite = itemSprite;
            } else {

                // Находим последний доступный слот и добавляем предмет в него
                const lastSlotIndex = this.playerInventory.length;
                this.playerInventory.push(itemName);

                // Обновляем отображение последнего слота
                const slot = this.inventorySlots[lastSlotIndex];
                const itemSprite = this.add.sprite(slot.x, slot.y, dropStaff.sprite);
                itemSprite.setDisplaySize(120, 120);
                this.inventorySlots[lastSlotIndex].itemSprite = itemSprite;
            }
        } else {
            this.scene.get('InfoScene').updateDialogModal('Ты зажрался!')
        }
    }
}
