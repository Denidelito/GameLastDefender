export function destroyEnemy(scene) {
    const spawnEnemy = scene.scene.get('GameScene').data.get('spawnEnemy'),
        player = scene.scene.get('GameScene').data.get('player');

    spawnEnemy.livingEnemies[player.target].info.destroy()
    spawnEnemy.livingEnemies[player.target].name.destroy()
    spawnEnemy.livingEnemies[player.target].hpBar.destroy()
    spawnEnemy.livingEnemies[player.target].backgroundHealthBar.destroy()
    spawnEnemy.livingEnemies.splice(player.target, 1);
}