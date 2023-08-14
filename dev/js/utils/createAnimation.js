export function createAnimations(scene) {
    if (scene.anims.get('idle')) {
        return; // Возвращаемся, если анимация уже зсоздана
    }

    scene.anims.create({
        key: 'idle',
        frames: scene.anims.generateFrameNumbers('playerIdle', { start: 0, end: 5 }),
        frameRate: 8,
        repeat: -1,
    });
    scene.anims.create({
        key: 'walk-left',
        frames: scene.anims.generateFrameNumbers('playerWalkLeft', { start: 0, end: 5 }),
        frameRate: 8,
        repeat: -1,
    });

    scene.anims.create({
        key: 'walk-right',
        frames: scene.anims.generateFrameNumbers('playerWalkRight', { start: 0, end: 5 }),
        frameRate: 8,
        repeat: -1,
    });

    scene.anims.create({
        key: 'walk-up',
        frames: scene.anims.generateFrameNumbers('playerWalkUp', { start: 0, end: 5 }),
        frameRate: 8,
        repeat: -1,
    });

    scene.anims.create({
        key: 'walk-down',
        frames: scene.anims.generateFrameNumbers('playerWalkDown', { start: 0, end: 5 }),
        frameRate: 8,
        repeat: -1,
    });
    scene.anims.create({
        key: 'attack',
        frames: scene.anims.generateFrameNumbers('playerAttack', { start: 0, end: 3 }),
        frameRate: 8,
        repeat: -1,
    });
    scene.anims.create({
        key: 'enemy1-idle',
        frames: scene.anims.generateFrameNumbers('enemy1Idle', { start: 0, end: 3 }),
        frameRate: 8,
        repeat: -1,
    });
    scene.anims.create({
        key: 'enemy1-die',
        frames: scene.anims.generateFrameNumbers('enemy1die', { start: 0, end: 5 }),
        frameRate: 8,
        repeat: 0,
    });
    scene.anims.create({
        key: 'enemy1-attack',
        frames: scene.anims.generateFrameNumbers('enemy1Attack', { start: 0, end: 6 }),
        frameRate: 8,
        repeat: -1,
    });
}