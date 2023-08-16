import {handleCombat} from "../helpers/combat";

export function PlayerMovement(scene, player, enemy) {

    const playerTileX = scene.map.worldToTileX(player.x);
    const playerTileY = scene.map.worldToTileY(player.y);

    const enemyTileX = scene.map.worldToTileX(enemy.info.x);
    const enemyTileY = scene.map.worldToTileY(enemy.info.y);
    scene.easystar.findPath(playerTileX, playerTileY, enemyTileX, enemyTileY, (path) => {
        if (path !== null) {
            // Передвигайте игрока по пути
            let currentPathIndex = 0;

            const movementEvent = scene.time.addEvent({
                delay: 200,
                loop: true,
                callback: (event) => {
                    if (currentPathIndex < path.length && enemy === scene.GameData.spawnEnemy.livingEnemies[scene.GameData.playerTarget]) {
                        const nextTile = path[currentPathIndex];
                        const nextWorldX = scene.map.tileToWorldX(nextTile.x);
                        const nextWorldY = scene.map.tileToWorldY(nextTile.y);

                        const deltaX = nextTile.x - scene.map.worldToTileX(player.x);
                        const deltaY = nextTile.y - scene.map.worldToTileY(player.y);

                        if (deltaX > 0) {
                            player.anims.play('walk-right', true);
                        } else if (deltaX < 0) {
                            player.anims.play('walk-left', true);
                        } else if (deltaY > 0) {
                            player.anims.play('walk-down', true);
                        } else if (deltaY < 0) {
                            player.anims.play('walk-up', true);
                        }

                        scene.tweens.add({
                            targets: player,
                            x: nextWorldX,
                            y: nextWorldY,
                            duration: 200,
                            onComplete: () => {
                                currentPathIndex++;
                            }
                        });
                    } else if (currentPathIndex === path.length) {
                        scene.GameData.combat.active = true;

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
export function createPlayerAnimations(scene) {
    scene.anims.create({
        key: 'walk-left',
        frames: scene.anims.generateFrameNumbers('playerWalkLeft', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1,
    });

    scene.anims.create({
        key: 'walk-right',
        frames: scene.anims.generateFrameNumbers('playerWalkRight', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1,
    });

    scene.anims.create({
        key: 'walk-up',
        frames: scene.anims.generateFrameNumbers('playerWalkUp', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1,
    });

    scene.anims.create({
        key: 'walk-down',
        frames: scene.anims.generateFrameNumbers('playerWalkDown', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1,
    });
}