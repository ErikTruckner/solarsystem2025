import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function App() {
  function Box(props) {
    // 1. Grab a reference to the mesh so we can rotate it each frame
    const meshRef = useRef();

    // 2. Track two simple bits of state: hovered and clicked (active)
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);

    // 3. Hook into R3F’s render loop. Runs every frame.
    useFrame((state, delta) => {
      meshRef.current.rotation.x += delta;
      meshRef.current.rotation.y += delta;
    });

    return (
      <mesh
        {...props}
        ref={meshRef}
        scale={active ? 1.5 : 1}
        onClick={() => setActive(!active)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={hovered ? "hotpink" : "orange"} />
      </mesh>
    );
  }

  return (
    <>
      <div className="w-screen h-screen">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <Canvas>
          {/* Two boxes side by side */}
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
        </Canvas>
      </div>
    </>
  );
}

export default App;
