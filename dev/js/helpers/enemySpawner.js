import {PlayerMovement} from "../utils/playerMovement";
import playerData from "../object/player";
export function spawnRandomEnemy(scene, enemiesData, gridMap) {
    if (scene.GameData.isEnemySpawned) {
        return; // Возвращаемся, если противник уже заспавнен
    }

    const layerDate  = scene.woodLayer.layer.data;


    const randomX = Phaser.Math.Between(0, scene.map.width - 1);
    const randomY = Phaser.Math.Between(0, scene.map.height - 1);

    const tile = layerDate[randomX][randomY];

    if (tile.index === -1) {
        scene.enemy = scene.add.sprite(0, 0, 'playerSprite').setOrigin();
        scene.enemy.setScale(
            96 / scene.enemy.width,
            96 / scene.enemy.height
        ).setOrigin(0, 0.5).setDepth(1);
        const randomIndex = Phaser.Math.Between(0, enemiesData.length - 1);
        const randomEnemy = enemiesData[randomIndex];

        const tileSize = 32; // Размер тайла в пикселях

        scene.enemy.name = randomEnemy.name;
        scene.enemy.possibleItems = randomEnemy.possibleItems;
        scene.enemy.x = tile.pixelX;
        scene.enemy.y = tile.pixelY;
        scene.enemy.health = randomEnemy.health;
        scene.enemy.damage = randomEnemy.damage;

        if (!scene.enemyNameText) {
            scene.enemyNameText = scene.add.text(0, 0, '', { fontFamily: 'CustomFont', fontSize: '14px', fill: '#ffffff' });
        }
        scene.enemyNameText.setOrigin(1, 2);
        scene.enemyNameText.setText(randomEnemy.name);
        scene.enemyNameText.setPosition(scene.enemy.x + scene.enemy.width / 2, scene.enemy.y);

        scene.GameData.isEnemySpawned = true;

        scene.enemy.anims.play('enemy1Idle', true);

        PlayerMovement(scene, scene.player, scene.enemy)
    }

}
