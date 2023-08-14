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

                // Добавляем обработчики событий для отображения описания при наведении
                slot.on('pointerover', () => {
                    if (this.inventoryItems[row * gridSize.cols + col]) {
                        // Показываем описание предмета в каком-то текстовом поле или окне
                        console.log(`Description: ${this.inventoryItems[row * gridSize.cols + col].description}`);
                    }
                });
                slot.on('pointerdown', (event, localX, localY) => {
                    // Проверяем, является ли это событие событием правой кнопки мыши
                    const itemIndex = row * gridSize.cols + col;
                    if (this.inventoryItems[itemIndex] !== undefined) {
                        if (this.itemContextMenu) {
                            this.itemContextMenu.destroy();
                        }

                        if (event.button === 2) {
                            console.log(`Right-clicked on item ${this.inventoryItems[itemIndex].name}`);

                            // Вызываем функцию для показа модального окна
                            this.showInventoryItemContextMenu(this, event.x - this.cameras.main.x, event.y - this.cameras.main.y);
                        } else {

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
                        }
                    }
                });
                slot.on('pointerout', () => {
                    // Скрываем описание при уходе курсора с ячейки
                    // console.log('Description hidden');
                });

            }
        }
    }

    showInventoryItemContextMenu(scene, x, y) {
        const container = scene.add.container(x, y);
        scene.itemContextMenu = container;

        const background = scene.add.graphics();
        background.fillStyle(0x000000, 0.7);
        background.fillRect(-50, -30, 100, 60);
        container.add(background);

        const button1 = scene.add.text(-40, -20, 'Действие 1', { fontSize: '16px', fill: '#ffffff' });
        button1.setInteractive({ useHandCursor: true });
        button1.on('pointerdown', () => {
            // Действие при нажатии на кнопку 1
            container.destroy();
        });
        container.add(button1);

        const button2 = scene.add.text(-40, 0, 'Действие 2', { fontSize: '16px', fill: '#ffffff' });
        button2.setInteractive({ useHandCursor: true });
        button2.on('pointerdown', () => {
            // Действие при нажатии на кнопку 2
            container.destroy();
        });
        container.add(button2);
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
