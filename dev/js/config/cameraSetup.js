export function setupCamera(scene, width, height, offsetX, offsetY) {
    const camera = scene.cameras.main;
    camera.setSize(width, height);
    camera.setPosition(offsetX, offsetY);
    camera.centerOn(width / 2, height / 2); // Центрируем камеру по размеру
}
