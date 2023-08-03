export function setCameraBounds(camera, background) {
    const halfWidth = camera.width / 2;
    const halfHeight = camera.height / 2;
    const maxX = background.width - halfWidth;
    const maxY = background.height - halfHeight;
    camera.scrollX = Phaser.Math.Clamp(camera.scrollX, 0, maxX);
    camera.scrollY = Phaser.Math.Clamp(camera.scrollY, 0, maxY);
}
