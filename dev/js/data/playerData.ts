const playerData = {
    target: null,
    spawnPosition: {
        x: 0,
        y: 0,
    },
    sprite: {
        name: 'playerDefault',
        sizeSprite: {
            width: 96,
            height: 96,
        },
    },
    name: 'Джотаро',
    characteristics: {
        health: 100,
        force: 1,
        agility: 1,
        luck: 1,
        damage: 10,
        protection: 0
    },
    inventory: ['hpPotion', 'stick'],
    equipment: {
        helmet: '',
        armor: '',
        weapon: '',
        shield: '',
        decoration1: '',
        decoration2: '',
    }
}
export default playerData;