import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

/**
 * @param {import('three').PerspectiveCamera} camera
 * @param {HTMLElement} domElement
 * @returns {OrbitControls}
 */
export const buildOrbitControls = (camera, domElement) => {
    const controls = new OrbitControls(camera, domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.06
    controls.enableZoom = true
    controls.zoomSpeed = 0.5
    controls.minDistance = 4
    controls.maxDistance = 14
    controls.enablePan = false
    controls.autoRotate = false
    return controls
}
