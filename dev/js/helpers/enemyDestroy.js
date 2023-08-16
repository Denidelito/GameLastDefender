export function destroyEnemy(playerTarget, livingEnemies) {
    livingEnemies[playerTarget].enemy.destroy()
    livingEnemies[playerTarget].name.destroy()
    livingEnemies[playerTarget].hpBar.destroy()
    livingEnemies[playerTarget].backgroundHealthBar.destroy()
    livingEnemies.splice(playerTarget, 1);
}