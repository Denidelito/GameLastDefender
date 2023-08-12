export function handleCombat(player, enemy, combatData, score) {
    const currentTime = player.scene.time.now;
    const distance = Phaser.Math.Distance.Between(player.x, player.y, enemy.x, enemy.y);
    const GameData = player.scene.GameData;
    // Устанавливаем интервал нанесения урона в 1 секунду
    const InfoScene = player.scene.scene.get('InfoScene');
    const InventoryScene = player.scene.scene.get('InventoryScene');

    console.log(GameData.combat.isCombatTurn)
    if (distance < 50) {

        // Если прошло достаточно времени с момента последнего удара
        if (currentTime - combatData.lastDamageTime >= combatData.damageInterval) {

            // Проверяем, кто сейчас может наносить удар
            if (combatData.isCombatTurn === 'player') {
                player.anims.play('attack', true);

                enemy.health -= GameData.playerData.damage;

                // Обновление показателей здоровья в информации
                if (enemy.health > 0) {
                    InfoScene.updateDialogModal(
                        `${GameData.playerData.name}: нанесит противнику ${GameData.playerData.damage} урона`
                    );
                } else {
                    InfoScene.updateDialogModal(
                        `${GameData.playerData.name}: наносит ${GameData.playerData.damage} урона, и пустили на фарш ${enemy.name}`
                    );
                }


                // Проверяем состояние здоровья противника
                if (enemy.health <= 0) {

                    // Если здоровье противника меньше или равно 0, удаляем противника и спавним нового
                    enemy.destroy();
                    GameData.isEnemySpawned = false;

                    // Прибавляем 10 очков к счету после убийства противника
                    GameData.score += 10;

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
                        `Ваш счет равен: ${GameData.score}`
                    );

                }

                // Переключаем currentPlayer на 'enemy', чтобы следующий удар наносился противником
                if (enemy.health > 0){
                    combatData.isCombatTurn = 'enemy';
                } else {
                    combatData.isCombatTurn = 'player'
                }

                // Обновляем время последнего удара
                combatData.lastDamageTime = currentTime;

            } else if (combatData.isCombatTurn === 'enemy') {
                player.anims.stop()

                player.scene.GameData.playerData.health -= enemy.damage;

                // Обновление показателей здоровья в информации
                InfoScene.updateDialogModal(
                    `${enemy.name}: нанесли ${enemy.damage} урона`
                );

                if (enemy && player.scene.enemyHealthBar) {
                    const healthPercent = enemy.health / GameData.enemiesData[0].health; // Предполагается, что у врагов одинаковое максимальное здоровье
                    const healthBarWidth = 64 * healthPercent; // Максимальная ширина полоски здоровья (96 пикселей)
                    player.scene.enemyHealthBar.clear(); // Очищаем старое состояние полоски
                    player.scene.enemyHealthBar.fillStyle(0xFF0000, 1); // Красный цвет
                    player.scene.enemyHealthBar.fillRect(enemy.x, enemy.y - 30, healthBarWidth, 8); // Обновляем ширину полоски
                }

                // Обновляем время последнего удара
                combatData.lastDamageTime = currentTime;

                // Переключаем currentPlayer на 'player', чтобы следующий удар наносился игроком
                combatData.isCombatTurn = 'player';
            }
        }
    }
}
