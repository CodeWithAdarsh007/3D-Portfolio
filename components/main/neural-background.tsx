"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useMemo, useState, Suspense } from "react";
import * as THREE from "three";

const NODE_COUNT = 80;
const MAX_DISTANCE = 3;

// Generate initial node positions
function generateNodes(count: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 30;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
  }
  return positions;
}

// Calculate line segments between nearby nodes
function calculateLines(positions: Float32Array) {
  const lines: number[] = [];
  for (let i = 0; i < positions.length / 3; i++) {
    for (let j = i + 1; j < positions.length / 3; j++) {
      const dx = positions[i * 3] - positions[j * 3];
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < MAX_DISTANCE) {
        lines.push(i, j);
      }
    }
  }
  return new Float32Array(lines);
}

const Node = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      const pulse = Math.sin(time * 2 + position[0] * 0.5) * 0.3 + 1;
      meshRef.current.scale.set(pulse * scale, pulse * scale, pulse * scale);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.15, 8, 8]} />
      <meshBasicMaterial color="#00D9FF" transparent opacity={0.6} />
    </mesh>
  );
};

const Line = ({
  positions,
  indices,
}: {
  positions: Float32Array;
  indices: Float32Array;
}) => {
  const lineRef = useRef<THREE.LineSegments>(null);

  useFrame((state) => {
    if (lineRef.current && lineRef.current.material) {
      const time = state.clock.elapsedTime;
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.08 + Math.sin(time * 1.5) * 0.04;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < indices.length; i += 2) {
      const nodeIndex = indices[i];
      const x = positions[nodeIndex * 3];
      const y = positions[nodeIndex * 3 + 1];
      const z = positions[nodeIndex * 3 + 2];
      points.push(new THREE.Vector3(x, y, z));
    }
    geo.setFromPoints(points);
    return geo;
  }, [positions, indices]);

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#7C5CFF" transparent opacity={0.08} />
    </lineSegments>
  );
};

export const NeuralGrid = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [isMobile, setIsMobile] = useState(false);

  const positions = useMemo(() => generateNodes(NODE_COUNT), []);
  const lineIndices = useMemo(() => calculateLines(positions), [positions]);

  useFrame((state, delta) => {
    if (groupRef.current && !isMobile) {
      groupRef.current.rotation.y += delta * 0.02;

      // Mouse parallax
      if (state.mouse) {
        const targetX = state.mouse.x * 0.3;
        const targetY = state.mouse.y * 0.3;
        groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.008;
        groupRef.current.rotation.z += (targetX - groupRef.current.rotation.z) * 0.008;
      }
    }
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) return null;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {Array.from({ length: NODE_COUNT }).map((_, i) => (
        <Node
          key={i}
          position={[positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]]}
        />
      ))}
      <Line positions={positions} indices={lineIndices} />
    </group>
  );
};

export const NeuralBackground = () => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <div className="w-full h-auto fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-[#05060A] to-violet-500/10" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {!reducedMotion && (
        <Canvas camera={{ position: [0, 0, 20], fov: 45 }} dpr={[1, 1.5]}>
          <Suspense fallback={null}>
            <NeuralGrid />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};
