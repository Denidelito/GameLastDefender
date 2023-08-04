export function handleCombat(player, enemy, lastDamageTime, score, currentPlayer) {
    const currentTime = player.scene.time.now;
    const distance = Phaser.Math.Distance.Between(player.x, player.y, enemy.x, enemy.y);

    // Устанавливаем интервал нанесения урона в 1 секунду
    const damageInterval = 1000;


    if (distance < 50) {
        // Если прошло достаточно времени с момента последнего удара
        if (currentTime - lastDamageTime >= damageInterval) {
            // Проверяем, кто сейчас может наносить удар
            if (currentPlayer === 'player') {
                enemy.health -= player.scene.playerData.damage;

                // Обновление показателей здоровья в информации
                player.scene.scene.get('InfoScene').updateDialogModal(`Здоровье противника: ${enemy.health}`);

                // Проверяем состояние здоровья противника
                if (enemy.health <= 0) {
                    // Если здоровье противника меньше или равно 0, удаляем противника и спавним нового
                    enemy.destroy();
                    player.scene.isEnemySpawned = false;

                    // Прибавляем 10 очков к счету после убийства противника
                    player.scene.score += 10;
                    // Получаем доступные предметы для данного типа врага
                    const possibleItems = enemy.possibleItems;

                    // Если у врага есть доступные предметы
                    if (possibleItems && possibleItems.length > 0) {
                        // Случайным образом выбираем предмет для дропа
                        const randomItemIndex = Phaser.Math.Between(0, possibleItems.length - 1);
                        const droppedItem = possibleItems[randomItemIndex];

                        player.scene.scene.get('InfoScene').updateDialogModal(`Вы получили: ${possibleItems[randomItemIndex]}`);
                        // Добавляем предмет в инвентарь или делаем другие действия с ним
                        player.scene.scene.get('InventoryScene').addToInventory(droppedItem);
                    }


                    player.scene.scene.get('InfoScene').updateDialogModal(`Ваш счет равен: ${player.scene.score}`);
                }

                // Переключаем currentPlayer на 'enemy', чтобы следующий удар наносился противником
                player.scene.isCombatTurn = 'enemy';

                // Обновляем время последнего удара
                player.scene.lastDamageTime = currentTime;

            } else if (currentPlayer === 'enemy') {
                player.scene.playerData.health -= enemy.damage;

                // Обновление показателей здоровья в информации
                player.scene.scene.get('InfoScene').updateDialogModal(`Здоровье игрока: ${player.scene.playerData.health}`);

                // Обновляем время последнего удара
                player.scene.lastDamageTime = currentTime;

                // Переключаем currentPlayer на 'player', чтобы следующий удар наносился игроком
                player.scene.isCombatTurn = 'player';
            }
        }
    }
}
