const enemiesData = [
    {
        type: 'enemy1',
        name: 'Противник 1', // Имя противника
        description: 'Мерский слизень',
        avatar: 'slimeAvatar',
        health: 50,
        damage: 5,
        color: 0xff0000, // Синий цвет
        chaos: 5,
        possibleItems: ['hpPotion']
    },
    {
        type: 'enemy2',
        name: 'Противник 2', // Имя противника
        avatar: 'slimeAvatar',
        description: 'Мерский слизень',
        health: 80,
        damage: 8,
        color: 0x00ff00, // Синий цвет
        chaos: 10,
        possibleItems: ['hpPotion']
    },
    {
        type: 'enemy3',
        name: 'Противник 3', // Имя противника
        avatar: 'slimeAvatar',
        description: 'Мерский слизень',
        health: 100,
        damage: 12,
        color: 0x0000ff, // Синий цвет
        chaos: 15,
        possibleItems: ['hpPotion']
    }
    // Можете добавить больше типов противников с их характеристиками и цветами по аналогии
];

export default enemiesData;