import staff from "../object/items";
export default class InventoryScene extends Phaser.Scene {
    constructor() {
        super('InventoryScene');
        this.inventorySlots = [];
    }

    create() {
        this.playerInventory = this.scene.get('WorldScene').GameData.playerData.inventory;

        // Созаем камеру
        this.cameras.main.setSize(638, 250);
        this.cameras.main.setPosition(1220, 772);
        // Центрируем камеру по размеру
        this.cameras.main.centerOn(638 / 2, 250 / 2);

        // Создание сетки предметов
        const gridSize = { rows: 2, cols: 5 };
        const itemSize = { width: 128, height: 128 };
        const gridOffset = { x: 55, y: 55 };
        const spacing = 0;


        for (let row = 0; row < gridSize.rows; row++) {
            for (let col = 0; col < gridSize.cols; col++) {
                const x = gridOffset.x + col * (itemSize.width + spacing);
                const y = gridOffset.y + row * (itemSize.height + spacing);

                // Создание "слотов" для предметов (может быть спрайт, текст и т.д.)
                const slot = this.add.rectangle(x, y, itemSize.width, itemSize.height);
                // slot.setStrokeStyle(2, 0xaaaaaa);
                slot.setInteractive(); // Сделать слоты интерактивными
                this.inventorySlots.push(slot);

                // Проверяем, является ли это событие событием правой кнопки мыши
                const itemIndex = row * gridSize.cols + col;

                // Добавляем обработчики событий для отображения описания при наведении
                slot.on('pointerover', (event) => {
                    if (this.playerInventory[row * gridSize.cols + col]) {
                        // Показываем описание предмета в каком-то текстовом поле или окне
                        console.log(this.itemContextMenu)
                        if (this.itemContextMenu === undefined || !this.itemContextMenu.active) {
                            this.showInventoryItemInfo(this, x, y, itemIndex);
                        }
                    }
                });
                slot.on('pointerdown', (event) => {
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
                    if (this.containerInfo) {
                        this.containerInfo.destroy();
                    }
                });

            }
        }

        // Проверяем есть ли что то в инвентаре
        if (this.playerInventory) {
            // Перебераем инвентарь и добовляем слоты
            this.playerInventory.forEach((itemName, index) => {
                // Обновляем отображение последнего слота
                const dropStaff = staff[itemName];

                this.addSpriteToInventory(this, index, dropStaff)
            })
        }
    }

    showInventoryItemInfo(scene, x, y, itemIndex) {
        if (scene.containerInfo) {
            scene.containerInfo.destroy();
        }

        const containerInfo = scene.add.container(x, y);
        scene.containerInfo = containerInfo;

        const text = scene.add.text(59, -63, staff[this.playerInventory[itemIndex]].description, {
            fontFamily: 'alundratext',
            fontSize: '24px',
            lineSpacing: '10',
            color: '#D9D9D9',
            wordWrap: { width: 300 },
            padding: {
                x: 15,
                y: 25,
            },
        });

        const background = scene.add.graphics();
        background.fillStyle(0x854C30, 1);
        background.fillRect(59, -63, 300, text.height);
        containerInfo.add(background);

        containerInfo.add(text)
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

    addSpriteToInventory(scene, slotIndex, spriteItem) {
        const slot = scene.inventorySlots[slotIndex];
        const itemSprite = scene.add.sprite(slot.x, slot.y, spriteItem.sprite);
        itemSprite.setDisplaySize(120, 120);
        scene.inventorySlots[slotIndex].itemSprite = itemSprite;
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

                // Обновляем отображение пустого слота
                this.addSpriteToInventory(this, emptySlotIndex, dropStaff);
            } else {
                // Находим последний доступный слот и добавляем предмет в него
                const lastSlotIndex = this.playerInventory.length;
                this.playerInventory.push(itemName);

                // Обновляем отображение последнего слота
                this.addSpriteToInventory(this, lastSlotIndex, dropStaff)
            }
        } else {
            this.scene.get('InfoScene').updateDialogModal('Ты зажрался!')
        }
    }
}
