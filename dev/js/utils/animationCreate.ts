export function animationCreate(scene: object, textureName: string) {
    scene.anims.create({
        key: 'idle',
        frames: scene.anims.generateFrameNumbers(textureName, { start: 0, end: 4 }),
        frameRate: 6,
        repeat: -1,
    });
    scene.anims.create({
        key: 'move_down',
        frames: scene.anims.generateFrameNumbers(textureName, { start: 5, end: 8 }),
        frameRate: 6,
        repeat: -1,
    });
    scene.anims.create({
        key: 'move_left',
        frames: scene.anims.generateFrameNumbers(textureName, { start: 9, end: 12 }),
        frameRate: 6,
        repeat: -1,
    });
    scene.anims.create({
        key: 'move_right',
        frames: scene.anims.generateFrameNumbers(textureName, { start: 13, end: 16 }),
        frameRate: 6,
        repeat: -1,
    });
    scene.anims.create({
        key: 'attack',
        frames: scene.anims.generateFrameNumbers(textureName, { start: 17, end: 20 }),
        frameRate: 6,
        repeat: -1,
    });
    scene.anims.create({
        key: 'defence',
        frames: scene.anims.generateFrameNumbers(textureName, { start: 21, end: 25 }),
        frameRate: 3,
        repeat: -1,
    });
}