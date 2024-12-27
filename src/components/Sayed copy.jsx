import React, { useRef, useState, useEffect } from "react";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const IDLE = "M_Standing_Idle_001";
const TALKING = "M_Talking_Variations_001";
const WAVING = "Waving";

const visemeMapping = {
  A: "viseme_aa",
  B: "viseme_PP",
  C: "viseme_CH",
  D: "viseme_DD",
  E: "viseme_E",
  F: "viseme_FF",
  G: "viseme_kk",
  H: "viseme_S",
  I: "viseme_I",
  J: "viseme_CH",
  K: "viseme_kk",
  L: "viseme_RR",
  M: "viseme_PP",
  N: "viseme_nn",
  O: "viseme_O",
  P: "viseme_PP",
  Q: "viseme_kk",
  R: "viseme_RR",
  S: "viseme_SS",
  T: "viseme_TH",
  U: "viseme_U",
  V: "viseme_FF",
  W: "viseme_O",
  X: "viseme_SS",
  Y: "viseme_U",
  Z: "viseme_SS",
};

export default function Sayed(props) {
  const pickRandom = (obj) => {
    const keys = Object.keys(obj);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return obj[randomKey];
  };

  const { nodes, materials } = useGLTF("models/Sayed/Sayed.glb");
  const { animations: idle } = useGLTF(`/models/Sayed/M_Standing_Idle_001.glb`);
  const { animations: talking } = useGLTF(
    `/models/Sayed/M_Talking_Variations_001.glb`
  );
  const { animations: waving } = useFBX("/models/Sayed/Waving.fbx");

  const [animation, setAnimation] = useState(IDLE);

  const group = useRef();
  const { actions } = useAnimations([idle[0], talking[0], waving[0]], group);

  useEffect(() => {
    actions[IDLE]?.reset().fadeIn(0.5).play();

    return () => {
      actions[IDLE]?.fadeOut(0.5);
    };
  }, [actions]);

  let interval = null;
  let currTeethViseme = "viseme_sil";
  let currHeadViseme = "viseme_sil";
  useFrame(() => {
    // currTeethViseme = pickRandom(nodes.Wolf3D_Teeth.morphTargetDictionary);
    // currHeadViseme = pickRandom(nodes.Wolf3D_Head.morphTargetDictionary);
    // nodes.Wolf3D_Teeth.morphTargetInfluences[currTeethViseme] = 1;
    // nodes.Wolf3D_Head.morphTargetInfluences[currHeadViseme] = 1;
    // nodes.Wolf3D_Teeth.morphTargetInfluences[currTeethViseme] = 0;
    // nodes.Wolf3D_Head.morphTargetInfluences[currHeadViseme] = 0;
    // console.log(nodes.Wolf3D_Head.morphTargetDictionary);
  });

  const text = `
  WideBot is a leading company specializing in customer experience (CX) automation across the MENA region, with a strong presence in Egypt, Saudi Arabia, and the UAE. The company empowers governments and enterprises to streamline their communication with customers through AI-driven solutions. WideBot offers advanced conversational AI chatbots tailored to operate seamlessly on various social media messaging platforms and web chat interfaces. With a mission to enhance customer support, marketing, and sales automation, WideBot focuses on delivering personalized and efficient customer interactions. Their scalable solutions are designed to meet the unique demands of businesses across industries, fostering higher engagement and satisfaction. WideBot's innovation positions it as a pioneer in the AI and automation landscape of the region.
  `;

  let visemeDuration = 0.2; // Duration for each viseme (in seconds)
  let delay = 0; // Initial delay

  // Function to animate a viseme
  const animateViseme = (char) => {
    const viseme = visemeMapping[char.toUpperCase()];
    if (!viseme) return; // Skip characters that don't map to visemes

    const currTeethViseme = nodes.Wolf3D_Teeth.morphTargetDictionary[viseme];
    const currHeadViseme = nodes.Wolf3D_Head.morphTargetDictionary[viseme];

    if (currTeethViseme !== undefined && currHeadViseme !== undefined) {
      // Animate viseme influence
      setTimeout(() => {
        // Activate current viseme
        nodes.Wolf3D_Teeth.morphTargetInfluences[currTeethViseme] = 1;
        nodes.Wolf3D_Head.morphTargetInfluences[currHeadViseme] = 1;
      }, delay * 1000);

      setTimeout(() => {
        // Reset after duration
        nodes.Wolf3D_Teeth.morphTargetInfluences[currTeethViseme] = 0;
        nodes.Wolf3D_Head.morphTargetInfluences[currHeadViseme] = 0;
      }, (delay + visemeDuration) * 1000);
    }
  };

  useEffect(() => {
    [...text.toUpperCase()].forEach((char) => {
      console.log(char);

      animateViseme(char);
      delay += visemeDuration; // Increment delay for the next character
    });
  }, []);

  return (
    <group {...props} dispose={null} ref={group}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
    </group>
  );
}

useGLTF.preload("/models/Sayed/Sayed.glb");
