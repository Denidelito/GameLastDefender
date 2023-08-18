export function createLoadingBar(scene) {
    // Загрузка полосы
    const progressBar = scene.add.graphics();
    const progressBox = scene.add.graphics();
    const width = scene.cameras.main.width;
    const height = scene.cameras.main.height;

    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 4, height / 2 - 30, width / 2, 50);

    // Обновление полосы загрузки
    scene.load.on('progress', (value) => {
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRect(width / 4 + 10, height / 2 - 20, (width / 2 - 20) * value, 30);
    });
}