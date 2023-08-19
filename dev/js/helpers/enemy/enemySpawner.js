export function spawnRandomEnemy(scene, enemiesData) {
    const layerDate  = scene.mapLayers.ForestCastle.layer.data;

    const randomX = Phaser.Math.Between(0, scene.map.width - 1);
    const randomY = Phaser.Math.Between(0, scene.map.height - 1);

    const tile = layerDate[randomX][randomY];

    if (tile.index !== -1) {
        return;
    }

    let enemy = scene.add.sprite(0, 0, 'playerSprite');

    enemy.setScale(96 / enemy.width, 96 / enemy.height)
        .setOrigin(0.2, 0.3)
        .setDepth(1);

    const randomIndex = 0 /*Phaser.Math.Between(0, enemiesData.length - 1)*/,
        randomEnemy = enemiesData[randomIndex];

    enemy.name = randomEnemy.name;
    enemy.possibleItems = randomEnemy.possibleItems;
    enemy.avatar = randomEnemy.avatar;
    enemy.x = tile.pixelX;
    enemy.y = tile.pixelY;
    enemy.health = randomEnemy.health;
    enemy.damage = randomEnemy.damage;

    const enemyNameText = scene.add.text(0, 0, '',
        {
            fontFamily: 'alundratext',
            fontSize: '18px',
            fill: '#ffffff'
        }
    ).setOrigin(0.5);
    console.log((enemyNameText.width - enemy.width) / 2);
    enemyNameText.setText(randomEnemy.name);
    enemyNameText.setPosition(enemy.x+32, enemy.y - 30);
    enemy.anims.play('enemy1-idle', true);

    const enemyHealthBar = scene.add.graphics();
    enemyHealthBar.setDepth(4);
    enemyHealthBar.fillStyle(0xFF0000, 1);
    enemyHealthBar.fillRect(enemy.x , enemy.y - 10, 64, 8);

    const backgroundEnemyHealthBar = scene.add.graphics();
    backgroundEnemyHealthBar.setDepth(3);
    backgroundEnemyHealthBar.fillStyle(0xFFFFFF, 1);
    backgroundEnemyHealthBar.fillRect(enemy.x, enemy.y - 10, 64, 8);

    scene.scene.get('GameScene').data.get('spawnEnemy').livingEnemies.push(
        {
            info: enemy,
            name: enemyNameText,
            hpBar: enemyHealthBar,
            backgroundHealthBar: backgroundEnemyHealthBar
        }
    )

}
