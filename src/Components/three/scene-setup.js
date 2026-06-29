import * as THREE from 'three'

/**
 * @returns {THREE.Scene}
 */
export const createScene = () => new THREE.Scene()

/**
 * @param {number} aspect
 * @returns {THREE.PerspectiveCamera}
 */
export const createCamera = (aspect) => {
    const camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000)
    camera.position.z = 7
    return camera
}

/**
 * @param {HTMLElement} canvas
 * @returns {THREE.WebGLRenderer}
 */
export const createRenderer = (canvas) => {
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    canvas.appendChild(renderer.domElement)
    return renderer
}
