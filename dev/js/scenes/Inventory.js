import staff from "../object/items";
export default class InventoryScene extends Phaser.Scene {
    constructor() {
        super('InventoryScene');
        this.inventorySlots = [];
        this.inventoryItems = [];
    }

    create() {
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

                // Добавляем обработчик события для удаления предмета при клике
                slot.on('pointerdown', () => {
                    const itemIndex = row * gridSize.cols + col;

                    this.scene.get('WorldScene').updatePlayer(this.inventoryItems[row * gridSize.cols + col].name);

                    if (this.inventoryItems[itemIndex]) {
                        // Убираем спрайт предмета из слота
                        if (this.inventorySlots[itemIndex].itemSprite) {
                            this.inventorySlots[itemIndex].itemSprite.destroy();
                            this.inventorySlots[itemIndex].itemSprite = null;

                        }
                        // Удаляем предмет из массива
                        this.inventoryItems[itemIndex] = null;
                    }
                });

                // Добавляем обработчики событий для отображения описания при наведении
                slot.on('pointerover', () => {
                    if (this.inventoryItems[row * gridSize.cols + col]) {
                        // Показываем описание предмета в каком-то текстовом поле или окне
                        console.log(`Description: ${this.inventoryItems[row * gridSize.cols + col].description}`);
                    }
                });

                slot.on('pointerout', () => {
                    // Скрываем описание при уходе курсора с ячейки
                    console.log('Description hidden');
                });

            }
        }
    }


    addToInventory(itemName) {
        // Проверяем, есть ли свободные слоты в инвентаре
        const emptySlotIndex = this.inventoryItems.findIndex(item => !item);
        const dropStaff = staff[itemName];

        const hasNullValue = this.inventoryItems.some(item => item === null);

        if (this.inventorySlots.length !== this.inventoryItems.length || hasNullValue) {
            if (emptySlotIndex !== -1) {
                // Добавляем предмет в свободный слот
                this.inventoryItems[emptySlotIndex] = { name: itemName, description: dropStaff.description};

                // Обновляем отображение слота
                const slot = this.inventorySlots[emptySlotIndex];
                const itemSprite = this.add.sprite(slot.x, slot.y, dropStaff.sprite);
                itemSprite.setDisplaySize(120, 120);
                this.inventorySlots[emptySlotIndex].itemSprite = itemSprite;
            } else {
                // Находим последний доступный слот и добавляем предмет в него
                const lastSlotIndex = this.inventoryItems.length;
                this.inventoryItems[lastSlotIndex] = { name: itemName, description: dropStaff.description };

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
