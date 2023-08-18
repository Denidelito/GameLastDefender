import EasyStar from "easystarjs";

export function createTilemap(scene) {
    // Создаем карты
    scene.map = scene.make.tilemap({ key: 'map' });
    scene.map2 = scene.make.tilemap({ key: 'map' });

    // Выбираем tiles которые будут использоваться для отрисовки
    const tile = scene.map.addTilesetImage('tilemap', 'tiles');

    // Сыводим слои
    scene.mapLayers = {
        ground: scene.map.createLayer('main', tile, 0, 0),
        wood: scene.map.createLayer('wood', tile, 0, 0),
        wood2: scene.map2.createLayer('hs', tile, 0, 0).setDepth(3),
    }

    const tileData = scene.mapLayers.wood.layer.data;
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