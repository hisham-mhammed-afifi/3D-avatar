import { Environment, useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import Sayed from "./Sayed";

const Avatar = () => {
  const texture = useTexture("/textures/background-1.jpeg");
  const viewport = useThree((state) => state.viewport);

  return (
    <>
      <mesh>
        <Sayed position={[0, -5.8, 0]} scale={4} rotation={[0.2, 0, 0]} />
        <Environment preset="dawn" />
      </mesh>

      <mesh>
        <planeGeometry args={[viewport.height * 1.2, viewport.height]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </>
  );
};

export default Avatar;
