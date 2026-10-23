
import { useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'
import './App.css'

function Astronaut() {
  const body = useRef<THREE.Group>(null)

  return (
    <group ref={body} position={[0, 0, 0]}>
      {/* Backpack */}
      <mesh position={[0, 1.05, 0.25]}>
        <boxGeometry args={[0.48, 0.7, 0.28]} />
        <meshStandardMaterial color="#64758b" metalness={0.55} roughness={0.4} />
      </mesh>

      {/* Body */}
      <mesh position={[0, 1.05, 0]}>
        <capsuleGeometry args={[0.36, 0.5, 8, 16]} />
        <meshStandardMaterial color="#e3e9f0" metalness={0.2} roughness={0.55} />
      </mesh>

      {/* Helmet */}
      <mesh position={[0, 1.85, 0]}>
        <sphereGeometry args={[0.32, 32, 24]} />
        <meshStandardMaterial
          color="#dce7f5"
          metalness={0.75}
          roughness={0.18}
        />
      </mesh>

      {/* Dark visor */}
      <mesh position={[0, 1.86, -0.245]} rotation={[0.08, 0, 0]}>
        <sphereGeometry
          args={[0.245, 24, 20, 0, Math.PI * 2, 0, Math.PI * 0.48]}
        />
        <meshStandardMaterial
          color="#10283e"
          metalness={0.85}
          roughness={0.12}
          emissive="#123d59"
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* Arms */}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 0.42, 1.15, 0]}>
          <mesh rotation={[0, 0, side * -0.12]}>
            <capsuleGeometry args={[0.105, 0.48, 6, 10]} />
            <meshStandardMaterial color="#c6d1df" />
          </mesh>
          <mesh position={[0, -0.32, 0]}>
            <sphereGeometry args={[0.12, 12, 12]} />
            <meshStandardMaterial color="#e5a76e" metalness={0.35} />
          </mesh>
        </group>
      ))}

      {/* Legs */}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 0.19, 0.48, 0]}>
          <mesh position={[0, -0.12, 0]}>
            <capsuleGeometry args={[0.14, 0.42, 6, 10]} />
            <meshStandardMaterial color="#b8c6d5" />
          </mesh>
          <mesh position={[0, -0.4, -0.07]}>
            <boxGeometry args={[0.25, 0.14, 0.38]} />
            <meshStandardMaterial color="#39495b" metalness={0.4} />
          </mesh>
        </group>
      ))}

      {/* Suit chest light */}
      <mesh position={[0, 1.15, -0.355]}>
        <boxGeometry args={[0.12, 0.16, 0.025]} />
        <meshBasicMaterial color="#63f2ff" />
      </mesh>
    </group>
  )
}

