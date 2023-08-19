export function playerMovement(scene, playerSprite, enemy) {


    const spawnEnemy = scene.scene.get('GameScene').data.get('spawnEnemy'),
        player = scene.scene.get('GameScene').data.get('player'),
        combat = scene.scene.get('GameScene').data.get('combat'),
        playerTileX = scene.map.worldToTileX(playerSprite.x),
        playerTileY = scene.map.worldToTileY(playerSprite.y),
        enemyTileX = scene.map.worldToTileX(enemy.info.x),
        enemyTileY = scene.map.worldToTileY(enemy.info.y);

    scene.easystar.findPath(playerTileX, playerTileY, enemyTileX, enemyTileY, (path) => {
        if (path !== null) {
            // Передвигайте игрока по пути
            let currentPathIndex = 0;

            const movementEvent = scene.time.addEvent({
                delay: 200,
                loop: true,
                callback: (event) => {
                    if (currentPathIndex < path.length && enemy === spawnEnemy.livingEnemies[player.target]) {
                        const nextTile = path[currentPathIndex];
                        const nextWorldX = scene.map.tileToWorldX(nextTile.x);
                        const nextWorldY = scene.map.tileToWorldY(nextTile.y);

                        const deltaX = nextTile.x - scene.map.worldToTileX(playerSprite.x);
                        const deltaY = nextTile.y - scene.map.worldToTileY(playerSprite.y);

                        if (deltaX > 0) {
                            playerSprite.anims.play('walk-right', true);
                        } else if (deltaX < 0) {
                            playerSprite.anims.play('walk-left', true);
                        } else if (deltaY > 0) {
                            playerSprite.anims.play('walk-down', true);
                        } else if (deltaY < 0) {
                            playerSprite.anims.play('walk-up', true);
                        }

                        scene.tweens.add({
                            targets: playerSprite,
                            x: nextWorldX,
                            y: nextWorldY,
                            duration: 200,
                            onComplete: () => {
                                currentPathIndex++;
                            }
                        });
                    } else if (currentPathIndex === path.length) {
                        combat.active = true;

                        movementEvent.remove();
                    } else {
                        movementEvent.remove();
                    }
                }
            });
        }
    });

    scene.easystar.calculate();
}