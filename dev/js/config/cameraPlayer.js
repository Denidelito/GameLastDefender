export function cameraPlayer(scene, width, height, offsetX, offsetY) {
    const camera = scene.cameras.main;
    camera.setSize(width, height);
    camera.setPosition(offsetX, offsetY);
    // Центрируем камеру по размеру
    camera.centerOn(width / 2,height / 2);
    camera.zoom = 1


    // Устанавливаем размеры камеры сцены WorldScene
    scene.cameras.main.setSize(width, height);
    scene.cameras.main.setPosition(offsetX, offsetY);
}