function Habitat({
  position,
  label,
}: {
  position: [number, number, number]
  label: string
}) {
  return (
    <group position={position}>
      {/* Foundation */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[2.4, 2.7, 0.25, 12]} />
        <meshStandardMaterial color="#6b5150" />
      </mesh>

      {/* Main habitat */}
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[1.5, 1.65, 2.2, 12]} />
        <meshStandardMaterial
          color="#c2cbd5"
          metalness={0.5}
          roughness={0.45}
        />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 2.4, 0]}>
        <sphereGeometry args={[1.48, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#7f96aa" metalness={0.4} roughness={0.4} />
      </mesh>

      {/* Windows */}
      {[-0.8, 0, 0.8].map((x) => (
        <mesh key={x} position={[x, 1.45, -1.51]}>
          <boxGeometry args={[0.34, 0.48, 0.05]} />
          <meshBasicMaterial color="#63e6ff" />
        </mesh>
      ))}

      {/* Entrance */}
      <mesh position={[0, 0.75, -1.68]}>
        <boxGeometry args={[0.7, 1.35, 0.12]} />
        <meshStandardMaterial color="#35465a" metalness={0.65} />
      </mesh>

      {/* Glowing perimeter */}
      <mesh position={[0, 0.28, 0]}>
        <cylinderGeometry args={[2.48, 2.48, 0.035, 32]} />
        <meshBasicMaterial color="#54e9ff" />
      </mesh>

      <pointLight position={[0, 2, 0]} color="#67ddff" intensity={2} distance={7} />

      <mesh position={[0, 3.2, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshBasicMaterial color="#6af5ff" />
      </mesh>

      <group position={[0, 3.65, 0]}>
        <mesh>
          <boxGeometry args={[1.5, 0.06, 0.04]} />
          <meshBasicMaterial color="#65eaff" />
        </mesh>
      </group>

      <group>
        <mesh position={[0, 0.03, 0]}>
          <cylinderGeometry args={[2.9, 2.9, 0.025, 32]} />
          <meshBasicMaterial color="#b6b9c8" wireframe />
        </mesh>
      </group>
    </group>
  )
}

function SolarFarm({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {Array.from({ length: 4 }, (_, i) => (
        <group key={i} position={[i * 2.1, 0, 0]} rotation={[-0.28, 0, 0]}>
          <mesh position={[0, 1.05, 0]}>
            <boxGeometry args={[1.75, 0.08, 1.25]} />
            <meshStandardMaterial color="#273c60" metalness={0.75} roughness={0.25} />
          </mesh>

          {[-0.4, 0, 0.4].map((x) => (
            <mesh key={x} position={[x, 1.1, 0.005]}>
              <boxGeometry args={[0.025, 0.085, 1.24]} />
              <meshBasicMaterial color="#5ab8f5" />
            </mesh>
          ))}

          {[-0.4, 0.4].map((z) => (
            <mesh key={z} position={[0, 1.1, z]}>
              <boxGeometry args={[1.75, 0.085, 0.025]} />
              <meshBasicMaterial color="#5ab8f5" />
            </mesh>
          ))}

          <mesh position={[0, 0.48, 0.1]}>
            <cylinderGeometry args={[0.055, 0.08, 0.95, 8]} />
            <meshStandardMaterial color="#a5b0bf" metalness={0.7} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function CommunicationsTower() {
  return (
    <group position={[7, 0, -5]}>
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.09, 0.18, 3, 8]} />
        <meshStandardMaterial color="#a8b6c7" metalness={0.7} />
      </mesh>

      {[0.6, 1.5, 2.4].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <torusGeometry args={[0.38, 0.035, 8, 24]} />
          <meshBasicMaterial color="#54eaff" />
        </mesh>
      ))}

      <mesh position={[0, 3.15, 0]}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshBasicMaterial color="#ffab72" />
      </mesh>

      <pointLight position={[0, 3.1, 0]} color="#ff8e68" intensity={3} distance={10} />
    </group>
  )
}

function Rocks() {
  const rocks = Array.from({ length: 90 }, (_, i) => {
    const angle = i * 2.399
    const radius = 12 + (i % 9) * 2.4

    return {
      position: [
        Math.cos(angle) * radius,
        0.15 + (i % 4) * 0.08,
        Math.sin(angle) * radius,
      ] as [number, number, number],
      scale: [
        0.35 + (i % 4) * 0.18,
        0.3 + (i % 3) * 0.15,
        0.35 + (i % 5) * 0.12,
      ] as [number, number, number],
      rotation: (i * 0.7) % 3,
    }
  })

  return (
    <group>
      {rocks.map((rock, i) => (
        <mesh
          key={i}
          position={rock.position}
          scale={rock.scale}
          rotation={[rock.rotation, rock.rotation * 0.6, 0]}
          castShadow
        >
          <dodecahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? '#92716a' : '#66585b'}
            roughness={1}
          />
        </mesh>
      ))}
    </group>
  )
}

function Terrain() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.12, 0]} receiveShadow>
        <planeGeometry args={[600, 600, 100, 100]} />
        <meshStandardMaterial color="#986b60" roughness={1} />
      </mesh>

      {/* Distant Martian ridges */}
      {Array.from({ length: 15 }, (_, i) => (
        <mesh
          key={i}
          position={[-65 + i * 9, 2 + (i % 4) * 1.4, -55 - (i % 3) * 5]}
          scale={[8 + (i % 3) * 4, 5 + (i % 4) * 2, 6]}
          rotation={[0, (i % 3) * 0.4, 0]}
        >
          <dodecahedronGeometry args={[1, 2]} />
          <meshStandardMaterial color="#704c50" roughness={1} flatShading />
        </mesh>
      ))}

      {/* Ground details */}
      {Array.from({ length: 100 }, (_, i) => {
        const x = Math.sin(i * 78.2) * 42
        const z = Math.cos(i * 43.7) * 42

        return (
          <mesh key={i} position={[x, -0.03, z]} rotation={[-Math.PI / 2, 0, i]}>
            <ringGeometry args={[0.18, 0.23, 8]} />
            <meshBasicMaterial color="#b68a79" />
          </mesh>
        )
      })}
    </group>
  )
}



