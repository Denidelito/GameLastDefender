import {PlayerMovement} from "../utils/playerMovement";
export function spawnRandomEnemy(scene, enemiesData, gridMap) {
    if (scene.GameData.isEnemySpawned) {
        return; // Возвращаемся, если противник уже заспавнен
    }

    const layerDate  = scene.woodLayer.layer.data;


    const randomX = Phaser.Math.Between(0, scene.map.width - 1);
    const randomY = Phaser.Math.Between(0, scene.map.height - 1);

    const tileX = scene.map.worldToTileX(randomX);
    const tileY = scene.map.worldToTileY(randomY);

    console.log(layerDate[randomX][randomY], randomX, randomY)
    const tile = layerDate[randomX][randomY];

    if (tile.index === -1) {
        scene.enemy = scene.add.rectangle(randomX, randomY, 32, 32).setOrigin(0);

        const randomIndex = Phaser.Math.Between(0, enemiesData.length - 1);
        const randomEnemy = enemiesData[randomIndex];

        const tileSize = 32; // Размер тайла в пикселях

        scene.enemy.name = randomEnemy.name;
        scene.enemy.possibleItems = randomEnemy.possibleItems;
        scene.enemy.x = tile.pixelX;
        scene.enemy.y = tile.pixelY;
        scene.enemy.health = randomEnemy.health;
        scene.enemy.damage = randomEnemy.damage;
        scene.enemy.setFillStyle(randomEnemy.color);

        if (!scene.enemyNameText) {
            scene.enemyNameText = scene.add.text(0, 0, '', { fontFamily: 'CustomFont', fontSize: '14px', fill: '#ffffff' });
        }
        scene.enemyNameText.setOrigin(0.5, 1);
        scene.enemyNameText.setText(randomEnemy.name);
        scene.enemyNameText.setPosition(scene.enemy.x + scene.enemy.width / 2, scene.enemy.y);

        scene.GameData.isEnemySpawned = true;

        PlayerMovement(scene, scene.player, scene.enemy)
    }

}
