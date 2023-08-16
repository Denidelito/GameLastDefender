const playerData = {
    x: 600,
    y: 600,
    width: 96,
    height: 96,
    name: 'Джотаро',
    speed: 1, // Скорость передвижения игрока
    health: 100, // Здоровье игрока
    damage: 15,
    characteristics: {
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
};

export default playerData;