function FollowCamera() {
  const { camera, gl } = useThree()
  const player = useRef<THREE.Group>(null)
  const keys = useRef<Record<string, boolean>>({})
  const yaw = useRef(0)
  const pitch = useRef(0.12)
  const verticalVelocity = useRef(0)
  const isGrounded = useRef(true)

  useEffect(() => {
    const canvas = gl.domElement

    const controlledKeys = [
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'Space',
      'ShiftLeft',
      'ShiftRight',
    ]

    const onKeyDown = (event: KeyboardEvent) => {
      if (!controlledKeys.includes(event.code)) return

      event.preventDefault()
      keys.current[event.code] = true
    }

    const onKeyUp = (event: KeyboardEvent) => {
      keys.current[event.code] = false
    }

    const clearKeys = () => {
      keys.current = {}
    }

    const onMouseMove = (event: MouseEvent) => {
      if (document.pointerLockElement !== canvas) return

      yaw.current -= event.movementX * 0.0025

      pitch.current = THREE.MathUtils.clamp(
        pitch.current - event.movementY * 0.0018,
        -0.2,
        0.65,
      )
    }

    const onCanvasClick = () => {
      canvas.focus()

      if (document.pointerLockElement !== canvas) {
        canvas.requestPointerLock()
      }
    }

    canvas.tabIndex = 0
    canvas.style.outline = 'none'

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', clearKeys)
    document.addEventListener('visibilitychange', clearKeys)
    window.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('click', onCanvasClick)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', clearKeys)
      document.removeEventListener('visibilitychange', clearKeys)
      window.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('click', onCanvasClick)
    }
  }, [gl])

  useFrame((_, delta) => {
    const astronaut = player.current
    if (!astronaut) return

    const dt = Math.min(delta, 0.05)

    const forward = new THREE.Vector3(
      -Math.sin(yaw.current),
      0,
      -Math.cos(yaw.current),
    )

    const right = new THREE.Vector3(
      -forward.z,
      0,
      forward.x,
    )

    const movement = new THREE.Vector3()

    if (keys.current.ArrowUp) movement.add(forward)
    if (keys.current.ArrowDown) movement.sub(forward)
    if (keys.current.ArrowRight) movement.add(right)
    if (keys.current.ArrowLeft) movement.sub(right)

    if (movement.lengthSq() > 0) {
      movement.normalize()

      const sprinting =
        keys.current.ShiftLeft || keys.current.ShiftRight

      const speed = sprinting ? 9 : 5

      astronaut.position.addScaledVector(movement, speed * dt)

      astronaut.rotation.y = Math.atan2(
        -movement.x,
        -movement.z,
      )
    }

    // Jumping and gravity
    if (keys.current.Space && isGrounded.current) {
      verticalVelocity.current = 7
      isGrounded.current = false
    }

    verticalVelocity.current -= 18 * dt
    astronaut.position.y += verticalVelocity.current * dt

    if (astronaut.position.y <= 0) {
      astronaut.position.y = 0
      verticalVelocity.current = 0
      isGrounded.current = true
    }

    astronaut.position.x = THREE.MathUtils.clamp(
      astronaut.position.x,
      -80,
      80,
    )

    astronaut.position.z = THREE.MathUtils.clamp(
      astronaut.position.z,
      -80,
      80,
    )

    const distance = 8
    const cameraHeight = 3.8 + pitch.current * 5

    const desiredPosition = new THREE.Vector3(
      astronaut.position.x + Math.sin(yaw.current) * distance,
      astronaut.position.y + cameraHeight,
      astronaut.position.z + Math.cos(yaw.current) * distance,
    )

    camera.position.lerp(
      desiredPosition,
      1 - Math.exp(-5 * dt),
    )

    camera.lookAt(
      astronaut.position.x - Math.sin(yaw.current) * 2,
      astronaut.position.y + 1.4,
      astronaut.position.z - Math.cos(yaw.current) * 2,
    )
  })

  return (
    <group ref={player} position={[0, 0, 4]}>
      <Astronaut />
    </group>
  )
}

