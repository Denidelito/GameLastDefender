const staff = {
    hpPotion: {
        type: 'potion',
        name: 'Зелье здоровья',
        description: 'Восстанавливает 25 ОЗ',
        sprite: 'potionHP',
        stats: {
            speed: 0,
            health: 25,
            damage: 0
        }
    },
    stick: {
        type: 'weapon',
        name: 'Палка истины',
        description: 'Палка которой уже пользовались, но непонятно как. +10 сомнительного урона.',
        sprite: 'stick',
        stats: {
            speed: 0,
            health: 0,
            damage: 10
        }
    },

}

export default staff
