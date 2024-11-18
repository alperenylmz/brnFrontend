import { useEffect, useRef, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three'; 
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

type VisibleParts = {
  bottom: 'basic' | 'lv1' | 'lv2';
  bracelet: 'basic' | 'lv1' | 'lv2';
  shoes: 'basic' | 'lv1' | 'lv2';
  tiara: 'basic' | 'lv1' | 'lv2';
  top: 'basic' | 'lv1' | 'lv2';
  weapon: 'basic' | 'lv1' | 'lv2';
};

interface ThreeSceneProps {
  width?: number;
  height?: number;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ width = 800, height = 500 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<THREE.Group>(new THREE.Group());
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const [gltf, setGltf] = useState<THREE.Group | null>(null);
  const [visibleParts, setVisibleParts] = useState<VisibleParts>({
    bottom: 'basic',
    bracelet: 'basic',
    shoes: 'basic',
    tiara: 'basic',
    top: 'basic',
    weapon: 'basic'
  });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      50,
      width / height,
      0.1,
      1000
    );
    cameraRef.current = camera;
    camera.position.set(0, 1, 5);
    camera.zoom = 2.3;
    camera.fov = 50;
    camera.updateProjectionMatrix();

     // Lighting
     const light = new THREE.DirectionalLight(0xffffff, 5)
     light.position.set(7, 7, 7).normalize()
     scene.add(light)

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;
    containerRef.current.appendChild(renderer.domElement);

    // OrbitControls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Load GLTF model
    const loader = new GLTFLoader();
    loader.load('/models/gltf/elf.glb', (gltf) => {
      setGltf(gltf.scene);
      gltf.scene.position.y -= 1; // Move the model down on the y-axis
      groupRef.current.add(gltf.scene);
      scene.add(groupRef.current);

      gltf.scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          
          const meshName = mesh.name;
          if (meshName.includes('_basic')) {
            mesh.visible = visibleParts[meshName.split('_')[0] as keyof VisibleParts] === 'basic';
          } else if (meshName.includes('_lv1')) {
            mesh.visible = visibleParts[meshName.split('_')[0] as keyof VisibleParts] === 'lv1';
          } else if (meshName.includes('_lv2')) {
            mesh.visible = visibleParts[meshName.split('_')[0] as keyof VisibleParts] === 'lv2';
          }
         
        }
      });
    });

    // Resize handler
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      controls.dispose();
    };
  }, [width, height]);

  useEffect(() => {
    if (gltf) {
      updateVisibility();
    }
  }, [gltf, visibleParts]);

  const updateVisibility = () => {
    const parts: (keyof VisibleParts)[] = ['bottom', 'bracelet', 'shoes', 'tiara', 'top', 'weapon'];

    parts.forEach((part) => {
      const basic = gltf?.getObjectByName(`${part}_basic`) as THREE.Mesh;
      const lv1 = gltf?.getObjectByName(`${part}_lv1`) as THREE.Mesh;
      const lv2 = gltf?.getObjectByName(`${part}_lv2`) as THREE.Mesh;
      
      if (!basic.visible && !lv1.visible && !lv2.visible) {
        const level = visibleParts[part]; 
        basic.visible = true; 
      }
     else if (basic && lv1 && lv2) {
        const level = visibleParts[part];

        basic.visible = level === 'basic';
        lv1.visible = level === 'lv1';
        lv2.visible = level === 'lv2';
      }
    });
  };

  const handleVisibilityChange = (part: keyof VisibleParts, level: 'basic' | 'lv1' | 'lv2') => {
    setVisibleParts((prev) => {

      let updated :any | undefined={} = { ...prev };
      if (prev[part] === level) {
        updated[part] = 'basic'; // Set visibility to undefined instead of deleting
       
      } else {
        updated[part] = level;
      }

      // Ensure at least one part is visible
      if (Object.values(updated).every(value => value === undefined)) {
        updated[part] = 'basic';
      }

      return updated;
    });
  };

  return (
    <div ref={containerRef} style={{ width: `${width}px`, height: `${height}px`, position: 'relative', backgroundColor: 'transparent' }}>
      <div style={{position:'absolute', paddingTop: '20px'}}>
        {['bottom', 'bracelet', 'shoes', 'tiara', 'top', 'weapon'].map((part) => (
          <div key={part}>
            <span>{part}</span>
            <button style={{ border: '1px solid white', borderRadius: 10, margin: '5px', padding: '5px' }} onClick={() => handleVisibilityChange(part as keyof VisibleParts, 'basic')}>Basic</button>
            <button style={{ border: '1px solid white', borderRadius: 10, margin: '5px', padding: '5px' }} onClick={() => handleVisibilityChange(part as keyof VisibleParts, 'lv1')}>Lv1</button>
            <button style={{ border: '1px solid white', borderRadius: 10, margin: '5px', padding: '5px' }} onClick={() => handleVisibilityChange(part as keyof VisibleParts, 'lv2')}>Lv2</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreeScene;
