import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

const ThreeBackground = () => {
    const mountRef = useRef(null)

    useEffect(() => {
        const mount = mountRef.current
        if (!mount) return

        const w = mount.clientWidth || window.innerWidth
        const h = mount.clientHeight || window.innerHeight

        // ── Scene & Camera ──────────────────────────────────────
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000)
        camera.position.z = 7

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        renderer.setSize(w, h)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setClearColor(0x000000, 0)
        mount.appendChild(renderer.domElement)

        // ── Color palette ───────────────────────────────────────
        const violet = [0.486, 0.227, 0.929]  // #7c3aed
        const cyan   = [0.024, 0.714, 0.831]  // #06b6d4
        const pink   = [0.850, 0.200, 0.650]  // accent pop

        // ── Particles ───────────────────────────────────────────
        const COUNT = 120
        const ptPos = new Float32Array(COUNT * 3)
        const ptCol = new Float32Array(COUNT * 3)
        const ptVel = new Float32Array(COUNT * 3)

        for (let i = 0; i < COUNT; i++) {
            ptPos[i*3]   = (Math.random() - 0.5) * 22
            ptPos[i*3+1] = (Math.random() - 0.5) * 22
            ptPos[i*3+2] = (Math.random() - 0.5) * 10
            ptVel[i*3]   = (Math.random() - 0.5) * 0.003
            ptVel[i*3+1] = (Math.random() - 0.5) * 0.003
            const r = Math.random()
            const c = r > 0.60 ? cyan : r > 0.15 ? violet : pink
            ptCol[i*3]   = c[0]
            ptCol[i*3+1] = c[1]
            ptCol[i*3+2] = c[2]
        }

        const ptGeo = new THREE.BufferGeometry()
        ptGeo.setAttribute('position', new THREE.BufferAttribute(ptPos, 3).setUsage(THREE.DynamicDrawUsage))
        ptGeo.setAttribute('color',    new THREE.BufferAttribute(ptCol, 3))
        const ptMat = new THREE.PointsMaterial({
            size: 0.09, vertexColors: true, transparent: true, opacity: 0.85, sizeAttenuation: true,
        })
        const particles = new THREE.Points(ptGeo, ptMat)
        scene.add(particles)

        // ── Glow Sprites ────────────────────────────────────────
        const spriteTex = (() => {
            const c = document.createElement('canvas')
            c.width = c.height = 64
            const ctx = c.getContext('2d')
            const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
            g.addColorStop(0,    'rgba(255,255,255,1)')
            g.addColorStop(0.25, 'rgba(180,80,255,0.7)')
            g.addColorStop(1,    'rgba(0,0,0,0)')
            ctx.fillStyle = g
            ctx.fillRect(0, 0, 64, 64)
            return new THREE.CanvasTexture(c)
        })()

        const orbDefs = [
            { x:-5, y: 3, z:-3, sc:2.2, col:0x7c3aed, spd:0.60, ph:0.0 },
            { x: 5, y:-2, z:-2, sc:1.8, col:0x06b6d4, spd:0.85, ph:1.0 },
            { x: 0, y: 5, z:-4, sc:1.4, col:0xa855f7, spd:1.10, ph:2.1 },
            { x:-4, y:-4, z: 0, sc:2.0, col:0x06b6d4, spd:0.70, ph:3.5 },
            { x: 4, y: 2, z: 1, sc:1.2, col:0x7c3aed, spd:1.30, ph:4.8 },
            { x:-2, y: 0, z: 2, sc:1.6, col:0xd946ef, spd:0.95, ph:0.7 },
        ]

        const glowOrbs = orbDefs.map(d => {
            const mat = new THREE.SpriteMaterial({
                map: spriteTex,
                color: new THREE.Color(d.col),
                transparent: true,
                opacity: 0.3,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
            })
            const sp = new THREE.Sprite(mat)
            sp.position.set(d.x, d.y, d.z)
            sp.scale.setScalar(d.sc)
            sp.userData = { base: 0.3, spd: d.spd, ph: d.ph, baseSc: d.sc }
            scene.add(sp)
            return sp
        })

        // ── Wireframe Icosahedron (deep bg) ─────────────────────
        const icoGeo   = new THREE.IcosahedronGeometry(5.5, 1)
        const icoEdges = new THREE.EdgesGeometry(icoGeo)
        const icoMat   = new THREE.LineBasicMaterial({
            color: 0x7c3aed, transparent: true, opacity: 0.04,
            blending: THREE.AdditiveBlending,
        })
        const icosahedron = new THREE.LineSegments(icoEdges, icoMat)
        icosahedron.position.set(2, 0, -10)
        scene.add(icosahedron)

        // ── Connecting Lines ────────────────────────────────────
        const MAX_LINES = 220
        const lnPos = new Float32Array(MAX_LINES * 6)
        const lnCol = new Float32Array(MAX_LINES * 6)
        const lnGeo = new THREE.BufferGeometry()
        lnGeo.setAttribute('position', new THREE.BufferAttribute(lnPos, 3).setUsage(THREE.DynamicDrawUsage))
        lnGeo.setAttribute('color',    new THREE.BufferAttribute(lnCol, 3).setUsage(THREE.DynamicDrawUsage))
        const lnMat = new THREE.LineBasicMaterial({
            vertexColors: true, transparent: true, opacity: 0.35,
            blending: THREE.AdditiveBlending, depthWrite: false,
        })
        const lineSegs = new THREE.LineSegments(lnGeo, lnMat)
        scene.add(lineSegs)

        const CONNECT_DIST = 4.2

        const rebuildLines = () => {
            let seg = 0
            const pos = ptGeo.attributes.position.array
            outer: for (let i = 0; i < COUNT; i++) {
                for (let j = i + 1; j < COUNT; j++) {
                    if (seg >= MAX_LINES) break outer
                    const dx = pos[i*3]   - pos[j*3]
                    const dy = pos[i*3+1] - pos[j*3+1]
                    const dz = pos[i*3+2] - pos[j*3+2]
                    const d2 = dx*dx + dy*dy + dz*dz
                    if (d2 < CONNECT_DIST * CONNECT_DIST) {
                        const alpha = (1 - Math.sqrt(d2) / CONNECT_DIST) * 0.7
                        const b = seg * 6
                        lnPos[b]=pos[i*3]; lnPos[b+1]=pos[i*3+1]; lnPos[b+2]=pos[i*3+2]
                        lnPos[b+3]=pos[j*3]; lnPos[b+4]=pos[j*3+1]; lnPos[b+5]=pos[j*3+2]
                        const r  = (ptCol[i*3]   + ptCol[j*3])   / 2 * alpha
                        const g  = (ptCol[i*3+1] + ptCol[j*3+1]) / 2 * alpha
                        const bl = (ptCol[i*3+2] + ptCol[j*3+2]) / 2 * alpha
                        lnCol[b]=r; lnCol[b+1]=g; lnCol[b+2]=bl
                        lnCol[b+3]=r; lnCol[b+4]=g; lnCol[b+5]=bl
                        seg++
                    }
                }
            }
            lnGeo.setDrawRange(0, seg * 2)
            lnGeo.attributes.position.needsUpdate = true
            lnGeo.attributes.color.needsUpdate    = true
        }

        // ── Shooting Star ───────────────────────────────────────
        const streakPos = new Float32Array(6)
        const streakCol = new Float32Array(6)
        // Head: bright; tail: dark (additive blending makes it invisible)
        streakCol[0] = 1; streakCol[1] = 1; streakCol[2] = 1   // head
        streakCol[3] = 0; streakCol[4] = 0; streakCol[5] = 0   // tail
        const streakGeo = new THREE.BufferGeometry()
        streakGeo.setAttribute('position', new THREE.BufferAttribute(streakPos, 3).setUsage(THREE.DynamicDrawUsage))
        streakGeo.setAttribute('color',    new THREE.BufferAttribute(streakCol, 3))
        const streakMat = new THREE.LineBasicMaterial({
            vertexColors: true, transparent: true, opacity: 0,
            blending: THREE.AdditiveBlending, depthWrite: false,
        })
        const shootingStar = new THREE.Line(streakGeo, streakMat)
        scene.add(shootingStar)

        const star = { active: false, x: 0, y: 0, z: 0, vx: 0, vy: 0, life: 0 }
        let nextStarAt = performance.now() + 2500 + Math.random() * 3500

        const updateStar = now => {
            if (!star.active && now > nextStarAt) {
                star.active = true
                star.x  = -13 + Math.random() * 4
                star.y  =   2 + Math.random() * 6
                star.z  = (Math.random() - 0.5) * 3
                star.vx =  0.13 + Math.random() * 0.13
                star.vy = -(0.02 + Math.random() * 0.04)
                star.life = 1.0
            }
            if (!star.active) return
            star.life -= 0.01
            if (star.life <= 0 || star.x > 14) {
                star.active = false
                streakMat.opacity = 0
                nextStarAt = now + 4000 + Math.random() * 6000
                return
            }
            star.x += star.vx
            star.y += star.vy
            // Head
            streakPos[0] = star.x; streakPos[1] = star.y; streakPos[2] = star.z
            // Tail (12 frames behind)
            streakPos[3] = star.x - star.vx * 12
            streakPos[4] = star.y - star.vy * 12
            streakPos[5] = star.z
            streakGeo.attributes.position.needsUpdate = true
            // Smooth fade-in (first 10%) and fade-out (last 30%)
            const fadeIn  = Math.min(1, (1 - star.life) * 10)
            const fadeOut = Math.min(1, star.life / 0.3)
            streakMat.opacity = Math.min(fadeIn, fadeOut) * 0.85
        }

        // ── Mouse Parallax ───────────────────────────────────────
        let targetX = 0, targetY = 0
        const onMouse = e => {
            targetX =  (e.clientX / window.innerWidth  - 0.5) * 2
            targetY = -(e.clientY / window.innerHeight - 0.5) * 2
        }
        window.addEventListener('mousemove', onMouse)

        // ── Resize ────────────────────────────────────────────────
        const onResize = () => {
            camera.aspect = mount.clientWidth / mount.clientHeight
            camera.updateProjectionMatrix()
            renderer.setSize(mount.clientWidth, mount.clientHeight)
        }
        window.addEventListener('resize', onResize)

        // ── Animation Loop ────────────────────────────────────────
        let frame = 0, rafId
        const animate = () => {
            rafId = requestAnimationFrame(animate)
            frame++
            const t = frame * 0.01
            const now = performance.now()

            // Drift particles
            const pos = ptGeo.attributes.position.array
            for (let i = 0; i < COUNT; i++) {
                pos[i*3]   += ptVel[i*3]
                pos[i*3+1] += ptVel[i*3+1]
                if (pos[i*3]   >  12) pos[i*3]   = -12
                if (pos[i*3]   < -12) pos[i*3]   =  12
                if (pos[i*3+1] >  12) pos[i*3+1] = -12
                if (pos[i*3+1] < -12) pos[i*3+1] =  12
            }
            ptGeo.attributes.position.needsUpdate = true

            // Slow rotation
            particles.rotation.y  += 0.0003
            particles.rotation.x  += 0.0001
            lineSegs.rotation.copy(particles.rotation)

            // Pulse glow orbs
            glowOrbs.forEach(orb => {
                const { base, spd, ph, baseSc } = orb.userData
                orb.material.opacity = base + Math.sin(t * spd + ph) * 0.12
                orb.scale.setScalar(baseSc + Math.sin(t * spd * 0.5 + ph + 1) * 0.08)
            })

            // Rotate icosahedron
            icosahedron.rotation.y += 0.0008
            icosahedron.rotation.x += 0.0004

            // Shooting star
            updateStar(now)

            // Smooth camera parallax
            camera.position.x += (targetX * 1.0 - camera.position.x) * 0.02
            camera.position.y += (targetY * 1.0 - camera.position.y) * 0.02
            camera.lookAt(scene.position)

            // Rebuild lines every 2nd frame
            if (frame % 2 === 0) rebuildLines()

            renderer.render(scene, camera)
        }
        animate()

        // ── Cleanup ───────────────────────────────────────────────
        return () => {
            cancelAnimationFrame(rafId)
            window.removeEventListener('mousemove', onMouse)
            window.removeEventListener('resize', onResize)
            if (mount?.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
            ptGeo.dispose(); ptMat.dispose()
            lnGeo.dispose(); lnMat.dispose()
            icoEdges.dispose(); icoGeo.dispose(); icoMat.dispose()
            streakGeo.dispose(); streakMat.dispose()
            spriteTex.dispose()
            glowOrbs.forEach(o => o.material.dispose())
            renderer.dispose()
        }
    }, [])

    return (
        <div
            ref={mountRef}
            className='absolute inset-0 pointer-events-none'
            style={{ zIndex: 0, willChange: 'transform' }}
        />
    )
}

export default ThreeBackground
