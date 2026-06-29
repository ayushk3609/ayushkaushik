import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useTheme } from '../../Contexts/theme'
import { createScene, createCamera, createRenderer } from './scene-setup'
import { buildLightingRig } from './lighting-rig'
import { buildHeroMesh } from './hero-mesh'
import { buildParticles } from './particle-network'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { SCROLL_STATES } from './scroll-states'

const PALETTES = {
    dark: { accent: 0x7c3aed, cyan: 0x06b6d4, white: 0xffffff },
    light: { accent: 0x5b21b6, cyan: 0x0e7490, white: 0x1e1b4b },
}

const PARTICLE_RGB = {
    dark: {
        violet: [0.486, 0.227, 0.929],
        cyan: [0.024, 0.714, 0.831],
        pink: [0.850, 0.200, 0.650],
    },
    light: {
        violet: [0.357, 0.129, 0.714],
        cyan: [0.055, 0.455, 0.565],
        pink: [0.659, 0.333, 0.569],
    },
}

const toBuildPalette = (themePalette, theme) => ({
    ...themePalette,
    purple: themePalette.accent,
    cyanHex: themePalette.cyan,
    ...PARTICLE_RGB[theme],
})

const StickyCanvas = ({ sceneRef, pointerActive = false, sectionIndex = 0 }) => {
    const mountRef = useRef(null)
    const themeMounted = useRef(false)
    const targetRef = useRef(SCROLL_STATES[0])
    const { theme } = useTheme()

    const PALETTE = PALETTES[theme] ?? PALETTES.dark

    useEffect(() => {
        const mount = mountRef.current
        if (!mount) return

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const w = window.innerWidth
        const h = window.innerHeight
        const buildPalette = toBuildPalette(PALETTE, theme)

        const scene = createScene()
        const lights = buildLightingRig(scene, buildPalette)
        const camera = createCamera(w / h)
        const renderer = createRenderer(mount)
        renderer.setSize(w, h)

        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.dampingFactor = 0.06
        controls.enableZoom = true
        controls.enablePan = false

        renderer.domElement.style.touchAction = 'none'

        const network = buildParticles(scene, buildPalette)
        const {
            particles,
            lines,
            geometry: ptGeo,
            velocities: ptVel,
            positions,
            count: COUNT,
            rebuildLines,
            particleMaterial,
            lineMaterial,
        } = network

        const hero = buildHeroMesh(scene, buildPalette)
        const { solidMesh, edgeMesh, edgeSourceGeo } = hero

        if (sceneRef) {
            sceneRef.current = {
                solidMesh,
                edgeMesh,
                particles,
                particleMaterial,
                lineMaterial,
                positions,
                velocities: ptVel,
                lights,
                controls,
                camera,
                setTarget: (s) => { targetRef.current = s },
            }
            targetRef.current = SCROLL_STATES[0]
        }

        rebuildLines()

        const onResize = () => {
            const width = window.innerWidth
            const height = window.innerHeight
            camera.aspect = width / height
            camera.updateProjectionMatrix()
            renderer.setSize(width, height)
        }
        window.addEventListener('resize', onResize)

        let rafId
        const clock = new THREE.Clock()
        let tick = 0
        const originTarget = new THREE.Vector3(0, 0, 0)
        let lastScrollY = window.scrollY
        let scrollVelocity = 0

        const renderFrame = () => {
            controls.update()
            renderer.render(scene, camera)
        }

        const applyScrollLerp = (delta) => {
            const L = 0.035
            const lf = Math.min(L * delta * 60, 0.05)
            const camLf = Math.min(L * 0.6 * delta * 60, 0.05)
            const T = targetRef.current

            solidMesh.scale.setScalar(
                THREE.MathUtils.lerp(solidMesh.scale.x, T.meshScale, lf),
            )
            edgeMesh.scale.copy(solidMesh.scale)
            solidMesh.position.x = THREE.MathUtils.lerp(solidMesh.position.x, T.meshX, lf)
            edgeMesh.position.x = solidMesh.position.x
            solidMesh.position.y = THREE.MathUtils.lerp(solidMesh.position.y, T.meshY, lf)
            edgeMesh.position.y = solidMesh.position.y
            particleMaterial.opacity = THREE.MathUtils.lerp(particleMaterial.opacity, T.particleOp, lf)
            lineMaterial.opacity = THREE.MathUtils.lerp(lineMaterial.opacity, T.lineOp, lf)
            camera.position.z = THREE.MathUtils.lerp(camera.position.z, T.cameraZ, camLf)
            if (controls.enabled !== T.controlsOn) controls.enabled = T.controlsOn
            if (!T.controlsOn) controls.target.lerp(originTarget, lf)
        }

        const animate = () => {
            rafId = requestAnimationFrame(animate)
            const delta = Math.min(clock.getDelta(), 0.05)
            tick++

            if (!prefersReduced) {
                const currentScrollY = window.scrollY
                scrollVelocity = (currentScrollY - lastScrollY) * 0.001
                scrollVelocity *= 0.82
                lastScrollY = currentScrollY

                const absVel = Math.abs(scrollVelocity)
                const warpIntensity = Math.min(absVel * 90, 1.0)
                particleMaterial.size = THREE.MathUtils.lerp(
                    particleMaterial.size,
                    0.022 + warpIntensity * 0.055,
                    0.15,
                )
                particleMaterial.opacity = THREE.MathUtils.lerp(
                    particleMaterial.opacity,
                    Math.min(particleMaterial.opacity + warpIntensity * 0.25, 1.0),
                    0.1,
                )
            }

            const pos = ptGeo.attributes.position.array
            const step = delta * 60
            for (let i = 0; i < COUNT; i++) {
                pos[i * 3] += ptVel[i * 3] * step
                pos[i * 3 + 1] += ptVel[i * 3 + 1] * step
                if (!prefersReduced) {
                    pos[i * 3 + 1] -= scrollVelocity * 0.25
                }
                if (pos[i * 3] > 12) pos[i * 3] = -12
                if (pos[i * 3] < -12) pos[i * 3] = 12
                if (pos[i * 3 + 1] > 12) pos[i * 3 + 1] = -12
                if (pos[i * 3 + 1] < -12) pos[i * 3 + 1] = 12
            }
            ptGeo.attributes.position.needsUpdate = true

            particles.rotation.y += 0.018 * delta
            particles.rotation.x += 0.006 * delta
            lines.rotation.copy(particles.rotation)

            solidMesh.rotation.y += 0.18 * delta
            solidMesh.rotation.x += 0.06 * delta
            edgeMesh.rotation.copy(solidMesh.rotation)

            if (tick % 90 === 0) rebuildLines()

            controls.update()
            applyScrollLerp(delta)
            renderer.render(scene, camera)
        }

        if (prefersReduced) {
            applyScrollLerp(1 / 60)
            renderFrame()
        } else animate()

        return () => {
            cancelAnimationFrame(rafId)
            window.removeEventListener('resize', onResize)
            if (sceneRef) sceneRef.current = null
            if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)

            controls.dispose()

            scene.remove(lights.ambient, lights.key, lights.fill, lights.rim)

            solidMesh.geometry.dispose()
            solidMesh.material.dispose()
            edgeMesh.geometry.dispose()
            edgeMesh.material.dispose()
            edgeSourceGeo.dispose()

            ptGeo.dispose()
            particleMaterial.dispose()
            network.lineGeometry.dispose()
            lineMaterial.dispose()
            renderer.dispose()
        }
    }, [sceneRef, theme])

    useEffect(() => {
        targetRef.current = SCROLL_STATES[sectionIndex] ?? SCROLL_STATES[0]
    }, [sectionIndex])

    useEffect(() => {
        if (!themeMounted.current) {
            themeMounted.current = true
            return
        }

        const palette = PALETTES[theme] ?? PALETTES.dark
        const ref = sceneRef?.current
        if (!ref?.lights) return

        ref.lights.key.color.setHex(palette.accent)
        ref.lights.fill.color.setHex(palette.cyan)
        ref.solidMesh.material.color.setHex(palette.accent)
        ref.edgeMesh.material.color.setHex(palette.cyan)
        ref.particleMaterial.color.setHex(palette.white)
    }, [theme, sceneRef])

    return (
        <div
            ref={mountRef}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 0,
                pointerEvents: pointerActive ? 'auto' : 'none',
                width: '100%',
                height: '100%',
                touchAction: 'none',
            }}
        />
    )
}

export default StickyCanvas
