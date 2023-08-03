export function handleCombat(player, enemy, lastDamageTime, score) {
    const currentTime = player.scene.time.now;
    const distance = Phaser.Math.Distance.Between(player.x, player.y, enemy.x, enemy.y);

    // Устанавливаем интервал нанесения урона в 1 секунду
    const damageInterval = 1000;

    if (currentTime - lastDamageTime >= damageInterval) {
        // Вычисляем расстояние между игроком и противником

        // Если расстояние меньше определенного значения, игрок и противник начинают наносить урон друг другу
        if (distance < 50) {
            player.scene.playerData.health -= enemy.damage;
            enemy.health -= player.scene.playerData.damage;

            // Обновление показателей здоровья в информации
            player.scene.scene.get('InfoScene').updatePlayerHealth(player.scene.playerData.health);
            player.scene.scene.get('InfoScene').updateEnemyHealth(enemy.health);

            // Проверяем состояние здоровья противника
            if (enemy.health <= 0) {
                // Если здоровье противника меньше или равно 0, удаляем противника и спавним нового
                enemy.destroy();
                player.scene.isEnemySpawned = false;

                // Прибавляем 10 очков к счету после убийства противника
                player.scene.score += 10;

                // Обновляем счет на сцене Game
                player.scene.scene.get('GameScene').updateScore(player.scene.score);
            }

            // Обновляем время последнего нанесения урона
            player.scene.lastDamageTime = currentTime;
        }
    }
}
