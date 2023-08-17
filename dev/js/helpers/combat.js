import playerData from "../object/player";
import {destroyEnemy} from "./enemyDestroy";
export function handleCombat(scene, player, targetEnemy, combatData) {
    if (!scene.GameData.combat.active) {
        return
    }

    const currentTime = scene.time.now;
    const distance = Phaser.Math.Distance.Between(player.x, player.y, targetEnemy.info.x, targetEnemy.info.y);
    const GameData = scene.GameData;
    // Устанавливаем интервал нанесения урона в 1 секунду
    const InfoScene = scene.scene.get('InfoScene');
    const InventoryScene = scene.scene.get('InventoryScene');


    const numberOfDice = 2; // Количество бросков кубика
    const typeOfDice = 16;   // Тип кубика

    function calculateDamage(numberOfDice, typeOfDice, modifier) {
        let totalDamage = 0;

        for (let i = 0; i < numberOfDice; i++) {
            const diceRoll = Phaser.Math.Between(1, typeOfDice);
            totalDamage += diceRoll;
        }

        totalDamage += modifier;

        return totalDamage;
    }

    if (distance < 50) {
        // Если прошло достаточно времени с момента последнего удара
        if (currentTime - combatData.lastDamageTime >= combatData.damageInterval) {
            // Проверяем, кто сейчас может наносить удар
            if (combatData.isCombatTurn === 'player') {

                targetEnemy.info.anims.play('enemy1-idle', true);

                const damage = calculateDamage(numberOfDice, typeOfDice, GameData.playerData.damage, playerData);

                targetEnemy.info.health -= damage;

                // Обновление показателей здоровья в информации
                if (targetEnemy.info.health > 0) {
                    InfoScene.updateDialogModal(
                        `${GameData.playerData.name}: нанесит противнику ${damage} урона`
                    );
                } else {
                    InfoScene.updateDialogModal(
                        `${GameData.playerData.name}: наносит ${damage} урона, и пустили на фарш ${targetEnemy.name}`
                    );
                }


                // Проверяем состояние здоровья противника
                if (targetEnemy.info.health <= 0) {
                    targetEnemy.info.anims.play('enemy1-die', true);

                    // Обработчик события завершения анимации
                    targetEnemy.info.on('animationcomplete', function(animation, frame) {
                        if (animation.key === 'enemy1-die') {
                            // Если здоровье противника меньше или равно 0, удаляем противника и спавним нового
                            destroyEnemy(scene);

                            scene.scene.get('QuestScene').updateQuest(scene, scene.GameData.spawnEnemy.livingEnemies);
                            // targetEnemy.enemy.destroy();
                        }
                    }, this);

                    // Прибавляем 10 очков к счету после убийства противника
                    GameData.score += 10;

                    // Получаем доступные предметы для данного типа врага
                    const possibleItems = targetEnemy.info.possibleItems;

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

                    player.anims.play('idle', true);
                    scene.GameData.combat.active = false;

                    scene.playerTarget = null;

                } else {
                    player.anims.play('attack', true);
                }

                // Переключаем currentPlayer на 'enemy', чтобы следующий удар наносился противником
                if (targetEnemy.info.health > 0){
                    combatData.isCombatTurn = 'enemy';
                } else {
                    combatData.isCombatTurn = 'player'
                }

                // Обновляем время последнего удара
                combatData.lastDamageTime = currentTime;

            } else if (combatData.isCombatTurn === 'enemy') {
                player.anims.play('idle', true);
                targetEnemy.info.anims.play('enemy1-attack', true);

                const damage = calculateDamage(numberOfDice, typeOfDice, targetEnemy.info.damage, targetEnemy.info);
                scene.GameData.playerData.health -= damage;

                // Обновление показателей здоровья в информации
                InfoScene.updateDialogModal(
                    `${targetEnemy.info.name}: нанесли ${damage} урона`
                );

                // Предполагается, что у врагов одинаковое максимальное здоровье
                const healthPercent = targetEnemy.health / GameData.enemiesData[0].health;
                // Предполагается, что у врагов одинаковое максимальное здоровье                    // Максимальная ширина полоски здоровья (64 пикселей)
                const healthBarWidth = 64 * healthPercent;
                // Очищаем старое состояние полоски
                targetEnemy.hpBar.clear();
                // Красный цвет
                targetEnemy.hpBar.fillStyle(0xFF0000, 1);
                // Обновляем ширину полоски
                targetEnemy.hpBar.fillRect(targetEnemy.info.x, targetEnemy.info.y - 30, healthBarWidth, 8);

                // Обновляем время последнего удара
                combatData.lastDamageTime = currentTime;

                // Переключаем currentPlayer на 'player', чтобы следующий удар наносился игроком
                combatData.isCombatTurn = 'player';
            }
        }
    }
}
