import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { buildGalaxyScene } from './three/galaxy-scene'

const Playground = () => {
    const mountRef = useRef(null)
    const navigate = useNavigate()
    const [showHint, setShowHint] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setShowHint(false), 3000)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        const mount = mountRef.current
        if (!mount) return

        const w = mount.clientWidth
        const h = mount.clientHeight

        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0x000000)

        const camera = new THREE.PerspectiveCamera(70, w / h, 0.1, 200)
        camera.position.set(0, 0, 18)

        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setSize(w, h)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        mount.appendChild(renderer.domElement)

        const galaxy = buildGalaxyScene(scene, camera, renderer)

        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.dampingFactor = 0.06
        controls.enablePan = true
        controls.autoRotate = true
        controls.autoRotateSpeed = 0.3

        const handlePointerDown = () => { controls.autoRotate = false }
        const handlePointerUp = () => { controls.autoRotate = true }

        renderer.domElement.addEventListener('pointerdown', handlePointerDown)
        renderer.domElement.addEventListener('pointerup', handlePointerUp)
        renderer.domElement.addEventListener('pointerleave', handlePointerUp)

        let composer = null
        try {
            composer = new EffectComposer(renderer)
            composer.addPass(new RenderPass(scene, camera))
            composer.addPass(new UnrealBloomPass(new THREE.Vector2(w, h), 0.4, 0.4, 0.2))
        } catch {
            // bloom requires r152+ postprocessing addon
        }

        const clock = new THREE.Clock()
        let rafId

        const onResize = () => {
            const width = mount.clientWidth
            const height = mount.clientHeight
            camera.aspect = width / height
            camera.updateProjectionMatrix()
            renderer.setSize(width, height)
            if (composer) composer.setSize(width, height)
        }
        window.addEventListener('resize', onResize)

        const animate = () => {
            rafId = requestAnimationFrame(animate)
            const delta = Math.min(clock.getDelta(), 0.05)
            galaxy.update(delta)
            controls.update()
            if (composer) composer.render()
            else renderer.render(scene, camera)
        }
        animate()

        return () => {
            cancelAnimationFrame(rafId)
            window.removeEventListener('resize', onResize)
            renderer.domElement.removeEventListener('pointerdown', handlePointerDown)
            renderer.domElement.removeEventListener('pointerup', handlePointerUp)
            renderer.domElement.removeEventListener('pointerleave', handlePointerUp)
            controls.dispose()
            galaxy.dispose()
            if (composer) composer.dispose()
            renderer.dispose()
            if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
        }
    }, [])

    const handleBack = () => navigate('/')

    return (
        <div className='fixed inset-0 w-screen h-screen overflow-hidden bg-black'>
            <div ref={mountRef} className='absolute inset-0' />

            <div className='absolute top-24 left-0 p-6 pointer-events-none z-10 flex flex-col gap-3'>
                <span className='text-xs font-medium tracking-widest uppercase' style={{ color: 'rgba(255,255,255,0.45)' }}>
                    Ayush Kaushik
                </span>
                <button
                    type='button'
                    onClick={handleBack}
                    className='pointer-events-auto text-sm font-medium px-4 py-2 rounded-xl transition-colors w-fit'
                    style={{
                        color: 'rgba(255,255,255,0.85)',
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.12)',
                    }}
                    aria-label='Back to portfolio'
                >
                    ← Back
                </button>
            </div>

            <p
                className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-sm pointer-events-none z-10 transition-opacity duration-700 ${
                    showHint ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ color: 'rgba(255,255,255,0.5)' }}
            >
                drag to explore · scroll to zoom
            </p>
        </div>
    )
}

export default Playground
