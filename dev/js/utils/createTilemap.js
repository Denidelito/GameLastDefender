import EasyStar from "easystarjs";

export function createTilemap(scene) {
    // Создаем карты
    scene.map = scene.make.tilemap({ key: 'tilemaps' });

    // Выбираем tiles которые будут использоваться для отрисовки
    const tile = scene.map.addTilesetImage('ter', 'terrain-atlas');

    // Сыводим слои
    scene.mapLayers = {
        Earth: scene.map.createLayer('Earth', tile, 0, 0),
        Treebrush: scene.map.createLayer('Treebrush', tile, 0, 0),
        ForestCastle: scene.map.createLayer('ForestCastle', tile, 0, 0),
        WOW: scene.map.createLayer('WOW', tile, 0, 0),
    }

    // Добавляем обьекты которые нужно обходить
    const tileData = scene.mapLayers.ForestCastle.layer.data;
    const grid = [];
    for (let y = 0; y < tileData.length; y++) {
        const row = [];
        for (let x = 0; x < tileData[y].length; x++) {
            const isWalkable = tileData[y][x].index === -1;
            row.push(isWalkable ? 0 : 1);
        }
        grid.push(row);
    }

    scene.easystar = new EasyStar.js();
    scene.easystar.setGrid(grid);
    scene.easystar.setAcceptableTiles([0]);
}