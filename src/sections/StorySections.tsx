import { useEffect, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import "../css/StorySections.css";

const FORM_ID = import.meta.env.VITE_FORMSPREE_ID || "YOUR_FORM_ID";

// ==========================================
// SON — PRODUCT DATA
// ==========================================

const gallery = [
	{
		id: "01",
		name: "Bộ quà tặng cao cấp 1",
		detail: "Bộ quà tặng SON",
		image: "/images/son (1).jpg",
	},
	{
		id: "02",
		name: "Bộ quà tặng cao cấp 2",
		detail: "Bộ quà tặng Tết",
		image: "/images/son (2).jpg",
	},
	{
		id: "03",
		name: "Bộ quà tặng cao cấp 3",
		detail: "Bộ quà tặng SON",
		image: "/images/son (3).jpg",
	},
	{
		id: "04",
		name: "Bộ quà tặng cao cấp 4",
		detail: "Hình ảnh yến sào Tết",
		image: "/images/son (4).jpg",
	},
	{
		id: "05",
		name: "Bộ quà tặng cao cấp 5",
		detail: "Hình ảnh yến sào Tết",
		image: "/images/son (5).jpg",
	},
	{
		id: "06",
		name: "Bộ quà tặng cao cấp 6",
		detail: "Hình ảnh yến sào Tết",
		image: "/images/son (6).jpg",
	},
	{
		id: "07",
		name: "Bộ quà tặng cao cấp 7",
		detail: "Hình ảnh yến sào Tết",
		image: "/images/son (7).jpg",
	},
	{
		id: "08",
		name: "Bộ quà tặng cao cấp 8",
		detail: "Hình ảnh yến sào SON",
		image: "/images/son-packaging.jpg",
	},
	{
		id: "09",
		name: "Bộ quà tặng cao cấp 9",
		detail: "Hình ảnh yến sào SON",
		image: "/images/son (9).jpg",
	},
	{
		id: "10",
		name: "Bộ quà tặng cao cấp 10",
		detail: "Hình ảnh yến sào SON",
		image: "/images/son (10).jpg",
	},
	{
		id: "11",
		name: "Bộ quà tặng cao cấp 11",
		detail: "Hình ảnh yến sào SON",
		image: "/images/son (11).jpg",
	},
	{
		id: "12",
		name: "Bộ quà tặng cao cấp 12",
		detail: "Hình ảnh yến sào SON",
		image: "/images/son (12).jpg",
	},
];

// ==========================================
// ABOUT
// ==========================================

function About() {
	return (
		<section id="ve-son" className="son-story-section story-image-right">
			<div className="son-story-layout">
				<div className="son-story-copy">
					<span className="hero-eyebrow">CÂU CHUYỆN THƯƠNG HIỆU</span>

					<h2 className="son-story-title">
						Khởi nguồn
						<br />
						<em>từ thiên nhiên.</em>
					</h2>

					<img
						className="son-mobile-ingredient"
						src="/images/soi-yen.png"
						alt="Sợi yến thiên nhiên SON"
						loading="lazy"
					/>

					<span className="son-story-line" />

					<h3>SON — Shape of Nest</h3>

					<p>
						Khởi nguồn từ vẻ đẹp nguyên bản của tổ yến, SON tin rằng những món quà ý nghĩa không chỉ nằm ở
						giá trị vật chất, mà còn ở sự quan tâm và trân trọng dành cho người nhận.
					</p>

					<p>
						Từ những sợi yến mỏng manh đến cách chăm chút từng chi tiết, SON mong muốn lưu giữ nét đẹp tự
						nhiên trong mỗi sản phẩm và mỗi trải nghiệm trao tặng.
					</p>
				</div>
			</div>
		</section>
	);
}

// ==========================================
// ESSENCE
// ==========================================

function Essence() {
	return (
		<section id="duong-chat-tu-yen" className="son-story-section story-image-left">
			<div className="son-story-layout">
				<div className="son-story-copy">
					<span className="hero-eyebrow">DƯỠNG CHẤT TỪ YẾN</span>

					<h2 className="son-story-title">
						Tinh hoa
						<br />
						<em>nuôi dưỡng sức khỏe.</em>
					</h2>

					<img className="son-mobile-ingredient" src="/images/tao-do.png" alt="Táo đỏ" loading="lazy" />

					<span className="son-story-line" />

					<h3>Yến sào — Món quà dinh dưỡng từ thiên nhiên</h3>

					<p>Yến sào chứa protein và nhiều loại axit amin, góp phần bổ sung dưỡng chất cho cơ thể.</p>

					<p>
						Với hương vị thanh nhẹ, yến sào có thể kết hợp cùng táo đỏ, kỷ tử và đường phèn để tạo nên món
						ăn bổ dưỡng, phù hợp với lối sống chú trọng chăm sóc sức khỏe.
					</p>
				</div>
			</div>
		</section>
	);
}

// ==========================================
// PRODUCTS + COLLECTION CAROUSEL
// ==========================================

function Products() {
	const [startIndex, setStartIndex] = useState(0);
	const [visibleCount, setVisibleCount] = useState(5);

	useEffect(() => {
		const updateVisibleCount = () => {
			const width = window.innerWidth;

			if (width <= 640) {
				setVisibleCount(1);
			} else if (width <= 900) {
				setVisibleCount(2);
			} else if (width <= 1200) {
				setVisibleCount(3);
			} else if (width <= 1500) {
				setVisibleCount(4);
			} else {
				setVisibleCount(5);
			}
		};

		updateVisibleCount();
		window.addEventListener("resize", updateVisibleCount);

		return () => {
			window.removeEventListener("resize", updateVisibleCount);
		};
	}, []);

	// Chỉ được phép hiển thị tối đa
	// visibleCount ảnh mỗi lần.
	const maxStart = Math.max(0, gallery.length - visibleCount);

	const actualStart = Math.min(Math.max(0, startIndex), maxStart);

	const visibleGallery = gallery.slice(actualStart, actualStart + visibleCount);

	const goPrevious = () => {
		setStartIndex((current) => Math.max(0, current - 1));
	};

	const goNext = () => {
		setStartIndex((current) => Math.min(maxStart, current + 1));
	};

	return (
		<>
			{/* SECTION 04 — PRODUCT INTRO */}

			<section id="san-pham" className="son-story-section son-products-section story-image-right">
				<div className="son-story-layout">
					<div className="son-story-copy">
						<span className="hero-eyebrow">KHÁM PHÁ SẢN PHẨM CỦA SON</span>

						<h2 className="son-story-title">
							Trao gửi
							<br />
							<em>điều trân quý.</em>
						</h2>

						<img className="son-mobile-ingredient" src="/images/ki-tu.png" alt="Kỷ tử" loading="lazy" />

						<span className="son-story-line" />

						<h3>Tinh tế trong từng món quà</h3>

						<p>
							Một món quà đẹp không chỉ đến từ hình thức, mà còn từ câu chuyện và tấm lòng được gửi gắm
							bên trong.
						</p>

						<p>
							SON mang đến những lựa chọn quà tặng yến sào được chăm chút về cách trình bày, kết hợp vẻ
							đẹp tự nhiên của tổ yến cùng những sắc màu tinh tế từ nguyên liệu như kỷ tử.
						</p>
					</div>
				</div>

				<a className="son-products-discover" href="#bo-suu-tap">
					KHÁM PHÁ BỘ SƯU TẬP
					<span>↓</span>
				</a>
			</section>

			{/* SECTION 05 — COLLECTION */}

			<section id="bo-suu-tap" className="son-collection-section">
				<div className="son-collection-container">
					<div className="son-collection-top">
						<span className="hero-eyebrow">NHỮNG MÓN QUÀ TỪ SON</span>

						<h2>
							Bộ sản phẩm
							<br />
							<em>tinh tế.</em>
						</h2>

						<p>Khám phá những sản phẩm yến sào được SON chăm chút trong từng chi tiết.</p>
					</div>

					<div className="son-gallery">
						{/* GALLERY HEADER */}

						<div className="son-gallery-heading">
							<h3>
								Sản phẩm <em>của SON.</em>
							</h3>

							<div className="son-gallery-controls">
								<span className="son-gallery-counter" aria-live="polite">
									{String(actualStart + 1).padStart(2, "0")}
									{" / "}
									{String(gallery.length).padStart(2, "0")}
								</span>

								<button
									type="button"
									onClick={goPrevious}
									disabled={actualStart === 0}
									aria-label="Ảnh sản phẩm trước"
								>
									←
								</button>

								<button
									type="button"
									onClick={goNext}
									disabled={actualStart >= maxStart}
									aria-label="Ảnh sản phẩm tiếp theo"
								>
									→
								</button>
							</div>
						</div>

						{/* ONLY VISIBLE PRODUCTS */}

						<div
							className="son-gallery-grid son-gallery-grid-fixed"
							style={{
								gridTemplateColumns: `repeat(${visibleCount}, minmax(0, 1fr))`,
							}}
						>
							{visibleGallery.map((item) => (
								<article className="son-gallery-card" key={item.id}>
									<div className="son-gallery-photo">
										<img src={item.image} alt={item.detail} loading="lazy" decoding="async" />

										<span>SON / {item.id}</span>
									</div>

									<div className="son-gallery-meta">
										<h4>{item.name}</h4>
										<span>{item.detail}</span>
									</div>
								</article>
							))}
						</div>

						<p className="son-gallery-hint">Sử dụng mũi tên để khám phá thêm những món quà từ SON.</p>
					</div>
				</div>
			</section>
		</>
	);
}

// ==========================================
// REVIEWS
// ==========================================

function Reviews() {
	return (
		<section id="khach-hang" className="son-story-section story-image-left">
			<div className="son-story-layout">
				<div className="son-story-copy">
					<span className="hero-eyebrow">SỰ TRÂN TRỌNG TẠO NÊN GIÁ TRỊ</span>

					<h2 className="son-story-title">
						Niềm tin
						<br />
						<em>từ sự chân thành.</em>
					</h2>

					<img
						className="son-mobile-ingredient"
						src="/images/duong-phen.png"
						alt="Đường phèn"
						loading="lazy"
					/>

					<span className="son-story-line" />

					<h3>Mỗi trải nghiệm, một câu chuyện.</h3>

					<p>
						SON tin rằng giá trị của một món quà không kết thúc khi được trao đi, mà còn tiếp tục trong
						những khoảnh khắc người nhận cảm nhận được sự quan tâm.
					</p>

					<p>
						Mỗi lời chia sẻ và góp ý đều là động lực để SON tiếp tục hoàn thiện sản phẩm, dịch vụ và những
						trải nghiệm dành cho khách hàng.
					</p>
				</div>
			</div>
		</section>
	);
}

// ==========================================
// CONTACT — FORMSPREE
// ==========================================

function Contact() {
	const [state, handleSubmit, resetForm] = useForm(FORM_ID);

	const configured = FORM_ID !== "YOUR_FORM_ID" && FORM_ID !== "THAY_BANG_FORM_ID_CUA_BAN";

	return (
		<section id="lien-he" className="son-contact-new">
			<div className="son-contact-inner son-contact-split">
				{/* LEFT CONTENT */}

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

					<span className="son-contact-signature">SON — SHAPE OF NEST</span>
				</div>

				{/* CONTACT FORM */}

				<div className="son-contact-right">
					{state.succeeded ? (
						<div className="son-form-success" role="status">
							<h3>Cảm ơn khách yêu!</h3>

							<p>
								SON đã tiếp nhận lời nhắn của bạn. Chúng tôi sẽ phản hồi qua thông tin bạn đã cung cấp.
							</p>

							<button type="button" onClick={resetForm}>
								GỬI LỜI NHẮN KHÁC ↗
							</button>
						</div>
					) : (
						<form className="son-contact-new-form" onSubmit={handleSubmit}>
							<input type="hidden" name="subject" value="Liên hệ từ website SON" />

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
								<ValidationError field="email" errors={state.errors} />
							</label>

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

							<label>
								LỜI NHẮN *
								<textarea
									name="message"
									rows={4}
									maxLength={3000}
									placeholder="Tôi muốn được tư vấn về sản phẩm SON..."
									required
								/>
								<ValidationError field="message" errors={state.errors} />
							</label>

							<ValidationError errors={state.errors} className="son-form-error" />

							{!configured && <p className="son-form-error">Kiểm tra kết nối</p>}

							<div className="son-form-submit-row">
								<span>* Thông tin bắt buộc</span>

								<button type="submit" disabled={!configured || state.submitting}>
									{state.submitting ? "ĐANG GỬI..." : "GỬI ↗"}
								</button>
							</div>
						</form>
					)}
				</div>
			</div>

			{/* FINISHED NEST TARGET */}

			<div className="son-finished-scene">
				<span className="son-story-eyebrow">THE FINAL MOMENT</span>

				<h3>
					A gift from <em>nature.</em>
				</h3>

				<div
					id="son-finished-target"
					className="son-finished-target"
					role="img"
					aria-label="Chén yến sào chưng thành phẩm với táo đỏ và kỷ tử"
				/>

				<p>SON — Tinh hoa thiên nhiên trong từng món quà.</p>
			</div>

			<footer className="son-new-footer">
				<div>
					<strong>SON</strong>
					<span>SHAPE OF NEST</span>
				</div>

				<span>YẾN SÀO CHẤT LƯỢNG CAO - NÂNG CAO SỨC KHỎE SỐNG</span>

				<a href="#trang-chu">TRỞ VỀ ĐẦU TRANG ↑</a>
			</footer>
		</section>
	);
}

// ==========================================
// ALL SECTIONS
// ==========================================

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
