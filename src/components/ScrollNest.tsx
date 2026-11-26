
import {
  Suspense,
  useLayoutEffect,
  useRef,
} from "react";

import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import Nest3D from "./Nest3D";

// ==========================================
// TYPES
// ==========================================

type Pose = {
  x: number;
  y: number;
  rotation: number;
  scale: number;
};

type Scene = {
  ids: string[];
  image: string | null;
  pose: (vw: number, vh: number) => Pose;
};

// ==========================================
// HELPERS
// ==========================================

const clamp = (value: number) =>
  Math.max(0, Math.min(1, value));

const mix = (a: number, b: number, t: number) =>
  a + (b - a) * t;

const smoothstep = (t: number) => {
  const p = clamp(t);
  return p * p * (3 - 2 * p);
};

function mixPose(
  a: Pose,
  b: Pose,
  t: number
): Pose {
  return {
    x: mix(a.x, b.x, t),
    y: mix(a.y, b.y, t),
    rotation: mix(a.rotation, b.rotation, t),
    scale: mix(a.scale, b.scale, t),
  };
}

function getTop(element: HTMLElement) {
  return (
    element.getBoundingClientRect().top +
    window.scrollY
  );
}

// ==========================================
// SON — 6 CẢNH NGUYÊN LIỆU
// ==========================================

