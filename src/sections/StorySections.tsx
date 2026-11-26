
import { useEffect, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import "../css/StorySections.css";

const FORM_ID =
  import.meta.env.VITE_FORMSPREE_ID || "YOUR_FORM_ID";
const gallery = [
  {
    id: "01",
    name: "SON — Gift Collection",
    detail: "Bộ quà tặng SON",
    image: "/images/son-packaging.jpg",
  },
  {
    id: "02",
    name: "SON — Bird's Nest",
    detail: "Yến sào SON",
    image: "/images/son-saffron.jpg",
  },
  {
    id: "03",
    name: "The Art of Gifting",
    detail: "Hình ảnh bộ quà tặng",
    image: "/images/son-packaging.jpg",
  },
  {
    id: "04",
    name: "Nature's Finest",
    detail: "Hình ảnh yến sào SON",
    image: "/images/son-saffron.jpg",
  },
];

function SectionTop({
  index,
  label,
}: {
  index: string;
  label: string;
}) {
  void index;
  void label;
  return null;
}

function SectionBottom({
  next,
}: {
  next: string;
}) {
  void next;
  return null;
}

function About() {
  return (
    <section
      id="ve-son"
      className="son-story-section story-image-right"
    >
      <SectionTop index="02" label="Ve SON" />

      <div className="son-story-layout">
        <div className="son-story-copy">
          <span className="hero-eyebrow">
            CÂU CHUYỆN THƯƠNG HIỆU
          </span>

          <h2 className="son-story-title">
            Khởi nguồn
            <br />
            <em>từ thiên nhiên.</em>
          </h2>
          <span className="son-story-line" />

          <h3>SON — Shape of Nest</h3>

          <p>
            Khởi nguồn từ vẻ đẹp nguyên bản của tổ yến, SON tin rằng những món quà ý nghĩa không chỉ nằm ở giá trị vật chất, mà còn ở sự quan tâm và trân trọng dành cho người nhận.
          </p>

          <p>
          Từ những sợi yến mỏng manh đến cách chăm chút từng chi tiết, SON mong muốn lưu giữ nét đẹp tự nhiên trong mỗi sản phẩm và mỗi trải nghiệm trao tặng.
          </p>
        </div>

        {/* <div className="son-story-image-space">
          <span>THE NATURAL TEXTURE</span>
        </div> */}
      </div>

      <SectionBottom next="essence" />
    </section>
  );
}

function Essence() {
  return (
    <section
      id="duong-chat-tu-yen"
      className="son-story-section story-image-left"
    >
      <SectionTop index="03" label="THE ESSENCE" />

      <div className="son-story-layout">
        <div className="son-story-copy">

        <span className="hero-eyebrow">
            DƯỠNG CHẤT TỪ YẾN
          </span>
          <h2 className="son-story-title">
            Tinh hoa
            <br />
             <em>nuôi dưỡng sức khỏe.</em>
          </h2>

          <span className="son-story-line" />

          <h3>Yến sào — Món quà dinh dưỡng từ thiên nhiên</h3>

          <p>
            Yến sào chứa protein và nhiều loại axit amin, góp phần bổ sung dưỡng chất cho cơ thể.
          </p>

          <p>
            Với hương vị thanh nhẹ, yến sào có thể kết hợp cùng táo đỏ, kỷ tử và đường phèn để tạo nên món ăn bổ dưỡng, phù hợp với lối sống chú trọng chăm sóc sức khỏe.
          </p>
        </div>

        {/* <div className="son-story-image-space">
          <span>NATURE'S WARMTH</span>
        </div> */}
      </div>

      <SectionBottom next="products" />
    </section>
  );
}

function Products() {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const update = () => {
      setVisibleCount(
        window.innerWidth < 700
          ? 1
          : window.innerWidth < 1050
            ? 2
            : 3
      );
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxStart = Math.max(
    0,
    gallery.length - visibleCount
  );

  const actualStart = Math.min(startIndex, maxStart);

  const visibleGallery = gallery.slice(
    actualStart,
    actualStart + visibleCount
  );

  return (
    <>
     <section
      id="san-pham"
      className="son-story-section son-products-section story-image-right"
    >
      <div className="son-story-layout">
        <div className="son-story-copy">
          <span className="hero-eyebrow">
            KHÁM PHÁ SẢN PHẨM CỦA SON
          </span>
          <h2 className="son-story-title">
            Trao gửi
            <br />
            <em>điều trân quý.</em>
          </h2>

          <span className="son-story-line" />

          <h3>Tinh tế trong từng món quà</h3>

          <p>
            Một món quà đẹp không chỉ đến từ
            hình thức, mà còn từ câu chuyện
            và tấm lòng được gửi gắm bên trong.
          </p>

          <p>
            SON mang đến những lựa chọn quà tặng
            yến sào được chăm chút về cách trình
            bày, kết hợp vẻ đẹp tự nhiên của tổ
            yến cùng những sắc màu tinh tế
            từ nguyên liệu như kỷ tử.
          </p>
        </div>

      </div>


      <a
        className="son-products-discover"
        href="#bo-suu-tap"
      >
        KHÁM PHÁ BỘ SƯU TẬP
        <span>↓</span>
      </a>

    </section>

    {/* ======================================
        SECTION 05 — BỘ SƯU TẬP SẢN PHẨM
    ====================================== */}

    <section
      id="bo-suu-tap"
      className="son-collection-section"
    >
      <div className="son-collection-container">
        <div className="son-collection-top">
          <span className="hero-eyebrow">
            NHỮNG MÓN QUÀ TỪ SON
          </span>

          <h2>
            Bộ sưu tập
            <br />
            <em>tinh tế.</em>
          </h2>

          <p>
            Khám phá những sản phẩm yến sào
            được SON chăm chút trong từng
            chi tiết.
          </p>
        </div>

        {/* PRODUCT CAROUSEL */}
        <div className="son-gallery">
          <div className="son-gallery-heading">
            <h3>
              Sản phẩm <em>của SON.</em>
            </h3>

            <div className="son-gallery-controls">
              <span className="son-gallery-counter">
                {String(actualStart + 1).padStart(2, "0")}
                {" / "}
                {String(gallery.length).padStart(2, "0")}
              </span>

              <button
                type="button"
                onClick={() =>
                  setStartIndex((i) =>
                    Math.max(0, i - 1)
                  )
                }
                disabled={actualStart === 0}
                aria-label="Ảnh sản phẩm trước"
              >
                ←
              </button>

              <button
                type="button"
                onClick={() =>
                  setStartIndex((i) =>
                    Math.min(maxStart, i + 1)
                  )
                }
                disabled={actualStart === maxStart}
                aria-label="Ảnh sản phẩm tiếp theo"
              >
                →
              </button>
            </div>
          </div>

          <div className="son-gallery-grid">
            {visibleGallery.map((item) => (
              <article
                className="son-gallery-card"
                key={item.id}
              >
                <div className="son-gallery-photo">
                  <img
                    src={item.image}
                    alt={item.detail}
                    loading="lazy"
                  />

                  <span>SON / {item.id}</span>
                </div>

                <div className="son-gallery-meta">
                  <h4>{item.name}</h4>
                  <span>{item.detail}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
</>
  )
};
function Reviews() {
  return (
    <section
      id="khach-hang"
      className="son-story-section story-image-left"
    >
      <SectionTop index="05" label="CUSTOMER REVIEWS" />

      <div className="son-story-layout">

        <div className="son-story-copy">
        <span className="hero-eyebrow">
            SỰ TRÂN TRỌNG TẠO NÊN GIÁ TRỊ
          </span>
          <h2 className="son-story-title">
            Niềm tin
            <br />
             <em>từ sự chân thành.</em>
          </h2>

          <span className="son-story-line" />

          <h3>Mỗi trải nghiệm, một câu chuyện.</h3>

          <p>
            SON tin rằng giá trị của một món quà không kết thúc khi được trao đi, mà còn tiếp tục trong những khoảnh khắc người nhận cảm nhận được sự quan tâm.
          </p>
        <p>
            Mỗi lời chia sẻ và góp ý đều là động lực để SON tiếp tục hoàn thiện sản phẩm, dịch vụ và những trải nghiệm dành cho khách hàng.
        </p>
          {/* <div className="son-review-area">
            <span className="son-review-tag">
              Đánh giá từ khách hàng:
            </span>

            <p>
              Cảm nhận từ khách hàng sẽ được cập nhật tại đây.
            </p>

            <a href="#contact">
              SHARE YOUR EXPERIENCE ↗
            </a>
          </div> */}
        </div>

        {/* <div className="son-story-image-space">
          <span>A GENTLE SWEETNESS</span>
        </div> */}
      </div>

      <SectionBottom next="contact" />
    </section>
  );
}

function Contact() {
  const [state, handleSubmit, resetForm] = useForm(FORM_ID);

  const configured =
    FORM_ID !== "YOUR_FORM_ID" &&
    FORM_ID !== "THAY_BANG_FORM_ID_CUA_BAN";

  return (
    <section
      id="lien-he"
      className="son-contact-new"
    >
      <SectionTop index="06" label="CONTACT SON" />


<div className="son-contact-inner son-contact-split">

  {/* ==================================
      LEFT — CONTACT CONTENT
  ================================== */}
  <div className="son-contact-left">

    <h2 className="son-contact-title">
      Kết nối
      <br />
      <em>cùng SON.</em>
    </h2>

    <span className="son-contact-divider" />

    <h3>
      Trao gửi yêu thương,
      <br />
      bắt đầu từ sự quan tâm.
    </h3>

    <p className="son-contact-intro">
      Bạn đang tìm kiếm một món quà tinh tế dành cho người thân, bạn bè hay đối tác?
      <br />
    Hãy để SON giúp bạn gửi gắm sự quan tâm và trân trọng trong từng món quà.
    </p>

    <span className="son-contact-signature">
      SON — SHAPE OF NEST
    </span>

  </div>

  {/* ==================================
      RIGHT — CONTACT FORM
  ================================== */}
  <div className="son-contact-right">

    {state.succeeded ? (
      <div
        className="son-form-success"
        role="status"
      >
        <h3>Cảm ơn khách yêu!</h3>

        <p>
          SON đã tiếp nhận lời nhắn của bạn.
          Chúng tôi sẽ phản hồi qua thông tin
          bạn đã cung cấp.
        </p>

        <button
          type="button"
          onClick={resetForm}
        >
          GỬI LỜI NHẮN KHÁC ↗
        </button>
      </div>
    ) : (
      <form
        className="son-contact-new-form"
        onSubmit={handleSubmit}
      >
        <input
          type="hidden"
          name="subject"
          value="Liên hệ từ website SON"
        />

        {/* NAME + EMAIL */}


          <label>
            HỌ VÀ TÊN *

            <input
              name="name"
              type="text"
              placeholder="Nguyễn Văn A"
              autoComplete="name"
              maxLength={100}
              required
            />
          </label>

          <label>
            EMAIL *

            <input
              name="email"
              type="email"
              placeholder="email@example.com"
              autoComplete="email"
              required
            />

            <ValidationError
              field="email"
              errors={state.errors}
            />
          </label>


        {/* PHONE */}
        <label>
          SỐ ĐIỆN THOẠI

          <input
            name="phone"
            type="tel"
            placeholder="09xx xxx xxx"
            autoComplete="tel"
            maxLength={20}
          />
        </label>

        {/* MESSAGE */}
        <label>
          LỜI NHẮN *

          <textarea
            name="message"
            rows={4}
            maxLength={3000}
            placeholder="Tôi muốn được tư vấn về sản phẩm SON..."
            required
          />

          <ValidationError
            field="message"
            errors={state.errors}
          />
        </label>

        {/* FORM ERRORS */}
        <ValidationError
          errors={state.errors}
          className="son-form-error"
        />

        {!configured && (
          <p className="son-form-error">
            Kiểm tra kết nối
          </p>
        )}

        {/* SUBMIT */}
        <div className="son-form-submit-row">

          <span>* Thông tin bắt buộc</span>

          <button
            type="submit"
            disabled={
              !configured ||
              state.submitting
            }
          >
            {state.submitting
              ? "ĐANG GỬI..."
              : "GỬI ↗"}
          </button>

        </div>
      </form>
    )}

  </div>

</div>

      {/* CHÉN YẾN HOÀN CHỈNH Ở DƯỚI FORM */}
      <div className="son-finished-scene">
        <span className="son-story-eyebrow">
          THE FINAL MOMENT
        </span>

        <h3>
          A gift from <em>nature.</em>
        </h3>

        <div
          id="son-finished-target"
          className="son-finished-target"
          role="img"
          aria-label="Chén yến sào chưng thành phẩm với táo đỏ và kỷ tử"
        />

        <p>
          SON — Tinh hoa thiên nhiên trong từng món quà.
        </p>
      </div>

      <footer className="son-new-footer">
        <div>
          <strong>SON</strong>
          <span>SHAPE OF NEST</span>
        </div>

        <span>YẾN SÀO CHẤT LƯỢNG CAO - NÂNG CAO SỨC KHỎE SỐNG</span>

        <a href="#trang-chu" > TRỞ VỀ ĐẦU TRANG ↑</a>
      </footer>
    </section>
  );
}

export default function StorySections() {
  return (
    <>
      <About />
      <Essence />
      <Products />
      <Reviews />
      <Contact />
    </>
  );
}
