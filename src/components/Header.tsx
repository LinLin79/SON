import { useEffect, useState } from "react";

const navigation = [
  { id: "trang-chu", label: "Trang Chủ" },
  { id: "ve-son", label: "Về SON" },
  { id: "duong-chat-tu-yen", label: "Dưỡng Chất Từ Yến" },
  { id: "san-pham", label: "Sản Phẩm" },
  { id: "khach-hang", label: "Khách Hàng" },
  { id: "lien-he", label: "Liên Hệ" },
] as const;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("trang-chu");

  useEffect(() => {
    let frame = 0;

    const update = () => {
      setScrolled(window.scrollY > 80);

      const active = [...navigation].reverse().find(({ id }) => {
        const section = document.getElementById(id);
        return section && section.getBoundingClientRect().top <= window.innerHeight * 0.4;
      });
      setActiveSection(active?.id ?? "trang-chu");
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header son-floating-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="son-header-shell">
        <a
          className="brand brand-logo"
          href="#trang-chu"
          onClick={closeMenu}
          aria-label="SON — Về trang chủ"
        >
          <img className="logo" src="/logo.png" alt="SON — Shape of Nest" />
        </a>

        <nav
          id="son-primary-navigation"
          className={`nav-links${menuOpen ? " open" : ""}`}
          aria-label="Điều hướng chính"
        >
          {navigation.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={closeMenu}
              className={activeSection === id ? "active" : undefined}
              aria-current={activeSection === id ? "location" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>

        <a href="#lien-he" className="header-contact" onClick={closeMenu}>
          Liên Hệ <span aria-hidden="true">↗</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-controls="son-primary-navigation"
          aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "CLOSE" : "MENU"}
        </button>
      </div>
    </header>
  );
}