const scenes: Scene[] = [
  {
    ids: ["trang-chu", "home"],
    image: null,

    pose: (vw) => ({
      x: 0,
      y: 0,
      rotation: 0,
      scale: vw <= 767 ? 0.8 : 1,
    }),
  },

  {
    ids: ["ve-son", "about"],
    image: "/images/soi-yen.png",

    pose: (vw) => ({
      x: vw * (vw <= 767 ? 0.18 : 0.26),
      y: 0,
      rotation: 7,
      scale: vw <= 767 ? 0.65 : 0.9,
    }),
  },

  {
    ids: ["duong-chat-tu-yen", "essence"],
    image: "/images/tao-do.png",

    pose: (vw) => ({
      x: -vw * (vw <= 767 ? 0.18 : 0.26),
      y: 0,
      rotation: -7,
      scale: vw <= 767 ? 0.65 : 0.9,
    }),
  },

  {
    ids: ["san-pham", "products"],
    image: "/images/ki-tu.png",

    pose: (vw, vh) => ({
      x: vw * (vw <= 767 ? 0.18 : 0.26),
      y: -vh * 0.07,
      rotation: 5,
      scale: vw <= 767 ? 0.6 : 0.85,
    }),
  },

  {
    ids: ["khach-hang", "reviews"],
    image: "/images/duong-phen.png",

    pose: (vw) => ({
      x: -vw * (vw <= 767 ? 0.18 : 0.26),
      y: 0,
      rotation: -5,
      scale: vw <= 767 ? 0.65 : 0.9,
    }),
  },

  {
    ids: ["lien-he", "contact"],
    image: "/images/thanh-pham.png",

    pose: (vw) => ({
      x: 0,
      y: 0,
      rotation: 0,
      scale: vw <= 767 ? 0.48 : 0.65,
    }),
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function ScrollNest() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const imageRefs = useRef<
    (HTMLImageElement | null)[]
  >([]);

  const floatStrengthRef = useRef(1);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;

    if (!stage || !canvas) return;

    // ======================================
    // FIND SECTIONS
    // ======================================

    const elements = scenes.map((scene) => {
      for (const id of scene.ids) {
        const element = document.getElementById(id);

        if (element instanceof HTMLElement) {
          return element;
        }
      }

      return null;
    });

    const missing = scenes
      .filter((_, index) => !elements[index])
      .map((scene) => scene.ids.join(" / "));

    if (missing.length) {
      console.warn(
        "SON: Không tìm thấy section:",
        missing.join(", ")
      );
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const images = imageRefs.current.filter(
      (img): img is HTMLImageElement =>
        img !== null
    );

    let frame = 0;
    let destroyed = false;

    // Không transform cả stage.
    // Chỉ transform từng hình để tránh
    // xung đột với vị trí fixed.
    gsap.set(stage, {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
    });

    // ======================================
    // UPDATE BY SCROLL POSITION
    // ======================================

    const update = () => {
      if (destroyed) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scroll = window.scrollY;

      const poses = scenes.map((scene) =>
        scene.pose(vw, vh)
      );

      let fromIndex = 0;
      let toIndex = 0;
      let progress = 0;

      // ====================================
      // DETERMINE CURRENT TRANSITION
      // ====================================

      for (let i = 1; i < scenes.length; i++) {
        const section = elements[i];

        if (!section) continue;

        const top = getTop(section);

        // Bắt đầu chuyển khi section
        // tiếp theo tiến vào viewport.
        const start = top - vh * 0.85;

        // Kết thúc khi section đó
        // đã vào gần vị trí chính.
        const end = top - vh * 0.25;

        if (scroll < start) {
          break;
        }

        if (scroll >= end) {
          fromIndex = i;
          toIndex = i;
          progress = 0;
          continue;
        }

        fromIndex = i - 1;
        toIndex = i;

        progress = clamp(
          (scroll - start) /
            Math.max(1, end - start)
        );

        break;
      }

      const transitioning =
        fromIndex !== toIndex;

      // Ease ảnh độc lập với tốc độ cuộn.
      const p = reducedMotion
        ? progress >= 0.5
          ? 1
          : 0
        : smoothstep(progress);

      // ====================================
      // SHARED MORPH POSE
      // ====================================

      const sharedPose = transitioning
        ? mixPose(
            poses[fromIndex],
            poses[toIndex],
            p
          )
        : poses[fromIndex];

      // Mức độ chuyển hình lớn nhất
      // nằm ở giữa quá trình.
      const intensity =
        transitioning && !reducedMotion
          ? Math.sin(Math.PI * p)
          : 0;

      // Thu nhỏ nhẹ rồi nở về kích thước mới.
      const scaleBoost =
        1 - intensity * 0.08;

      // Xoay thêm để tạo cảm giác biến đổi.
      const morphRotation =
        intensity * 6;

      // Blur nhẹ nhất quán giữa hai ảnh.
      const blur = intensity * 3;

      const finalScale =
        sharedPose.scale * scaleBoost;

      const finalRotation =
        sharedPose.rotation + morphRotation;

      // ====================================
      // NEST FLOAT STRENGTH
      // ====================================

      const about = elements[1];

      if (about) {
        const aboutTop = getTop(about);

        const start = aboutTop - vh * 0.85;
        const end = aboutTop - vh * 0.25;

        const floatProgress = clamp(
          (scroll - start) /
            Math.max(1, end - start)
        );

        floatStrengthRef.current =
          1 - smoothstep(floatProgress);
      } else {
        floatStrengthRef.current = 1;
      }

      // ====================================
      // HERO CANVAS
      // ====================================

      let heroOpacity = 0;

      if (!transitioning && fromIndex === 0) {
        heroOpacity = 1;
      }

      if (transitioning && fromIndex === 0) {
        heroOpacity = 1 - p;
      }

      if (heroOpacity > 0.001) {
        gsap.set(canvas, {
          x: sharedPose.x,
          y: sharedPose.y,

          rotation: finalRotation,
          scale: finalScale,

          opacity: heroOpacity,
          visibility: "visible",

          transformOrigin: "center center",
          force3D: true,
        });
      } else {
        gsap.set(canvas, {
          opacity: 0,
          visibility: "hidden",
        });
      }

      // ====================================
      // INGREDIENT IMAGE MORPH
      // ====================================

      imageRefs.current.forEach(
        (img, index) => {
          if (!img) return;

          const sceneIndex = index + 1;

          let opacity = 0;

          // Ảnh của section hiện tại.
          if (!transitioning) {
            if (sceneIndex === fromIndex) {
              opacity = 1;
            }
          } else {
            // Ảnh cũ biến mất dần.
            if (sceneIndex === fromIndex) {
              opacity = 1 - p;
            }

            // Ảnh mới xuất hiện dần.
            if (sceneIndex === toIndex) {
              opacity = p;
            }
          }

          if (opacity <= 0.001) {
            gsap.set(img, {
              opacity: 0,
              visibility: "hidden",
            });

            return;
          }

          // Hai ảnh đi cùng một quỹ đạo,
          // chỉ lệch nhẹ theo tiến trình.
          let offsetX = 0;
          let offsetY = 0;

          if (transitioning && !reducedMotion) {
            if (sceneIndex === fromIndex) {
              offsetX = -p * 22;
              offsetY = -intensity * 10;
            }

            if (sceneIndex === toIndex) {
              offsetX = (1 - p) * 22;
              offsetY = intensity * 10;
            }
          }

          gsap.set(img, {
            xPercent: -50,
            yPercent: -50,

            x: sharedPose.x + offsetX,
            y: sharedPose.y + offsetY,

            rotation: finalRotation,
            scale: finalScale,

            opacity,
            visibility: "visible",

            filter: `blur(${blur.toFixed(2)}px)`,

            transformOrigin: "center center",
            force3D: true,
          });
        }
      );
    };

    // ======================================
    // REQUEST ANIMATION FRAME
    // ======================================

    const requestUpdate = () => {
      if (frame || destroyed) return;

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    // ======================================
    // PRELOAD IMAGE ASSETS
    // ======================================

    images.forEach((img) => {
      img.addEventListener(
        "load",
        requestUpdate
      );

      img.addEventListener(
        "error",
        requestUpdate
      );
    });

    // ======================================
    // EVENTS
    // ======================================

    update();

    window.addEventListener(
      "scroll",
      requestUpdate,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      requestUpdate,
      { passive: true }
    );

    window.addEventListener(
      "load",
      requestUpdate
    );

    // ======================================
    // CLEANUP
    // ======================================

    return () => {
      destroyed = true;

      window.cancelAnimationFrame(frame);

      window.removeEventListener(
        "scroll",
        requestUpdate
      );

      window.removeEventListener(
        "resize",
        requestUpdate
      );

      window.removeEventListener(
        "load",
        requestUpdate
      );

      images.forEach((img) => {
        img.removeEventListener(
          "load",
          requestUpdate
        );

        img.removeEventListener(
          "error",
          requestUpdate
        );
      });

      gsap.set(stage, {
        clearProps: "transform",
      });

      gsap.set(canvas, {
        clearProps:
          "transform,opacity,visibility",
      });

      images.forEach((img) => {
        gsap.set(img, {
          clearProps:
            "transform,opacity,visibility,filter",
        });
      });
    };
  }, []);

  // ========================================
  // RENDER
  // ========================================

  return (
    <div
      ref={stageRef}
      className="son-visual-stage"
      aria-hidden="true"
    >
      {/* HERO — TỔ YẾN 3D */}
      <div
        ref={canvasRef}
        className="son-visual-canvas"
      >
        <Suspense fallback={null}>
          <Canvas
            camera={{
              position: [0, 1.5, 6],
              fov: 38,
            }}
            dpr={[1, 1.75]}
            gl={{
              alpha: true,
              antialias: true,
              powerPreference:
                "high-performance",
            }}
          >
            <Nest3D
              floatStrengthRef={
                floatStrengthRef
              }
            />
          </Canvas>
        </Suspense>
      </div>

      {/* ẢNH NGUYÊN LIỆU */}
      {scenes.slice(1).map(
        (scene, index) => (
          <img
            key={scene.ids[0]}
            ref={(element) => {
              imageRefs.current[index] =
                element;
            }}
            className="son-morph-image"
            src={scene.image ?? ""}
            alt=""
            draggable={false}
          />
        )
      )}
    </div>
  );
}
