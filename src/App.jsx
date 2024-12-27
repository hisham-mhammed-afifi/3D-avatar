import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Avatar from "./components/Avatar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div id="canvas-container">
      <Canvas camera={{ fov: 45, near: 0.1, far: 200, position: [0, 0, 6] }}>
        <Avatar />
      </Canvas>
    </div>
  );
}

export default App;
