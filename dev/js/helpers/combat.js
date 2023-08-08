export function handleCombat(player, enemy, combatData, score) {
    const currentTime = player.scene.time.now;
    const distance = Phaser.Math.Distance.Between(player.x, player.y, enemy.x, enemy.y);

    // Устанавливаем интервал нанесения урона в 1 секунду
    const InfoScene = player.scene.scene.get('InfoScene');
    const InventoryScene = player.scene.scene.get('InventoryScene');

    if (distance < 50) {

        // Если прошло достаточно времени с момента последнего удара
        if (currentTime - combatData.lastDamageTime >= combatData.damageInterval) {

            // Проверяем, кто сейчас может наносить удар
            if (combatData.isCombatTurn === 'player') {
                enemy.health -= player.scene.GameData.playerData.damage;

                // Обновление показателей здоровья в информации
                InfoScene.updateDialogModal(
                    `Здоровье противника: ${enemy.health}`
                );

                // Проверяем состояние здоровья противника
                if (enemy.health <= 0) {

                    // Если здоровье противника меньше или равно 0, удаляем противника и спавним нового
                    enemy.destroy();
                    player.scene.GameData.isEnemySpawned = false;

                    // Прибавляем 10 очков к счету после убийства противника
                    player.scene.GameData.score += 10;

                    // Получаем доступные предметы для данного типа врага
                    const possibleItems = enemy.possibleItems;

                    // Если у врага есть доступные предметы
                    if (possibleItems && possibleItems.length > 0) {

                        // Случайным образом выбираем предмет для дропа
                        const randomItemIndex = Phaser.Math.Between(0, possibleItems.length - 1);
                        const droppedItem = possibleItems[randomItemIndex];

                        InfoScene.updateDialogModal(
                            `Вы получили: ${possibleItems[randomItemIndex]}`
                        );

                        // Добавляем предмет в инвентарь или делаем другие действия с ним
                        InventoryScene.addToInventory(droppedItem);
                    }

                    InfoScene.updateDialogModal(
                        `Ваш счет равен: ${player.scene.GameData.score}`
                    );
                }

                // Переключаем currentPlayer на 'enemy', чтобы следующий удар наносился противником
                combatData.isCombatTurn = 'enemy';

                // Обновляем время последнего удара
                combatData.lastDamageTime = currentTime;

            } else if (combatData.isCombatTurn === 'enemy') {
                player.scene.GameData.playerData.health -= enemy.damage;

                // Обновление показателей здоровья в информации
                InfoScene.updateDialogModal(
                    `Здоровье игрока: ${player.scene.GameData.playerData.health}`
                );

                // Обновляем время последнего удара
                combatData.lastDamageTime = currentTime;

                // Переключаем currentPlayer на 'player', чтобы следующий удар наносился игроком
                combatData.isCombatTurn = 'player';
            }
        }
    }
}
