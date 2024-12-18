import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import './ThreeDCanvas.css';
import Loading from '../Productos/Loading';
import { BACKEND_URL } from '../configLocalHost'; // Importa la URL desde el archivo config

function Model({ path, rotationSpeed, isAnimating, rotationDirection, ...props }) {
  const { scene, nodes, materials } = useGLTF(path, true);
  const modelRef = useRef();

  useFrame(() => {
    if (isAnimating && modelRef.current) {
      modelRef.current.rotation.y += rotationSpeed * rotationDirection;
    }
  });

  useEffect(() => {
    return () => {
      if (nodes) {
        Object.values(nodes).forEach(node => {
          if (node.dispose) node.dispose();
        });
      }
      if (materials) {
        Object.values(materials).forEach(material => {
          if (material.dispose) material.dispose();
        });
      }
    };
  }, [nodes, materials]);

  return <primitive ref={modelRef} object={scene} {...props} />;
}

function ThreeDCanvas({ 
  modelPath, 
  lightIntensity, 
  setLightIntensity, 
  spotLightIntensity, 
  setSpotLightIntensity, 
  lightPosition = [10, 10, 10], 
  setLightPosition, 
  isAnimating, 
  setIsAnimating, 
  rotationSpeed, 
  setRotationSpeed,
  saveSettings,
  isAdmin
}) {
  const controlsRef = useRef();
  const [modelError, setModelError] = useState(false);
  const [key, setKey] = useState(Date.now());
  const [rotationDirection, setRotationDirection] = useState(1);

  // Estado para mostrar/ocultar controles
  const [showControls, setShowControls] = useState(true);

  const adjustedModelPath = modelPath ? `${BACKEND_URL}/${modelPath.replace(/^\/+/, '')}` : '';

  useEffect(() => {
    if (!modelPath) return;
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/product-settings`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const settings = await response.json();
        const productSettings = settings.find(setting => setting.name === modelPath.split('/').pop().split('.')[0]);
        if (productSettings) {
          if (setLightIntensity) setLightIntensity(productSettings.lightIntensity);
          if (setSpotLightIntensity) setSpotLightIntensity(productSettings.spotLightIntensity);
          if (setLightPosition) setLightPosition(productSettings.lightPosition);
          if (setIsAnimating) setIsAnimating(productSettings.isAnimating);
          if (setRotationSpeed) setRotationSpeed(productSettings.rotationSpeed);
        }
      } catch (error) {
        console.error('Failed to fetch product settings:', error);
      }
    };

    fetchSettings();
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
    setKey(Date.now());
  }, [modelPath, setLightIntensity, setSpotLightIntensity, setLightPosition, setIsAnimating, setRotationSpeed]);

  const handleError = (error) => {
    console.error('Error loading model:', error);
    setModelError(true);
  };

  useEffect(() => {
    if (saveSettings) saveSettings();
  }, [lightIntensity, spotLightIntensity, lightPosition, isAnimating, rotationSpeed, rotationDirection, saveSettings]);

  const isImage = /\.(jpg|png)$/i.test(adjustedModelPath);

  return (
    <div className="product-3d">
      {isAdmin && (
        <button className="toggle-controls-button" onClick={() => setShowControls(!showControls)}>
          {showControls ? '👁️' : '👁️'}
        </button>
      )}
      {isAdmin && showControls && (
        <div className="controls-container">
          <label>
            Light Intensity: 
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={lightIntensity}
              onChange={(e) => setLightIntensity && setLightIntensity(parseFloat(e.target.value))}
            />
          </label>
          <label>
            Spot Light Intensity: 
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={spotLightIntensity}
              onChange={(e) => setSpotLightIntensity && setSpotLightIntensity(parseFloat(e.target.value))}
            />
          </label>
          <label>
            Light X: 
            <input
              type="range"
              min="-20"
              max="20"
              step="0.1"
              value={lightPosition[0]}
              onChange={(e) => setLightPosition && setLightPosition([parseFloat(e.target.value), lightPosition[1], lightPosition[2]])}
            />
          </label>
          <label>
            Light Y: 
            <input
              type="range"
              min="-20"
              max="20"
              step="0.1"
              value={lightPosition[1]}
              onChange={(e) => setLightPosition && setLightPosition([lightPosition[0], parseFloat(e.target.value), lightPosition[2]])}
            />
          </label>
          <label>
            Light Z: 
            <input
              type="range"
              min="-20"
              max="20"
              step="0.1"
              value={lightPosition[2]}
              onChange={(e) => setLightPosition && setLightPosition([lightPosition[0], lightPosition[1], parseFloat(e.target.value)])}
            />
          </label>
          <label>
            Rotation Speed: 
            <input
              type="range"
              min="0"
              max="0.1"
              step="0.001"
              value={rotationSpeed}
              onChange={(e) => setRotationSpeed && setRotationSpeed(parseFloat(e.target.value))}
            />
          </label>
          <div className="rotation-controls">
            <button onClick={() => setRotationDirection(-1)}>&larr;</button>
            <button onClick={() => setIsAnimating && setIsAnimating(!isAnimating)}>
              {isAnimating ? 'Stop' : 'Play'}
            </button>
            <button onClick={() => setRotationDirection(1)}>&rarr;</button>
          </div>
        </div>
      )}
      {isImage ? (
        <img src={adjustedModelPath} alt="Producto" style={{ maxHeight: '100%', maxWidth: '100%' }} />
      ) : (
        <Canvas
          key={key}
          style={{ height: '100%' }}
          camera={{ position: [0, 0, 2], fov: 60, near: 0.1, far: 1000 }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={lightPosition} intensity={lightIntensity} />
          <spotLight position={[5, 5, 5]} intensity={spotLightIntensity} angle={0.3} penumbra={1} castShadow />
          <Suspense fallback={<Html><Loading /></Html>}>
            {!modelError ? (
              adjustedModelPath ? (
                <Model key={adjustedModelPath} path={adjustedModelPath} rotationSpeed={rotationSpeed} isAnimating={isAnimating} rotationDirection={rotationDirection} position={[0, 0, 0]} scale={0.5} onError={handleError} />
              ) : (
                <Html><div>A la espera de mostrar un producto 3D</div></Html>
              )
            ) : (
              <Html><div>Error al cargar el modelo</div></Html>
            )}
          </Suspense>
          <OrbitControls ref={controlsRef} minDistance={0.1} maxDistance={50} maxPolarAngle={Math.PI} minPolarAngle={0} />
        </Canvas>
      )}
    </div>
  );
}

export default ThreeDCanvas;
