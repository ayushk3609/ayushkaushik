import * as THREE from 'three'

/**
 * @param {THREE.Scene} scene
 * @param {{ readonly purple: number; readonly cyanHex: number; readonly white: number }} palette
 */
export const buildLightingRig = (scene, palette) => {
    const ambient = new THREE.AmbientLight(palette.white, 0.35)
    const key = new THREE.DirectionalLight(palette.purple, 1.2)
    key.position.set(5, 8, 5)
    const fill = new THREE.PointLight(palette.cyanHex, 0.9, 25)
    fill.position.set(-4, -2, 4)
    const rim = new THREE.PointLight(palette.white, 0.4, 15)
    rim.position.set(0, 5, 3)

    scene.add(ambient, key, fill, rim)

    return { ambient, key, fill, rim }
}
