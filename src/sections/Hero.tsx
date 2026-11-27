export default function Hero() {
	return (
		<section className="hero" id="trang-chu">
			{/* <FlyingSwift /> */}
			<div className="hero-glow hero-glow-left" />
			<div className="hero-glow hero-glow-right" />

			<div className="hero-topline">
				{/* <span>THE ART OF NATURE</span> */}
				{/* <span>EST. VIETNAM</span> */}
			</div>

			<div className="hero-content">
				<div className="hero-heading">
					<span className="hero-eyebrow">MÓN QUÀ TỪ THIÊN NHIÊN</span>

					<h1>
						Tinh hoa
						<br />
						<em>thuần khiết.</em>
					</h1>
				</div>
				<img
					className="son-mobile-ingredient son-mobile-hero-image"
					src="/images/yen-sao.png"
					alt="Tổ yến thiên nhiên SON"
					fetchPriority="high"
				/>

				<div className="hero-description">
					<span className="small-line" />

					<p>
						Từ vẻ đẹp nguyên bản của thiên nhiên,
						<br />
						SON gửi gắm sự tinh tế và sức khỏe trong từng món quà.
					</p>

					<a className="explore-button" href="#ve-son">
						KHÁM PHÁ SON
						<span>↗</span>
					</a>
				</div>
			</div>

			{/* <div className="hero-bottom">
        <div className="hero-index">
          <span>01 / 08</span>
          <span>SON — SHAPE OF NEST</span>
        </div>

        <a className="scroll-indicator" href="#about">
          <span>SCROLL TO DISCOVER</span>
          <span className="scroll-arrow">↓</span>
        </a>
      </div> */}

			<div className="hero-side-text">SON — SHAPE OF NEST</div>
		</section>
	);
}
