import React, { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import {
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Sun,
  Layers,
  Upload,
  Play,
  Pause,
  Box,
  Eye,
  Sparkles,
  Info,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'

interface BlenderShowroomViewerProps {
  className?: string
  initialModelUrl?: string
}

export const BlenderShowroomViewer: React.FC<BlenderShowroomViewerProps> = ({
  className = '',
  initialModelUrl = '/models/showroom.glb'
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const mixerRef = useRef<THREE.AnimationMixer | null>(null)
  const clockRef = useRef<THREE.Clock>(new THREE.Clock())
  const loadedModelRef = useRef<THREE.Group | null>(null)
  const defaultExhibitRef = useRef<THREE.Group | null>(null)
  const lightsRef = useRef<{
    ambient: THREE.AmbientLight
    mainSpot: THREE.SpotLight
    fillLight: THREE.DirectionalLight
    pedestalLight: THREE.PointLight
  } | null>(null)

  // UI State
  const [modelName, setModelName] = useState<string>('Heritage Exhibition Pavilion')
  const [isCustomModelLoaded, setIsCustomModelLoaded] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [loadingProgress, setLoadingProgress] = useState<number>(0)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true)
  const [isWireframe, setIsWireframe] = useState<boolean>(false)
  const [lightingPreset, setLightingPreset] = useState<'museum' | 'studio' | 'dramatic'>('museum')
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
  const [isDraggingFile, setIsDraggingFile] = useState<boolean>(false)
  const [modelStats, setModelStats] = useState<{ meshes: number; triangles: number } | null>(null)
  const [hasAnimations, setHasAnimations] = useState<boolean>(false)
  const [isPlayingAnimation, setIsPlayingAnimation] = useState<boolean>(true)

  // Update lighting preset in real time
  const applyLightingPreset = useCallback((preset: 'museum' | 'studio' | 'dramatic') => {
    if (!lightsRef.current) return
    const { ambient, mainSpot, fillLight, pedestalLight } = lightsRef.current

    if (preset === 'museum') {
      ambient.intensity = 0.8
      ambient.color.setHex(0xffebd6) // warm terracotta ambient
      mainSpot.intensity = 3.2
      mainSpot.color.setHex(0xfff3e0)
      fillLight.intensity = 1.2
      fillLight.color.setHex(0xd4a373)
      pedestalLight.intensity = 2.0
      pedestalLight.color.setHex(0xb85c38)
    } else if (preset === 'studio') {
      ambient.intensity = 1.2
      ambient.color.setHex(0xffffff) // crisp neutral white
      mainSpot.intensity = 2.8
      mainSpot.color.setHex(0xffffff)
      fillLight.intensity = 2.0
      fillLight.color.setHex(0xf0f4f8)
      pedestalLight.intensity = 1.0
      pedestalLight.color.setHex(0xffffff)
    } else {
      // dramatic night gallery
      ambient.intensity = 0.35
      ambient.color.setHex(0x1a242f) // deep moody blue
      mainSpot.intensity = 4.5
      mainSpot.color.setHex(0xffcaa0) // golden spotlight
      fillLight.intensity = 0.5
      fillLight.color.setHex(0x38bdf8)
      pedestalLight.intensity = 2.8
      pedestalLight.color.setHex(0xe07a5f)
    }
  }, [])

  // Create built-in procedural 3D showroom exhibit
  const createProceduralShowroom = useCallback((): THREE.Group => {
    const group = new THREE.Group()
    group.name = 'ProceduralHeritageShowroom'

    // 1. Exhibition Platform / Plinth
    const plinthGeo = new THREE.CylinderGeometry(3.2, 3.5, 0.4, 48)
    const plinthMat = new THREE.MeshStandardMaterial({
      color: 0x232724,
      roughness: 0.35,
      metalness: 0.15
    })
    const plinth = new THREE.Mesh(plinthGeo, plinthMat)
    plinth.position.y = 0.2
    plinth.receiveShadow = true
    group.add(plinth)

    // Inner bronze inlay ring
    const ringGeo = new THREE.TorusGeometry(3.0, 0.04, 16, 64)
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xd4a373,
      metalness: 0.8,
      roughness: 0.2
    })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 2
    ring.position.y = 0.41
    group.add(ring)

    // 2. Central Display Pedestal
    const pedestalGeo = new THREE.CylinderGeometry(1.0, 1.2, 1.1, 32)
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x1d211e,
      roughness: 0.4,
      metalness: 0.25
    })
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat)
    pedestal.position.y = 0.95
    pedestal.castShadow = true
    pedestal.receiveShadow = true
    group.add(pedestal)

    // 3. Central Heritage Craft Sculpture (Dhokra/Konark inspired geometric centerpiece)
    const centerpieceGroup = new THREE.Group()
    centerpieceGroup.position.y = 1.6

    // Sacred Konark Chakra Disc
    const chakraGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.08, 48)
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xb85c38,
      metalness: 0.85,
      roughness: 0.3
    })
    const chakra = new THREE.Mesh(chakraGeo, brassMat)
    chakra.rotation.x = Math.PI / 2
    chakra.position.y = 0.7
    chakra.castShadow = true
    centerpieceGroup.add(chakra)

    // Spokes of Konark Wheel
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4
      const spokeGeo = new THREE.BoxGeometry(0.04, 1.4, 0.06)
      const spoke = new THREE.Mesh(spokeGeo, brassMat)
      spoke.position.y = 0.7
      spoke.rotation.z = angle
      spoke.castShadow = true
      centerpieceGroup.add(spoke)
    }

    // Outer Chakra Rim
    const rimGeo = new THREE.TorusGeometry(0.75, 0.05, 16, 48)
    const rim = new THREE.Mesh(rimGeo, brassMat)
    rim.position.y = 0.7
    centerpieceGroup.add(rim)

    // Base support bracket
    const bracketGeo = new THREE.BoxGeometry(0.3, 0.6, 0.2)
    const bracket = new THREE.Mesh(bracketGeo, brassMat)
    bracket.position.y = 0.2
    bracket.castShadow = true
    centerpieceGroup.add(bracket)

    group.add(centerpieceGroup)

    // 4. Four Architectural Heritage Gallery Pillars
    const pillarPositions = [
      [-3.2, 0, -3.2],
      [3.2, 0, -3.2],
      [-3.2, 0, 3.2],
      [3.2, 0, 3.2]
    ]

    pillarPositions.forEach(([x, y, z]) => {
      const pillarGroup = new THREE.Group()
      pillarGroup.position.set(x, y, z)

      // Column Shaft
      const shaftGeo = new THREE.CylinderGeometry(0.25, 0.3, 3.8, 24)
      const shaftMat = new THREE.MeshStandardMaterial({
        color: 0x303632,
        roughness: 0.6,
        metalness: 0.1
      })
      const shaft = new THREE.Mesh(shaftGeo, shaftMat)
      shaft.position.y = 1.9
      shaft.castShadow = true
      shaft.receiveShadow = true
      pillarGroup.add(shaft)

      // Column Capital & Base
      const capGeo = new THREE.BoxGeometry(0.7, 0.2, 0.7)
      const cap = new THREE.Mesh(capGeo, shaftMat)
      cap.position.y = 3.8
      pillarGroup.add(cap)

      const baseGeo = new THREE.BoxGeometry(0.8, 0.2, 0.8)
      const base = new THREE.Mesh(baseGeo, shaftMat)
      base.position.y = 0.1
      pillarGroup.add(base)

      // Pillar Accent Light
      const accentLight = new THREE.PointLight(0xd4a373, 0.8, 4)
      accentLight.position.set(0, 3.6, 0)
      pillarGroup.add(accentLight)

      group.add(pillarGroup)
    })

    return group
  }, [])

  // Process a loaded GLTF scene (from Blender or URL)
  const processLoadedGltf = useCallback((gltf: any, name: string) => {
    if (!sceneRef.current || !controlsRef.current || !cameraRef.current) return

    // Remove existing custom model or default exhibit
    if (loadedModelRef.current) {
      sceneRef.current.remove(loadedModelRef.current)
      loadedModelRef.current = null
    }
    if (defaultExhibitRef.current) {
      defaultExhibitRef.current.visible = false
    }

    const model = gltf.scene || gltf.scenes[0]
    let meshCount = 0
    let triCount = 0

    // Traverse and optimize meshes, materials, and shadows
    model.traverse((child: any) => {
      if (child.isMesh) {
        meshCount++
        if (child.geometry) {
          const count = child.geometry.index
            ? child.geometry.index.count / 3
            : child.geometry.attributes.position?.count / 3 || 0
          triCount += Math.round(count)
        }
        child.castShadow = true
        child.receiveShadow = true

        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat: any) => {
              mat.side = THREE.DoubleSide
              mat.roughness = Math.min(0.9, mat.roughness ?? 0.5)
            })
          } else {
            child.material.side = THREE.DoubleSide
            child.material.roughness = Math.min(0.9, child.material.roughness ?? 0.5)
          }
        }
      }
    })

    // Compute bounding box to center model and ground on floor
    const bbox = new THREE.Box3().setFromObject(model)
    const center = new THREE.Vector3()
    const size = new THREE.Vector3()
    bbox.getCenter(center)
    bbox.getSize(size)

    const maxDim = Math.max(size.x, size.y, size.z) || 1
    // Center model at origin
    model.position.x -= center.x
    model.position.z -= center.z
    model.position.y -= bbox.min.y // place directly on ground plane

    // Setup animations if present in Blender export
    if (gltf.animations && gltf.animations.length > 0) {
      const mixer = new THREE.AnimationMixer(model)
      gltf.animations.forEach((clip: any) => {
        mixer.clipAction(clip).play()
      })
      mixerRef.current = mixer
      setHasAnimations(true)
      setIsPlayingAnimation(true)
    } else {
      mixerRef.current = null
      setHasAnimations(false)
    }

    // Adjust camera distance to frame model comfortably
    const targetDistance = Math.max(3.5, maxDim * 1.8)
    cameraRef.current.position.set(targetDistance * 0.8, targetDistance * 0.5, targetDistance * 0.9)
    cameraRef.current.lookAt(0, size.y * 0.4, 0)
    controlsRef.current.target.set(0, size.y * 0.35, 0)
    controlsRef.current.update()

    sceneRef.current.add(model)
    loadedModelRef.current = model

    setModelName(name)
    setIsCustomModelLoaded(true)
    setModelStats({ meshes: meshCount, triangles: triCount })
    setIsLoading(false)
    setErrorMessage(null)
  }, [])

  // Load a model from File object (via input or drag-and-drop)
  const loadModelFromFile = useCallback((file: File) => {
    if (!file) return
    const ext = file.name.split('.').pop()?.toLowerCase()
    if (ext !== 'glb' && ext !== 'gltf') {
      setErrorMessage('Please select a Blender export file in .glb or .gltf format.')
      return
    }

    setIsLoading(true)
    setLoadingProgress(10)
    setErrorMessage(null)

    const reader = new FileReader()
    reader.onload = (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer
      if (!arrayBuffer) {
        setIsLoading(false)
        setErrorMessage('Failed to read model file.')
        return
      }

      const loader = new GLTFLoader()
      loader.parse(
        arrayBuffer,
        '',
        (gltf) => {
          processLoadedGltf(gltf, file.name)
        },
        (error) => {
          console.error('[BlenderShowroomViewer] GLTF parse error:', error)
          setIsLoading(false)
          setErrorMessage('Could not load Blender model. Please ensure the file was exported as valid glTF/GLB.')
        }
      )
    }

    reader.onerror = () => {
      setIsLoading(false)
      setErrorMessage('Error reading local file.')
    }

    reader.readAsArrayBuffer(file)
  }, [processLoadedGltf])

  // Load a model from public URL (e.g. /models/showroom.glb)
  const loadModelFromUrl = useCallback((url: string) => {
    setIsLoading(true)
    setLoadingProgress(15)
    setErrorMessage(null)

    const loader = new GLTFLoader()
    loader.load(
      url,
      (gltf) => {
        const name = url.split('/').pop() || 'Blender Showroom'
        processLoadedGltf(gltf, name)
      },
      (xhr) => {
        if (xhr.total > 0) {
          setLoadingProgress(Math.round((xhr.loaded / xhr.total) * 100))
        }
      },
      (error) => {
        // If file not found in public/models, gracefully keep the interactive procedural showroom
        console.info(`[BlenderShowroomViewer] Note: Initial model at ${url} not found. Rendering default heritage exhibition pavilion.`)
        setIsLoading(false)
        if (defaultExhibitRef.current) {
          defaultExhibitRef.current.visible = true
        }
      }
    )
  }, [processLoadedGltf])

  // Initialize Three.js Scene, Camera, Controls, Lights, Grid
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const width = container.clientWidth
    const height = container.clientHeight

    // 1. Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x131614)
    scene.fog = new THREE.FogExp2(0x131614, 0.035)
    sceneRef.current = scene

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.set(4.5, 2.8, 5.5)
    cameraRef.current = camera

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    rendererRef.current = renderer

    container.appendChild(renderer.domElement)

    // 4. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.maxPolarAngle = Math.PI / 2 + 0.05 // prevent going beneath floor
    controls.minDistance = 1.5
    controls.maxDistance = 25
    controls.target.set(0, 1.2, 0)
    controls.autoRotate = isAutoRotating
    controls.autoRotateSpeed = 0.8
    controlsRef.current = controls

    // 5. Studio & Museum Lights
    const ambientLight = new THREE.AmbientLight(0xffebd6, 0.8)
    scene.add(ambientLight)

    const mainSpot = new THREE.SpotLight(0xfff3e0, 3.2, 20, Math.PI / 4, 0.35, 1)
    mainSpot.position.set(4, 7, 4)
    mainSpot.castShadow = true
    mainSpot.shadow.mapSize.width = 2048
    mainSpot.shadow.mapSize.height = 2048
    mainSpot.shadow.bias = -0.0001
    scene.add(mainSpot)

    const fillLight = new THREE.DirectionalLight(0xd4a373, 1.2)
    fillLight.position.set(-5, 4, -4)
    scene.add(fillLight)

    const pedestalLight = new THREE.PointLight(0xb85c38, 2.0, 8)
    pedestalLight.position.set(0, 0.2, 0)
    scene.add(pedestalLight)

    lightsRef.current = {
      ambient: ambientLight,
      mainSpot,
      fillLight,
      pedestalLight
    }

    // 6. Polished Exhibition Gallery Floor with Circular Grid
    const floorGeo = new THREE.PlaneGeometry(35, 35)
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x141815,
      roughness: 0.25,
      metalness: 0.2
    })
    const floor = new THREE.Mesh(floorGeo, floorMat)
    floor.rotation.x = -Math.PI / 2
    floor.position.y = 0
    floor.receiveShadow = true
    scene.add(floor)

    // Fine architectural grid overlay on floor
    const grid = new THREE.GridHelper(24, 24, 0xb85c38, 0x2b332d)
    grid.position.y = 0.01
    scene.add(grid)

    // 7. Add Procedural Heritage Showroom as default display
    const proceduralShowroom = createProceduralShowroom()
    scene.add(proceduralShowroom)
    defaultExhibitRef.current = proceduralShowroom

    // 8. Try loading /models/showroom.glb if present
    loadModelFromUrl(initialModelUrl)

    // 9. Resize Listener
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return
      const w = container.clientWidth
      const h = container.clientHeight
      cameraRef.current.aspect = w / h
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    // 10. Animation Render Loop
    let animationFrameId: number
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const delta = clockRef.current.getDelta()
      if (mixerRef.current && isPlayingAnimation) {
        mixerRef.current.update(delta)
      }

      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      controls.dispose()
      renderer.dispose()
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [createProceduralShowroom, initialModelUrl, loadModelFromUrl])

  // Sync auto-rotation state
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isAutoRotating
    }
  }, [isAutoRotating])

  // Sync wireframe state
  useEffect(() => {
    const targetGroup = loadedModelRef.current || defaultExhibitRef.current
    if (!targetGroup) return

    targetGroup.traverse((child: any) => {
      if (child.isMesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m: any) => {
            m.wireframe = isWireframe
          })
        } else {
          child.material.wireframe = isWireframe
        }
      }
    })
  }, [isWireframe])

  // Drag and Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingFile(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingFile(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingFile(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      loadModelFromFile(e.dataTransfer.files[0])
    }
  }

  // File input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      loadModelFromFile(e.target.files[0])
    }
  }

  // Reset Camera View
  const handleResetCamera = () => {
    if (!cameraRef.current || !controlsRef.current) return
    cameraRef.current.position.set(4.5, 2.8, 5.5)
    controlsRef.current.target.set(0, 1.2, 0)
    controlsRef.current.update()
  }

  // Toggle Fullscreen
  const handleToggleFullscreen = () => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {})
      setIsFullscreen(true)
    } else {
      document.exitFullscreen().catch(() => {})
      setIsFullscreen(false)
    }
  }

  return (
    <div
      ref={containerRef}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative w-full h-[calc(100vh-140px)] min-h-[640px] max-h-[920px] bg-[#121513] rounded-3xl overflow-hidden border border-[#78816A]/30 shadow-2xl select-none flex flex-col justify-between ${className}`}
    >
      {/* Hidden File Input for Blender Model (.glb / .gltf) */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".glb,.gltf"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Top Overlay Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        
        {/* Left: Model Title & Status Badge */}
        <div className="flex items-center gap-2.5 pointer-events-auto">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B85C38] animate-pulse" />
            <span className="font-serif font-bold text-xs sm:text-sm tracking-wide text-[#F8F5EF]">
              {modelName}
            </span>
            {isCustomModelLoaded ? (
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/40 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Blender Model Active
              </span>
            ) : (
              <span className="text-[10px] font-semibold text-[#D4A373] bg-[#244C3A]/70 px-2 py-0.5 rounded-full border border-[#78816A]/40">
                Heritage 3D Pavilion
              </span>
            )}
          </div>

          {modelStats && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[11px] text-[#E8DCCB]">
              <span>{modelStats.meshes} Meshes</span>
              <span className="text-white/30">•</span>
              <span>{(modelStats.triangles / 1000).toFixed(1)}k Polygons</span>
            </div>
          )}
        </div>

        {/* Right: Lighting, Controls & Upload Button */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Load Blender Model Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#B85C38] hover:bg-[#9E4928] text-white text-xs font-semibold shadow-lg transition-all hover:scale-103"
            title="Upload your 3D model exported from Blender (.glb / .gltf)"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Load Blender 3D Model</span>
          </button>

          {/* Lighting Mode Selector */}
          <button
            onClick={() => {
              const next = lightingPreset === 'museum' ? 'studio' : lightingPreset === 'studio' ? 'dramatic' : 'museum'
              setLightingPreset(next)
              applyLightingPreset(next)
            }}
            className="p-2 rounded-xl bg-black/60 backdrop-blur-md hover:bg-black/80 text-white/90 border border-white/15 text-xs flex items-center gap-1.5 transition-colors"
            title={`Lighting: ${lightingPreset}`}
          >
            <Sun className="w-3.5 h-3.5 text-[#D4A373]" />
            <span className="hidden sm:inline capitalize text-[11px] font-medium">{lightingPreset}</span>
          </button>

          {/* Wireframe Toggle */}
          <button
            onClick={() => setIsWireframe(!isWireframe)}
            className={`p-2 rounded-xl backdrop-blur-md border text-xs transition-colors ${
              isWireframe
                ? 'bg-emerald-600/80 border-emerald-400 text-white'
                : 'bg-black/60 border-white/15 text-white/80 hover:text-white'
            }`}
            title="Toggle Wireframe Mesh"
          >
            <Layers className="w-3.5 h-3.5" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={handleToggleFullscreen}
            className="p-2 rounded-xl bg-black/60 backdrop-blur-md hover:bg-black/80 text-white/90 border border-white/15 transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Drag & Drop Overlay */}
      {isDraggingFile && (
        <div className="absolute inset-0 z-40 bg-[#B85C38]/85 backdrop-blur-md border-4 border-dashed border-white/80 rounded-3xl flex flex-col items-center justify-center p-8 text-white animate-fade-in pointer-events-none">
          <Upload className="w-16 h-16 mb-4 animate-bounce" />
          <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-2">Drop Your Blender Model Here</h3>
          <p className="text-sm text-white/90 max-w-md text-center">
            Drop your exported .glb or .gltf file directly into the 3D showroom window to load it immediately.
          </p>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-30 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center text-white p-6">
          <div className="w-12 h-12 rounded-full border-3 border-[#B85C38] border-t-transparent animate-spin mb-4" />
          <h4 className="font-serif text-lg font-bold">Rendering 3D Showroom Model...</h4>
          <p className="text-xs text-[#E8DCCB]/80 mt-1">Parsing geometry, textures, and exhibition lighting</p>
        </div>
      )}

      {/* Error Alert */}
      {errorMessage && (
        <div className="absolute top-20 inset-x-6 sm:inset-x-auto sm:right-6 z-30 max-w-md bg-rose-950/90 border border-rose-500/50 backdrop-blur-md rounded-2xl p-4 text-white text-xs flex items-start gap-3 shadow-xl">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold block text-rose-200">Notice</span>
            <p className="text-rose-100/90 mt-0.5 leading-relaxed">{errorMessage}</p>
          </div>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-white/60 hover:text-white text-xs font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Bottom Interactive Control Toolbar */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        
        {/* Left: Camera & Playback Tools */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 pointer-events-auto">
          {/* Auto Rotate Orbit */}
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors ${
              isAutoRotating
                ? 'bg-[#B85C38] text-white shadow-xs'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
            title="Auto-rotate 360°"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isAutoRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            <span className="hidden sm:inline">360° Orbit</span>
          </button>

          {/* Reset Camera */}
          <button
            onClick={handleResetCamera}
            className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            title="Reset Camera View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Animation Play/Pause (if model has animations) */}
          {hasAnimations && (
            <button
              onClick={() => setIsPlayingAnimation(!isPlayingAnimation)}
              className="px-2.5 py-1.5 rounded-xl text-xs text-white/90 hover:bg-white/10 flex items-center gap-1 transition-colors"
              title="Play/Pause Blender Animation"
            >
              {isPlayingAnimation ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
              <span className="hidden sm:inline">{isPlayingAnimation ? 'Pause Anim' : 'Play Anim'}</span>
            </button>
          )}
        </div>

        {/* Center / Right: Interaction Guide */}
        <div className="hidden md:flex items-center gap-4 px-4 py-2 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 text-[11px] text-[#E8DCCB] pointer-events-auto">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#B85C38]" />
            <span>Left-click + Drag: <strong>Orbit 360°</strong></span>
          </span>
          <span className="text-white/30">•</span>
          <span>Right-click + Drag: <strong>Pan</strong></span>
          <span className="text-white/30">•</span>
          <span>Scroll: <strong>Zoom In/Out</strong></span>
          <span className="text-white/30">•</span>
          <span className="text-[#D4A373]">Drag & Drop your <strong>.glb</strong> file anytime</span>
        </div>

      </div>

    </div>
  )
}
