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

export function playWalkAnimation(player, directionX, directionY) {
    if (directionX !== 0) {
        if (directionX > 0) {
            player.anims.play('walk-right', true);
            player.flipX = false;
        } else {
            player.anims.play('walk-left', true);
            player.flipX = true;
        }
    } else if (directionY !== 0) {
        if (directionY > 0) {
            player.anims.play('walk-down', true);
        } else {
            player.anims.play('walk-up', true);
        }
    } else {
        player.anims.stop();
    }
}
