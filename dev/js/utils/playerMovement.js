export function calculatePlayerMovement(player, enemy) {
    const distance = Phaser.Math.Distance.Between(player.x, player.y, enemy.x, enemy.y);
    let directionX, directionY;

    if (distance < 50) {
        directionX = 0;
        directionY = 0;
    } else {
        // Определяем направление движения плеера по горизонтали и вертикали
        if (player.x < enemy.x) {
            directionX = 1; // Движение вправо
        } else if (player.x > enemy.x) {
            directionX = -1; // Движение влево
        } else {
            directionX = 0; // Стоп по горизонтали
        }

        if (player.y < enemy.y) {
            directionY = 1; // Движение вниз
        } else if (player.y > enemy.y) {
            directionY = -1; // Движение вверх
        } else {
            directionY = 0; // Стоп по вертикали
        }
    }

    return { directionX, directionY };
}
export function createPlayerAnimations(scene) {
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
}

export function playWalkAnimation(player, directionX, directionY) {
    if (directionX < 0) {
        player.anims.play('walk-left', true);
    } else if (directionX > 0) {
        player.anims.play('walk-right', true);
    } else if (directionY < 0) {
        player.anims.play('walk-up', true);
    } else if (directionY > 0) {
        player.anims.play('walk-down', true);
    } else {
        player.anims.stop();
    }
}
