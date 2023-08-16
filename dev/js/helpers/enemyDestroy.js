export function destroyEnemy(playerTarget, livingEnemies) {
    livingEnemies[playerTarget].enemySprite.destroy()
    livingEnemies[playerTarget].enemyName.destroy()
    livingEnemies.splice(playerTarget, 1);
}