import { useEffect, useMemo, useRef } from "react";
import type { RefObject } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

type Nest3DProps = {
	floatStrengthRef?: RefObject<number>;
};

export default function Nest3D({ floatStrengthRef }: Nest3DProps) {
	const nestRef = useRef<THREE.Mesh>(null);

	// Ảnh tổ yến thật
	const texture = useLoader(THREE.TextureLoader, "/images/yen-sao.png");

	// Chỉnh chất lượng hiển thị texture
	useEffect(() => {
		texture.colorSpace = THREE.SRGBColorSpace;
		texture.anisotropy = 8;
		texture.needsUpdate = true;
	}, [texture]);

	// Material không tạo lại mỗi frame
	const material = useMemo(() => {
		return new THREE.MeshBasicMaterial({
			map: texture,
			transparent: true,
			side: THREE.DoubleSide,
			depthWrite: false,
			toneMapped: false,
		});
	}, [texture]);

	useEffect(() => {
		return () => {
			material.dispose();
		};
	}, [material]);

	// =====================================
	// ANIMATION
	// =====================================

	useFrame((state, delta) => {
		const nest = nestRef.current;

		if (!nest) return;

		const time = state.clock.elapsedTime;

		// 1 = bay tại Hero
		// 0 = đứng yên tại các section sau
		const strength = THREE.MathUtils.clamp(floatStrengthRef?.current ?? 1, 0, 1);

		// Bay lên xuống nhẹ
		const floatY = Math.sin(time * 1.2) * 0.19 * strength;

		// Đưa về vị trí gốc khi strength = 0
		nest.position.y = THREE.MathUtils.damp(nest.position.y, floatY, 7, delta);

		// Nghiêng theo chuột
		const pointerRotationY = state.pointer.x * 0.19 * strength;

		const pointerRotationX = -state.pointer.y * 0.1 * strength;

		// Xoay nhẹ tự nhiên khi lơ lửng
		const idleRotationZ = Math.sin(time * 0.65) * 0.025 * strength;

		nest.rotation.y = THREE.MathUtils.damp(nest.rotation.y, pointerRotationY, 6, delta);

		nest.rotation.x = THREE.MathUtils.damp(nest.rotation.x, pointerRotationX, 6, delta);

		nest.rotation.z = THREE.MathUtils.damp(nest.rotation.z, idleRotationZ, 6, delta);
	});

	return (
		<mesh ref={nestRef} scale={[4.3, 4.3, 1]}>
			<planeGeometry args={[1, 1]} />

			<primitive object={material} attach="material" />
		</mesh>
	);
}
