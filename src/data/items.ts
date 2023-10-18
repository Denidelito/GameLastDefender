// Объект с типами предметов и их характеристиками
export const equipItems =[
    {
        itemId: 'sword_1',
        type: 'sword',
        name: 'Деревянный меч',
        stats: {
            damage: 10,
        },
        texture: 'player-had',
        animation: 'sharpSwordAnimation',
    },
    {
        itemId: 'sword_2',
        type: 'sword',
        name: 'Меч-клинок',
        stats: {
            damage: 15,
        },
        texture: 'player-had',
        animation: 'bladeSwordAnimation',
    },
    {
        itemId: 'armor_1',
        type: 'armor',
        name: 'Легкая броня',
        stats: {
            defense: 1,
            damage: 1,
        },
        texture: 'lightArmorTexture',
        animation: 'lightArmorAnimation',
    },
    {
        itemId: 'armor_2',
        type: 'armor',
        name: 'Тяжелая броня',
        stats: {
            defense: 30,
            damage: 15,
        },
        texture: 'heavyArmorTexture',
        animation: 'heavyArmorAnimation',
    },
    {
        itemId: 'pants_1',
        type: 'pants',
        name: 'Штаны',
        stats: {
            defense: 20,
        },
        texture: 'lightArmorTexture',
        animation: 'lightArmorAnimation',
    },
    {
        itemId: 'helmet_1',
        type: 'helmet',
        name: 'Шапка',
        stats: {
            defense: 40,
        },
        texture: 'lightArmorTexture',
        animation: 'lightArmorAnimation',
    },
    {
        itemId: 'shield_1',
        type: 'shield',
        name: 'Щит',
        stats: {
            defense: 20,
        },
        texture: 'lightArmorTexture',
        animation: 'lightArmorAnimation',
    },
]
