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
            force: 1,
            agility: 1,
            luck: 1,
            damage: 10,
            protection: 0
        }
    },

}

export default staff
