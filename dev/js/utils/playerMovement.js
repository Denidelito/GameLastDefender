// dev/js/helpers/playerMovement.js
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
