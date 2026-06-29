import * as THREE from 'three'

/**
 * @param {THREE.Scene} scene
 * @param {{ readonly purple: number; readonly cyanHex: number }} palette
 */
export const buildHeroMesh = (scene, palette) => {
    const solidGeo = new THREE.IcosahedronGeometry(1.4, 1)
    const solidMat = new THREE.MeshStandardMaterial({
        color: palette.purple,
        metalness: 0.4,
        roughness: 0.3,
        wireframe: false,
    })
    const solidMesh = new THREE.Mesh(solidGeo, solidMat)

    const edgeSourceGeo = new THREE.IcosahedronGeometry(1.5, 1)
    const edgeGeo = new THREE.EdgesGeometry(edgeSourceGeo)
    const edgeMat = new THREE.LineBasicMaterial({
        color: palette.cyanHex,
        transparent: true,
        opacity: 0.35,
    })
    const edgeMesh = new THREE.LineSegments(edgeGeo, edgeMat)

    scene.add(solidMesh, edgeMesh)

    return { solidMesh, edgeMesh, edgeSourceGeo }
}
