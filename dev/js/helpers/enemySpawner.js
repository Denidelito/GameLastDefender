export function spawnRandomEnemy(scene, enemiesData) {
    // Проверяем флаг, чтобы убедиться, что на сцене нет другого противника
    if (scene.isEnemySpawned) {
        return; // Возвращаемся, если противник уже заспавнен
    }

    // Генерируем случайные координаты для противника в пределах размеров сцены
    const randomX = Phaser.Math.Between(0, 1920);
    const randomY = Phaser.Math.Between(0, 1080);

    scene.enemy = scene.add.rectangle(randomX, randomY, 28, 28).setOrigin(0);

    // Обновляем характеристики противника на основе случайного выбора из объекта enemiesData
    const randomIndex = Phaser.Math.Between(0, enemiesData.length - 1);
    const randomEnemy = enemiesData[randomIndex];
    scene.enemy.x = randomX;
    scene.enemy.y = randomY;
    scene.enemy.health = randomEnemy.health;
    scene.enemy.damage = randomEnemy.damage;
    scene.enemy.setFillStyle(randomEnemy.color);

    // Обновляем текстовые объекты с именем и здоровьем противника
    scene.enemyNameText.setText(randomEnemy.name);
    scene.enemyNameText.setPosition(scene.enemy.x + scene.enemy.width / 2, scene.enemy.y); // Позиционируем над противником

    // Устанавливаем флаг в true, чтобы отметить, что противник заспавнен
    scene.isEnemySpawned = true;
}
