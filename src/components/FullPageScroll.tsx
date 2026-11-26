
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const SECTION_IDS = [
  ["trang-chu", "home"],
  ["ve-son", "about"],
  ["duong-chat-tu-yen", "essence"],
  ["san-pham", "products"],
  ["bo-suu-tap"],
  ["khach-hang", "reviews"],
  ["lien-he", "contact"],
];

const getSections = (): HTMLElement[] => {
  return SECTION_IDS.map((ids) => {
    for (const id of ids) {
      const element = document.getElementById(id);

      if (element) return element;
    }

    return null;
  }).filter(
    (element): element is HTMLElement =>
      element instanceof HTMLElement
  );
};

const getTop = (element: HTMLElement) =>
  element.getBoundingClientRect().top +
  window.scrollY;

export default function FullPageScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let scrolling = false;
    let cooldownUntil = 0;

    let wheelAmount = 0;
    let wheelDirection = 0;
    let lastWheelTime = 0;

    let gestureUsed = false;
    let quietTimer: number | undefined;

    let tween: gsap.core.Tween | null = null;

    // ======================================
    // GSAP SMOOTH SCROLL
    // ======================================

    const animateTo = (
      target: number,
      duration = 1.25
    ) => {
      scrolling = true;
      gestureUsed = true;
      wheelAmount = 0;

      tween?.kill();

      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight -
          window.innerHeight
      );

      const destination = gsap.utils.clamp(
        0,
        maxScroll,
        target
      );

      tween = gsap.to(window, {
        scrollTo: {
          y: destination,
          autoKill: false,
        },

        duration: reducedMotion ? 0 : duration,

        ease: "power2.inOut",

        overwrite: "auto",

        onComplete: () => {
          scrolling = false;

          // Hạn chế cuộn quán tính
          cooldownUntil = performance.now() + 300;
        },
      });
    };

    // ======================================
    // SECTION ĐANG HIỂN THỊ
    // ======================================

    const findActiveIndex = (
      sections: HTMLElement[]
    ) => {
      const center = window.innerHeight * 0.5;

      const found = sections.findIndex((section) => {
        const rect = section.getBoundingClientRect();

        return (
          rect.top <= center &&
          rect.bottom > center
        );
      });

      if (found >= 0) return found;

      return sections.reduce(
        (best, section, index) => {
          const distance = Math.abs(
            section.getBoundingClientRect().top
          );

          const previous = Math.abs(
            sections[best].getBoundingClientRect().top
          );

          return distance < previous ? index : best;
        },
        0
      );
    };

    // ======================================
    // WHEEL HANDLER
    // ======================================

    const handleWheel = (event: WheelEvent) => {
      if (window.innerWidth <= 767) return;
      if (event.ctrlKey) return;

      const target = event.target;

      // Giữ khả năng cuộn riêng cho các vùng cần thiết.
      if (
        target instanceof Element &&
        target.closest('[data-free-scroll="true"]')
      ) {
        return;
      }

      const sections = getSections();

      if (sections.length < 2) return;

      event.preventDefault();

      const now = performance.now();

      // Chỉ nhận một lần chuyển trang
      // trong một chuỗi cuộn liên tục.
      window.clearTimeout(quietTimer);

      quietTimer = window.setTimeout(() => {
        gestureUsed = false;
        wheelAmount = 0;
        wheelDirection = 0;
      }, 220);

      if (
        scrolling ||
        gestureUsed ||
        now < cooldownUntil
      ) {
        return;
      }

      // Chuẩn hóa wheel pixel/line/page.
      const multiplier =
        event.deltaMode === 1
          ? 16
          : event.deltaMode === 2
          ? window.innerHeight
          : 1;

      const delta = event.deltaY * multiplier;

      const direction = Math.sign(delta);

      if (!direction) return;

      if (
        direction !== wheelDirection ||
        now - lastWheelTime > 220
      ) {
        wheelAmount = 0;
      }

      wheelDirection = direction;
      lastWheelTime = now;

      wheelAmount += Math.abs(delta);

      if (wheelAmount < 45) return;

      wheelAmount = 0;

      const activeIndex = findActiveIndex(sections);
      const section = sections[activeIndex];

      const rect = section.getBoundingClientRect();

      const vh = window.innerHeight;
      const scroll = window.scrollY;

      // ===================================
      // SECTION DÀI — XEM NỘI DUNG BÊN TRONG
      // ===================================

      if (rect.height > vh + 25) {
        const step = vh * 0.7;

        if (
          direction > 0 &&
          rect.bottom > vh + 8
        ) {
          const remaining = rect.bottom - vh;

          animateTo(
            scroll + Math.min(step, remaining),
            1.05
          );

          return;
        }

        if (
          direction < 0 &&
          rect.top < -8
        ) {
          const remaining = -rect.top;

          animateTo(
            scroll - Math.min(step, remaining),
            1.05
          );

          return;
        }
      }

      // ===================================
      // NEXT / PREVIOUS SECTION
      // ===================================

      const nextIndex = gsap.utils.clamp(
        0,
        sections.length - 1,
        activeIndex + direction
      );

      if (nextIndex === activeIndex) return;

      const nextSection = sections[nextIndex];

      // Animation chậm và mềm hơn
      // khi bước vào bộ sưu tập.
      const duration =
        nextSection.id === "bo-suu-tap"
          ? 1.5
          : 1.2;

      animateTo(getTop(nextSection), duration);
    };

    window.addEventListener(
      "wheel",
      handleWheel,
      { passive: false }
    );

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel
      );

      window.clearTimeout(quietTimer);

      tween?.kill();
    };
  }, []);

  return null;
}
