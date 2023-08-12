import {PlayerMovement} from "../utils/playerMovement";
import playerData from "../object/player";
export function spawnRandomEnemy(scene, enemiesData, gridMap) {
    if (scene.GameData.isEnemySpawned) {
        return; // Возвращаемся, если противник уже заспавнен
    }

    const layerDate  = scene.mapLayers.wood.layer.data;


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
        scene.enemyNameText.setPosition(scene.enemy.x + scene.enemy.width / 2, scene.enemy.y - 30);

        scene.GameData.isEnemySpawned = true;

        scene.enemy.anims.play('enemy1Idle', true);


        if (!scene.enemyHealthBar && !scene.backgroundEnemyHealthBar) {
            // Создаем полоску здоровья
            scene.enemyHealthBar = scene.add.graphics();
            scene.enemyHealthBar.setDepth(4);
            scene.enemyHealthBar.fillStyle(0xFF0000, 1); // Красный цвет
            scene.enemyHealthBar.fillRect(scene.enemy.x, scene.enemy.y - 30, 64, 8); // Начальные параметры

            // Создаем белую подложку
            scene.backgroundEnemyHealthBar = scene.add.graphics();
            scene.backgroundEnemyHealthBar.setDepth(3);
            scene.backgroundEnemyHealthBar.fillStyle(0xFFFFFF, 1); // Красный цвет
            scene.backgroundEnemyHealthBar.fillRect(scene.enemy.x, scene.enemy.y - 30, 64, 8); // Начальные параметры
        }

        // Обновляем полоску здоровья в соответствии с здоровьем врага
        if (scene.enemy && scene.enemyHealthBar) {
            // Предполагается, что у врагов одинаковое максимальное здоровье
            const healthPercent = scene.enemy.health / scene.GameData.enemiesData[0].health;
            // Максимальная ширина полоски здоровья (96 пикселей)
            const healthBarWidth = 64 * healthPercent;
            // Очищаем старое состояние полоски
            scene.enemyHealthBar.clear();
            // Красный цвет
            scene.enemyHealthBar.fillStyle(0xFF0000, 1);
            // Обновляем ширину полоски
            scene.enemyHealthBar.fillRect(scene.enemy.x, scene.enemy.y - 30, healthBarWidth, 8);
            // Очищаем старое состояние полоски
            scene.backgroundEnemyHealthBar.clear();
            // Обновляем ширину полоски
            scene.backgroundEnemyHealthBar.fillRect(scene.enemy.x, scene.enemy.y - 30, healthBarWidth, 8);
        }

        PlayerMovement(scene, scene.player, scene.enemy)
    }

}
