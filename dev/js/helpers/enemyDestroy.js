export function destroyEnemy(scene) {
    let pTarget = scene.GameData.playerTarget;
    let lEnemies = scene.GameData.spawnEnemy.livingEnemies;

    lEnemies[pTarget].info.destroy()
    lEnemies[pTarget].name.destroy()
    lEnemies[pTarget].hpBar.destroy()
    lEnemies[pTarget].backgroundHealthBar.destroy()
    lEnemies.splice(pTarget, 1);
}