import {destroyEnemy} from "./enemyDestroy.js";

const DISTANCE_THRESHOLD = 64;
const NUMBER_OF_DICE = 2;
const TYPE_OF_DICE = 16;

function updateHealthBar(scene, targetEnemy) {
    // Предполагается, что у врагов одинаковое максимальное здоровье                    // Максимальная ширина полоски здоровья (64 пикселей)
    const healthBarWidth = (64 / 100) * targetEnemy.info.health;
    // Очищаем старое состояние полоски
    targetEnemy.hpBar.clear();
    // Красный цвет
    targetEnemy.hpBar.fillStyle(0xFF0000, 1);
    // Обновляем ширину полоски
    targetEnemy.hpBar.fillRect(targetEnemy.info.x, targetEnemy.info.y - 10, healthBarWidth, 8);
}

function getSceneData(scene, key) {
    return scene.scene.get('GameScene').data.get(key);
}

function calculateDamage(numberOfDice, typeOfDice, modifier) {
    let totalDamage = 0;

    for (let i = 0; i < numberOfDice; i++) {
        const diceRoll = Phaser.Math.Between(1, typeOfDice);
        totalDamage += diceRoll;
    }

    totalDamage += modifier;

    return totalDamage;
}

function handlePlayerAttack(scene, playerSprite, targetEnemy, combatData, distance) {
    targetEnemy.info.anims.play('enemy1-idle', true);
    const player = getSceneData(scene, 'player');
    const damage = calculateDamage(NUMBER_OF_DICE, TYPE_OF_DICE, player.characteristics.damage, player);
    targetEnemy.info.health -= damage;

    const informationScene = scene.scene.get('InformationScene');

    playerSprite.anims.play('attack', true);
    scene.soundEnemyAttack.stop();

    if (targetEnemy.info.health > 0) {
        combatData.isCombatTurn = 'enemy';
        informationScene.updateDialogModal(
            `${player.name}: нанесит противнику ${damage} урона`
        );
    } else {
        combatData.isCombatTurn = 'player';
        informationScene.updateDialogModal(
            `${player.name}: наносит ${damage} урона, и пустили на фарш ${targetEnemy.info.name}`
        );
        handleEnemyDeath(scene, targetEnemy, playerSprite,  combatData);
    }


    combatData.lastDamageTime = scene.time.now;
}

function handleEnemyDeath(scene, targetEnemy, playerSprite, combatData) {
    targetEnemy.info.anims.play('enemy1-die', true);
    playerSprite.anims.play('attack', true);

    scene.scene.get('GameScene').data.get('worldChaos').current += -targetEnemy.info.chaos;

    targetEnemy.info.on('animationcomplete', function(animation, frame) {
        if (animation.key === 'enemy1-die') {
            playerSprite.anims.play('idle', true);

            scene.soundAttack.stop();
            scene.soundEnemyAttack.stop();

            destroyEnemy(scene);

            const combat = getSceneData(scene, 'combat');
            combat.active = false;
            const player = getSceneData(scene, 'player');
            player.target = null;
            const spawnEnemy = getSceneData(scene, 'spawnEnemy');
            scene.scene.get('QuestScene').updateQuest(scene, spawnEnemy.livingEnemies);
        }
    }, this);

    const possibleItems = targetEnemy.info.possibleItems;

    if (possibleItems && possibleItems.length > 0) {
        const randomItemIndex = Phaser.Math.Between(0, possibleItems.length - 1);
        const droppedItem = possibleItems[randomItemIndex];

        const informationScene = scene.scene.get('InformationScene');
        informationScene.updateDialogModal(
            `Вы получили: ${possibleItems[randomItemIndex]}`
        );

        const InventoryScene = scene.scene.get('InventoryScene');
        InventoryScene.addToInventory(droppedItem);
    }
}

export function combatEnemy(scene, playerSprite, targetEnemy, combatData) {
    const currentTime = scene.time.now;
    const distance = Phaser.Math.Distance.Between(playerSprite.x, playerSprite.y, targetEnemy.info.x, targetEnemy.info.y);

    if (distance < DISTANCE_THRESHOLD && currentTime - combatData.lastDamageTime >= combatData.damageInterval) {
        const combat = getSceneData(scene, 'combat');

        if (!combat.active) {
            return;
        }

        if (combatData.isCombatTurn === 'player') {
            scene.soundAttack.play();

            handlePlayerAttack(scene, playerSprite, targetEnemy, combatData, distance);

        } else if (combatData.isCombatTurn === 'enemy') {
            scene.soundAttack.stop();
            scene.soundEnemyAttack.play();

            playerSprite.anims.play('idle', true);
            targetEnemy.info.anims.play('enemy1-attack', true);

            const damage = calculateDamage(NUMBER_OF_DICE, TYPE_OF_DICE, targetEnemy.info.damage, targetEnemy.info);
            const player = getSceneData(scene, 'player');

            player.characteristics.health -= damage;

            const informationScene = scene.scene.get('InformationScene');
            informationScene.updateDialogModal(`${targetEnemy.info.name}: нанесли ${damage} урона`);

            updateHealthBar(scene, targetEnemy);

            combatData.isCombatTurn = 'player';
            combatData.lastDamageTime = currentTime;
        }
    }
}