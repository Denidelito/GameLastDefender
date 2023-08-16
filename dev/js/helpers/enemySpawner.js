export function spawnRandomEnemy(scene, enemiesData) {
    const layerDate  = scene.mapLayers.wood.layer.data;

    const randomX = Phaser.Math.Between(0, scene.map.width - 1);
    const randomY = Phaser.Math.Between(0, scene.map.height - 1);

    const tile = layerDate[randomX][randomY];

    if (tile.index === -1) {
        let enemy = scene.add.sprite(0, 0, 'playerSprite').setOrigin();
        enemy.setScale(
            96 / enemy.width,
            96 / enemy.height
        ).setOrigin(0, 0.5).setDepth(1);
        const randomIndex = Phaser.Math.Between(0, enemiesData.length - 1);
        const randomEnemy = enemiesData[randomIndex];

        enemy.name = randomEnemy.name;
        enemy.possibleItems = randomEnemy.possibleItems;
        enemy.x = tile.pixelX;
        enemy.y = tile.pixelY;
        enemy.health = randomEnemy.health;
        enemy.damage = randomEnemy.damage;


        let enemyNameText = scene.add.text(0, 0, '', { fontFamily: 'CustomFont', fontSize: '14px', fill: '#ffffff' });

        enemyNameText.setOrigin(1, 2);
        enemyNameText.setText(randomEnemy.name);
        enemyNameText.setPosition(enemy.x + enemy.width / 2, enemy.y - 30);

        enemy.anims.play('enemy1-idle', true);

        // Создаем полоску здоровья
        let  enemyHealthBar = scene.add.graphics();
        enemyHealthBar.setDepth(4);
        enemyHealthBar.fillStyle(0xFF0000, 1); // Красный цвет
        enemyHealthBar.fillRect(enemy.x, enemy.y - 30, 64, 8); // Начальные параметры

        // Создаем белую подложку
        let backgroundEnemyHealthBar = scene.add.graphics();
        backgroundEnemyHealthBar.setDepth(3);
        backgroundEnemyHealthBar.fillStyle(0xFFFFFF, 1); // Красный цвет
        backgroundEnemyHealthBar.fillRect(enemy.x, enemy.y - 30, 64, 8); // Начальные параметры

        scene.GameData.spawnEnemy.livingEnemies.push(
            {
                info: enemy,
                name: enemyNameText,
                hpBar: enemyHealthBar,
                backgroundHealthBar: backgroundEnemyHealthBar
            }
        )

        // PlayerMovement(scene, scene.player, enemy)
    }

}
