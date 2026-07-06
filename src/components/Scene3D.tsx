import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

const ROSE_GOLD = "#d4a574";
const CHAMPAGNE = "#e6c79c";
const DEEP_ROSE = "#a85d4a";

function useScrollY() {
  const ref = useRef({ y: 0 });
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      ref.current.y = window.scrollY;
    }, { passive: true });
  }
  return ref;
}

function Lipstick({ position, scrollRef }: { position: [number, number, number]; scrollRef: any }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const s = scrollRef.current.y * 0.002;
    group.current.rotation.y = state.clock.elapsedTime * 0.3 + s;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.2 + s * 0.5;
    group.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.2 - s * 0.3;
  });
  return (
    <group ref={group} position={position}>
      {/* Bullet */}
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.28, 0.32, 0.9, 32]} />
        <meshPhysicalMaterial color={DEEP_ROSE} roughness={0.25} clearcoat={1} clearcoatRoughness={0.1} />
      </mesh>
      <mesh position={[0, 1.7, 0]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.28, 0.45, 32]} />
        <meshPhysicalMaterial color={DEEP_ROSE} roughness={0.2} clearcoat={1} />
      </mesh>
      {/* Tube */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 1.1, 32]} />
        <meshPhysicalMaterial color={ROSE_GOLD} metalness={1} roughness={0.15} />
      </mesh>
      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.25, 32]} />
        <meshPhysicalMaterial color={CHAMPAGNE} metalness={1} roughness={0.2} />
      </mesh>
    </group>
  );
}

function Mascara({ position, scrollRef }: { position: [number, number, number]; scrollRef: any }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const s = scrollRef.current.y * 0.0025;
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.3 - s;
    group.current.rotation.y = state.clock.elapsedTime * 0.2;
    group.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * 0.8) * 0.25 - s * 0.4;
  });
  return (
    <group ref={group} position={position} rotation={[0, 0, 0.4]}>
      {/* Cap */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.9, 32]} />
        <meshPhysicalMaterial color={ROSE_GOLD} metalness={1} roughness={0.2} />
      </mesh>
      {/* Body */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.25, 0.3, 1.4, 32]} />
        <meshPhysicalMaterial color="#1a0f0a" metalness={0.4} roughness={0.3} />
      </mesh>
      {/* Bottom cap */}
      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[0.32, 0.3, 0.15, 32]} />
        <meshPhysicalMaterial color={CHAMPAGNE} metalness={1} roughness={0.25} />
      </mesh>
    </group>
  );
}

function CompactPowder({ position, scrollRef }: { position: [number, number, number]; scrollRef: any }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const s = scrollRef.current.y * 0.002;
    group.current.rotation.x = state.clock.elapsedTime * 0.2 + s * 0.5;
    group.current.rotation.y = state.clock.elapsedTime * 0.35;
    group.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6) * 0.3 - s * 0.5;
  });
  return (
    <group ref={group} position={position}>
      <mesh>
        <cylinderGeometry args={[0.85, 0.85, 0.18, 64]} />
        <meshPhysicalMaterial color={ROSE_GOLD} metalness={1} roughness={0.15} />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.75, 0.75, 0.05, 64]} />
        <meshPhysicalMaterial color={CHAMPAGNE} metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.85, 0.85, 0.05, 64]} />
        <meshPhysicalMaterial color={CHAMPAGNE} metalness={1} roughness={0.2} />
      </mesh>
    </group>
  );
}

function FloatingDiamond({ position, scrollRef }: { position: [number, number, number]; scrollRef: any }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const s = scrollRef.current.y * 0.003;
    ref.current.rotation.x = state.clock.elapsedTime * 0.4 + s;
    ref.current.rotation.y = state.clock.elapsedTime * 0.5;
    ref.current.position.y = position[1] - s * 0.6;
  });
  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[0.35, 0]} />
      <MeshTransmissionMaterial
        color={CHAMPAGNE}
        thickness={0.3}
        roughness={0.05}
        transmission={1}
        ior={1.5}
        chromaticAberration={0.5}
      />
    </mesh>
  );
}

export default function Scene3D() {
  const scrollRef = useScrollY();
  const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches;
  const s = isMobile ? 0.55 : 1;
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, isMobile ? 7.5 : 6], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={2} color={ROSE_GOLD} />
        <pointLight position={[-5, -3, 3]} intensity={1.5} color={CHAMPAGNE} />
        <spotLight position={[0, 10, 0]} intensity={1} color="#fff" />

        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
          <group scale={s}><Lipstick position={[-3.5, 1.5, 0]} scrollRef={scrollRef} /></group>
        </Float>
        <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1}>
          <group scale={s}><Mascara position={[3.5, 0.5, -1]} scrollRef={scrollRef} /></group>
        </Float>
        <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
          <group scale={s}><CompactPowder position={[-3, -2, 1]} scrollRef={scrollRef} /></group>
        </Float>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.9}>
          <group scale={s}><Lipstick position={[3, -2.5, 0]} scrollRef={scrollRef} /></group>
        </Float>
        <Float speed={1.3} rotationIntensity={0.4} floatIntensity={0.7}>
          <group scale={s}><CompactPowder position={[3.8, 2.5, -2]} scrollRef={scrollRef} /></group>
        </Float>

        <group scale={s}><FloatingDiamond position={[-2, 2.8, 1]} scrollRef={scrollRef} /></group>
        <group scale={s}><FloatingDiamond position={[2.3, -1, 1.5]} scrollRef={scrollRef} /></group>
        <group scale={s}><FloatingDiamond position={[0, 0, -2]} scrollRef={scrollRef} /></group>

        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
}

