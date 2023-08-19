export function createGrid(scene, map, show) {
    // Настройте параметры сетки
    const gridConfig = {
        width: map.width,
        height: map.height,
        cellSize: map.tileWidth,
        showHexGrid: show,
    };

    // Создайте сетку
    scene.gridGraphics = scene.add.graphics();
    scene.gridGraphics.lineStyle(2, 0xffffff, 0.5);

    // Отобразите поля сетки, рисуя границы каждого тайла
    for (let row = 0; row < gridConfig.height; row++) {
        for (let col = 0; col < gridConfig.width; col++) {
            const x = col * gridConfig.cellSize;
            const y = row * gridConfig.cellSize;

            if (gridConfig.showHexGrid) {
                scene.gridGraphics.strokeRect(x, y, gridConfig.cellSize, gridConfig.cellSize);
            }
        }
    }
}
