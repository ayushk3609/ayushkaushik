import * as THREE from 'three'

const NODE_COUNT = 800
const SPHERE_RADIUS = 12
const CONNECT_DIST = 2.5
const MAX_LINES = 1200

const NODE_COLORS = [0x7c3aed, 0x06b6d4, 0xe2e8f0]

const randomInSphere = (radius) => {
    const u = Math.random()
    const v = Math.random()
    const theta = 2 * Math.PI * u
    const phi = Math.acos(2 * v - 1)
    const r = radius * Math.cbrt(Math.random())
    return new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
    )
}

/**
 * @param {THREE.Scene} scene
 * @param {THREE.PerspectiveCamera} _camera
 * @param {THREE.WebGLRenderer} _renderer
 */
export const buildGalaxyScene = (scene, _camera, _renderer) => {
    const group = new THREE.Group()
    scene.add(group)

    const ambient = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambient)

    const movingLight = new THREE.PointLight(0x7c3aed, 2, 30)
    scene.add(movingLight)

    const sphereGeo = new THREE.SphereGeometry(0.04, 6, 6)
    const materials = NODE_COLORS.map(
        color => new THREE.MeshStandardMaterial({ color, metalness: 0.4, roughness: 0.35 }),
    )

    const nodePositions = []
    const nodeMeshes = []

    for (let i = 0; i < NODE_COUNT; i++) {
        const pos = randomInSphere(SPHERE_RADIUS)
        nodePositions.push(pos)
        const colorIndex = i % 3
        const mesh = new THREE.Mesh(sphereGeo, materials[colorIndex])
        mesh.position.copy(pos)
        group.add(mesh)
        nodeMeshes.push(mesh)
    }

    const linePositions = new Float32Array(MAX_LINES * 6)
    let seg = 0

    outer: for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
            if (seg >= MAX_LINES) break outer
            if (nodePositions[i].distanceTo(nodePositions[j]) < CONNECT_DIST) {
                const b = seg * 6
                linePositions[b] = nodePositions[i].x
                linePositions[b + 1] = nodePositions[i].y
                linePositions[b + 2] = nodePositions[i].z
                linePositions[b + 3] = nodePositions[j].x
                linePositions[b + 4] = nodePositions[j].y
                linePositions[b + 5] = nodePositions[j].z
                seg++
            }
        }
    }

    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    lineGeo.setDrawRange(0, seg * 2)

    const lineMat = new THREE.LineBasicMaterial({
        color: 0x7c3aed,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    })
    const connectionLines = new THREE.LineSegments(lineGeo, lineMat)
    group.add(connectionLines)

    let lightAngle = 0

    const update = (delta) => {
        group.rotation.y += 0.04 * delta
        lightAngle += delta * 0.55
        const orbitR = 10
        movingLight.position.set(
            Math.cos(lightAngle) * orbitR,
            Math.sin(lightAngle * 0.7) * 4,
            Math.sin(lightAngle) * orbitR,
        )
    }

    const dispose = () => {
        scene.remove(group, ambient, movingLight)
        sphereGeo.dispose()
        materials.forEach(mat => mat.dispose())
        lineGeo.dispose()
        lineMat.dispose()
    }

    return { nodeMeshes, connectionLines, movingLight, group, update, dispose, sphereGeo, lineGeo, lineMat, materials }
}
