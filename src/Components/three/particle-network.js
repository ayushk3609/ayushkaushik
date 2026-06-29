import * as THREE from 'three'

const COUNT = 55
const MAX_LINES = 60
const CONNECT_DIST = 4.2

/**
 * @param {THREE.Scene} scene
 * @param {{ readonly violet: readonly number[]; readonly cyan: readonly number[]; readonly pink: readonly number[] }} palette
 */
export const buildParticles = (scene, palette) => {
    const { violet, cyan, pink } = palette

    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const velocities = new Float32Array(COUNT * 3)

    for (let i = 0; i < COUNT; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 22
        positions[i * 3 + 1] = (Math.random() - 0.5) * 22
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10
        velocities[i * 3] = (Math.random() - 0.5) * 0.003
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.003
        const r = Math.random()
        const c = r > 0.60 ? cyan : r > 0.15 ? violet : pink
        colors[i * 3] = c[0]
        colors[i * 3 + 1] = c[1]
        colors[i * 3 + 2] = c[2]
    }

    const ptGeo = new THREE.BufferGeometry()
    ptGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage))
    ptGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const ptMat = new THREE.PointsMaterial({
        size: 0.022, vertexColors: true, transparent: true, opacity: 0.85, sizeAttenuation: true,
    })
    const particles = new THREE.Points(ptGeo, ptMat)
    scene.add(particles)

    const lnPos = new Float32Array(MAX_LINES * 6)
    const lnCol = new Float32Array(MAX_LINES * 6)
    const lnGeo = new THREE.BufferGeometry()
    lnGeo.setAttribute('position', new THREE.BufferAttribute(lnPos, 3).setUsage(THREE.DynamicDrawUsage))
    lnGeo.setAttribute('color', new THREE.BufferAttribute(lnCol, 3).setUsage(THREE.DynamicDrawUsage))
    const lnMat = new THREE.LineBasicMaterial({
        vertexColors: true, transparent: true, opacity: 0.14,
        blending: THREE.AdditiveBlending, depthWrite: false,
    })
    const lines = new THREE.LineSegments(lnGeo, lnMat)
    scene.add(lines)

    const rebuildLines = () => {
        let seg = 0
        const pos = ptGeo.attributes.position.array
        outer: for (let i = 0; i < COUNT; i++) {
            for (let j = i + 1; j < COUNT; j++) {
                if (seg >= MAX_LINES) break outer
                const dx = pos[i * 3] - pos[j * 3]
                const dy = pos[i * 3 + 1] - pos[j * 3 + 1]
                const dz = pos[i * 3 + 2] - pos[j * 3 + 2]
                const d2 = dx * dx + dy * dy + dz * dz
                if (d2 < CONNECT_DIST * CONNECT_DIST) {
                    const alpha = (1 - Math.sqrt(d2) / CONNECT_DIST) * 0.7
                    const b = seg * 6
                    lnPos[b] = pos[i * 3]; lnPos[b + 1] = pos[i * 3 + 1]; lnPos[b + 2] = pos[i * 3 + 2]
                    lnPos[b + 3] = pos[j * 3]; lnPos[b + 4] = pos[j * 3 + 1]; lnPos[b + 5] = pos[j * 3 + 2]
                    const rv = (colors[i * 3] + colors[j * 3]) / 2 * alpha
                    const gv = (colors[i * 3 + 1] + colors[j * 3 + 1]) / 2 * alpha
                    const bv = (colors[i * 3 + 2] + colors[j * 3 + 2]) / 2 * alpha
                    lnCol[b] = rv; lnCol[b + 1] = gv; lnCol[b + 2] = bv
                    lnCol[b + 3] = rv; lnCol[b + 4] = gv; lnCol[b + 5] = bv
                    seg++
                }
            }
        }
        lnGeo.setDrawRange(0, seg * 2)
        lnGeo.attributes.position.needsUpdate = true
        lnGeo.attributes.color.needsUpdate = true
    }

    return {
        particles,
        lines,
        positions,
        velocities,
        geometry: ptGeo,
        particleMaterial: ptMat,
        lineGeometry: lnGeo,
        lineMaterial: lnMat,
        count: COUNT,
        rebuildLines,
    }
}