function World() {
  return (
    <>
      <color attach="background" args={['#080d20']} />
      <fog attach="fog" args={['#986b60', 90, 240]} />

      <ambientLight intensity={1.2} />
      <hemisphereLight args={['#b7d2ff', '#79544d', 1.5]} />
      <directionalLight
        position={[-20, 35, 15]}
        color="#ffe2c2"
        intensity={3}
        castShadow
      />

      <pointLight position={[0, 5, -8]} color="#55bfff" intensity={30} distance={45} />
      <Stars radius={180} depth={100} count={7000} factor={3} saturation={0.2} fade speed={0.15} />

      <Terrain />

      <Habitat position={[-5, 0, -5]} label="HAB-01" />
      <Habitat position={[-11, 0, -8]} label="HAB-02" />

      <SolarFarm position={[3, 0, -10]} />
      <CommunicationsTower />
      <Rocks />
      <FollowCamera />
    </>
  )
}

export default function App() {
  return (
    <main className="game">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 5, 12], fov: 65, near: 0.1, far: 500 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <World />
      </Canvas>

      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">O</span>
          <div>
            <strong>OUTPOST ZERO</strong>
            <small>MARS COLONIZATION PROGRAM</small>
          </div>
        </div>

        <div className="mission">
          <span className="live-dot" />
          MARS 2049 <span className="muted">/</span> SOL 01 OF 30
        </div>

        <div className="coordinates">
          <span>18.4° N</span>
          <small>ARCADIA PLANITIA</small>
        </div>
      </header>

      <aside className="left-panel">
        <small className="eyebrow">MISSION STATUS</small>
        <h2>Establish<br />the outpost.</h2>
        <p>Secure the base. Restore essential systems. Survive the Martian frontier.</p>

        <div className="objective">
          <span className="objective-number">01</span>
          <div>
            <strong>Reach the habitat</strong>
            <small>Explore your surroundings</small>
          </div>
        </div>

        <div className="objective">
          <span className="objective-number">02</span>
          <div>
            <strong>Inspect the solar farm</strong>
            <small>Locate the power infrastructure</small>
          </div>
        </div>

        <div className="panel-divider" />

        <small className="eyebrow">SUIT TELEMETRY</small>
        <Resource label="OXYGEN" value="98%" percent={98} color="#65eaff" />
        <Resource label="SUIT POWER" value="94%" percent={94} color="#a8a0ff" />
        <Resource label="VITALS" value="100%" percent={100} color="#79e7ae" />
      </aside>

      <aside className="right-panel">
        <div className="status-heading">
          <span className="live-dot" />
          OUTPOST NETWORK
        </div>

        <div className="system">
          <span className="system-icon">⌁</span>
          <div><strong>Life support</strong><small>STANDBY</small></div>
          <i className="status-warning" />
        </div>

        <div className="system">
          <span className="system-icon">ϟ</span>
          <div><strong>Power grid</strong><small>LOW OUTPUT</small></div>
          <i className="status-warning" />
        </div>

        <div className="system">
          <span className="system-icon">⌂</span>
          <div><strong>Habitat</strong><small>PRESSURIZED</small></div>
          <i className="status-good" />
        </div>

        <div className="credits">
          <small>AVAILABLE CREDITS</small>
          <strong><span>◈</span> 600 <small>CR</small></strong>
        </div>
      </aside>

      <div className="location-tag">
        <span className="location-dot" />
        <div>
          <strong>ARCADIA EXPEDITION ZONE</strong>
          <small>SECTOR 01 · SURFACE OPERATIONS</small>
        </div>
      </div>

      <div className="center-reticle">
        <span />
      </div>

      <footer className="bottom-bar">
        <div className="controls">
          <span><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> MOVE</span>
          <span><kbd>SHIFT</kbd> SPRINT</span>
          <span><kbd>MOUSE</kbd> LOOK AROUND</span>
          <span><kbd>ESC</kbd> RELEASE MOUSE</span>
        </div>
        <div className="build-label">OUTPOST ZERO <span>·</span> FIELD BUILD 0.1</div>
      </footer>
    </main>
  )
}

function Resource({
  label,
  value,
  percent,
  color,
}: {
  label: string
  value: string
  percent: number
  color: string
}) {
  return (
    <div className="resource">
      <div className="resource-label">
        <span>{label}</span><strong>{value}</strong>
      </div>
      <div className="resource-track">
        <div
          className="resource-fill"
          style={{ width: `${percent}%`, background: color }}
        />
      </div>
    </div>
  )
}
