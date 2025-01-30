import { OrthographicCamera, PerspectiveCamera } from 'three';
/**
 * must be called when camera.fov, camera.top, camera.bottom, camera.right, camera.left, camera.zoom, camera.aspect changes
 */
export function updateSizeFullscreen(sizeX, sizeY, pixelSize, distanceToCamera, camera, screenHeight) {
    if (camera instanceof PerspectiveCamera) {
        const cameraHeight = 2 * Math.tan((Math.PI * camera.fov) / 360) * distanceToCamera;
        pixelSize.value = cameraHeight / screenHeight;
        sizeY.value = cameraHeight;
        sizeX.value = cameraHeight * camera.aspect;
    }
    if (camera instanceof OrthographicCamera) {
        const cameraHeight = (camera.top - camera.bottom) / camera.zoom;
        const cameraWidth = (camera.right - camera.left) / camera.zoom;
        pixelSize.value = cameraHeight / screenHeight;
        sizeY.value = cameraHeight;
        sizeX.value = cameraWidth;
    }
}
