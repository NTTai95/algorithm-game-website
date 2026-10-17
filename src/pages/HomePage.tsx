import React from 'react'

interface HomePageProps {
  onNavigate: (hash: string) => void
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-pulse">●</span>
            <span>ALGORITHM WAREHOUSE // INDUSTRIAL DSA ENGINE</span>
          </div>

          <h1 className="hero-title">
            Mô Phỏng Cấu Trúc Dữ Liệu &amp; Giải Thuật Kho Hàng Tự Động
          </h1>

          <p className="hero-subtitle">
            Học và làm chủ các giải thuật sắp xếp kinh điển thông qua việc lập trình
            điều khiển hệ thống robot kho bãi tự động: Cảm biến laser{' '}
            <strong className="text-cyan">WeightScanner</strong>, cần cẩu cơ học{' '}
            <strong className="text-amber">SingleCrane</strong> và kho hàng{' '}
            <strong className="text-purple">wareHouse</strong>.
          </p>

          <div className="hero-cta-group">
            <button
              className="btn-hero-primary"
              onClick={() => onNavigate('#/level/bubble-sort')}
            >
              <span>▶</span>
              <span>Chơi Màn 1: Bubble Sort</span>
            </button>
            <button
              className="btn-hero-secondary"
              onClick={() => onNavigate('#/tutorial/0.1')}
            >
              <span>🎓</span>
              <span>Bắt Đầu Với Màn 0 (Tutorials)</span>
            </button>
          </div>
        </div>

        {/* Visual Hero Art */}
        <div className="hero-visual-card">
          <div className="visual-terminal-header">
            <div className="terminal-dots">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>
            <span className="terminal-title">Solution.java (Multi-Machine Standard)</span>
          </div>
          <pre className="visual-code-preview">
            <code>{`public static void solve(wareHouse wareHouse, 
                         SingleCrane singleCrane, 
                         WeightScanner weightScanner) {
    int countBox = wareHouse.getCountBox();
    for (int i = 0; i < countBox - 1; i++) {
        boolean swapped = false;
        for (int j = 0; j < countBox - 1 - i; j++) {
            int w1 = weightScanner.getWeightBox();
            weightScanner.move(1);
            int w2 = weightScanner.getWeightBox();
            if (w1 > w2) {
                singleCrane.swap();
                swapped = true;
            }
            singleCrane.move(1);
        }
        if (!swapped) break;
        singleCrane.moveStart();
        weightScanner.moveStart();
    }
}`}</code>
          </pre>
          <div className="visual-status-bar">
            <span>● Status: READY FOR INDUSTRIAL DEPLOYMENT</span>
            <span>OOP Java Virtual Machine</span>
          </div>
        </div>
      </section>

      {/* Industrial Machines Arsenal */}
      <section className="home-section">
        <div className="section-header-center">
          <div className="section-eyebrow">HỆ THỐNG CỖ MÁY</div>
          <h2 className="section-heading">Bộ Ba Cỗ Máy Kho Hàng Tự Động</h2>
          <p className="section-subtext">
            Thiết kế dựa trên nguyên lý Đơn Nhiệm (Single Responsibility Principle) - Mỗi cỗ máy chịu trách nhiệm một chức năng chuyên biệt.
          </p>
        </div>

        <div className="machine-cards-grid">
          {/* Machine 1: Warehouse */}
          <div className="machine-card">
            <div className="machine-card-icon icon-warehouse">📦</div>
            <div className="machine-card-header">
              <span className="machine-tag tag-purple">Môi Trường Kho</span>
              <h3 className="machine-name">wareHouse</h3>
            </div>
            <p className="machine-desc">
              Quản lý tổng quan kho hàng, lưu trữ mảng các thùng hàng và bảo toàn nguyên vẹn số lượng dữ liệu.
            </p>
            <div className="machine-specs">
              <div className="spec-item">
                <span className="spec-label">Hàm chính:</span>
                <code className="spec-code">wareHouse.getCountBox()</code>
              </div>
              <div className="spec-item">
                <span className="spec-label">Vai trò:</span>
                <span className="spec-val">Lấy số lượng thùng</span>
              </div>
            </div>
          </div>

          {/* Machine 2: WeightScanner */}
          <div className="machine-card">
            <div className="machine-card-icon icon-scanner">🔍</div>
            <div className="machine-card-header">
              <span className="machine-tag tag-cyan">Cảm Biến Laser</span>
              <h3 className="machine-name">WeightScanner</h3>
            </div>
            <p className="machine-desc">
              Di chuyển trên thanh ray cảm biến trung gian, bắn tia laser đo đạc khối lượng thực tế (kg) của từng kiện hàng.
            </p>
            <div className="machine-specs">
              <div className="spec-item">
                <span className="spec-label">Đo khối lượng:</span>
                <code className="spec-code">weightScanner.getWeightBox()</code>
              </div>
              <div className="spec-item">
                <span className="spec-label">Di chuyển:</span>
                <code className="spec-code">weightScanner.move(1) / moveStart()</code>
              </div>
            </div>
          </div>

          {/* Machine 3: SingleCrane */}
          <div className="machine-card">
            <div className="machine-card-icon icon-crane">🏗️</div>
            <div className="machine-card-header">
              <span className="machine-tag tag-amber">Cần Cẩu Cơ Học</span>
              <h3 className="machine-name">SingleCrane</h3>
            </div>
            <p className="machine-desc">
              Di chuyển trên giàn ray trên cao, sở hữu tay gắp tải trọng lớn để hoán đổi vị trí của hai thùng hàng liền kề.
            </p>
            <div className="machine-specs">
              <div className="spec-item">
                <span className="spec-label">Hoán đổi:</span>
                <code className="spec-code">singleCrane.swap()</code>
              </div>
              <div className="spec-item">
                <span className="spec-label">Di chuyển:</span>
                <code className="spec-code">singleCrane.move(1) / moveStart()</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campaign Roadmap */}
      <section className="home-section">
        <div className="section-header-center">
          <div className="section-eyebrow">LỘ TRÌNH HUẤN LUYỆN &amp; CHIẾN DỊCH</div>
          <h2 className="section-heading">Hệ Thống Màn Chơi (Level Roadmap)</h2>
          <p className="section-subtext">
            Bắt đầu từ việc làm quen từng cỗ máy ở Màn 0 trước khi bước vào các bài toán sắp xếp dữ liệu phức tạp.
          </p>
        </div>

        {/* Series 1: Tutorials */}
        <div className="series-container">
          <div className="series-header">
            <h3 className="series-title">🎓 Chuỗi Màn 0: Huấn Luyện Vận Hành Máy Móc (Tutorials)</h3>
            <span className="series-tag">3 MÀN LUYỆN TẬP</span>
          </div>

          <div className="levels-grid">
            <div className="level-card level-card-active">
              <div className="level-card-top">
                <span className="level-badge badge-cyan">Màn 0.1</span>
                <span className="level-status-pill status-open">Đang mở</span>
              </div>
              <h4 className="level-title">Cảm Biến WeightScanner</h4>
              <p className="level-desc">
                Điều khiển máy quét đọc khối lượng và di chuyển lần lượt qua tất cả thùng hàng trên ray cảm biến.
              </p>
              <div className="level-footer">
                <span className="level-machines">🔍 WeightScanner</span>
                <button
                  className="btn-play-level"
                  onClick={() => onNavigate('#/tutorial/0.1')}
                >
                  Vào Chơi →
                </button>
              </div>
            </div>

            <div className="level-card level-card-active">
              <div className="level-card-top">
                <span className="level-badge badge-amber">Màn 0.2</span>
                <span className="level-status-pill status-open">Đang mở</span>
              </div>
              <h4 className="level-title">Cần Cẩu SingleCrane</h4>
              <p className="level-desc">
                Điều khiển cần cẩu thực hiện hoán đổi các cặp thùng hàng liền kề và di chuyển trên giàn ray.
              </p>
              <div className="level-footer">
                <span className="level-machines">🏗️ SingleCrane</span>
                <button
                  className="btn-play-level"
                  onClick={() => onNavigate('#/tutorial/0.2')}
                >
                  Vào Chơi →
                </button>
              </div>
            </div>

            <div className="level-card level-card-active">
              <div className="level-card-top">
                <span className="level-badge badge-purple">Màn 0.3</span>
                <span className="level-status-pill status-open">Đang mở</span>
              </div>
              <h4 className="level-title">Hiệu Chuẩn Phối Hợp Combo</h4>
              <p className="level-desc">
                Phối hợp máy quét đo khối lượng và ra lệnh cho cần cẩu hoán đổi khi phát hiện nghịch thế.
              </p>
              <div className="level-footer">
                <span className="level-machines">🔍 + 🏗️ Cả hai máy</span>
                <button
                  className="btn-play-level"
                  onClick={() => onNavigate('#/tutorial/0.3')}
                >
                  Vào Chơi →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Series 2: Algorithms */}
        <div className="series-container">
          <div className="series-header">
            <h3 className="series-title">⚡ Chuỗi Giải Thuật Sắp Xếp Kinh Điển (Sorting Algorithms)</h3>
            <span className="series-tag">CHIẾN DỊCH CHÍNH</span>
          </div>

          <div className="levels-grid">
            {/* Level 1: Bubble Sort */}
            <div className="level-card level-card-active level-card-highlight">
              <div className="level-card-top">
                <span className="level-badge badge-emerald">Màn 1: Bubble Sort</span>
                <span className="level-status-pill status-featured">🔥 Nổi Bật</span>
              </div>
              <h4 className="level-title">Sắp Xếp Nổi Bọt Đa Cỗ Máy</h4>
              <p className="level-desc">
                Sử dụng phối hợp WeightScanner và SingleCrane để sắp xếp kho hàng tăng dần theo khối lượng thùng hàng.
              </p>
              <div className="level-footer">
                <span className="level-machines">📦 + 🔍 + 🏗️ Đầy đủ</span>
                <button
                  className="btn-play-level btn-play-featured"
                  onClick={() => onNavigate('#/level/bubble-sort')}
                >
                  Chơi Màn 1 →
                </button>
              </div>
            </div>

            {/* Level 2: Selection Sort */}
            <div className="level-card level-card-locked">
              <div className="level-card-top">
                <span className="level-badge badge-locked">Màn 2: Selection Sort</span>
                <span className="level-status-pill status-locked">🔒 Khóa</span>
              </div>
              <h4 className="level-title">Sắp Xếp Chọn (Selection Sort)</h4>
              <p className="level-desc">
                Tìm kiếm kiện hàng nhẹ nhất trong mảng chưa sắp xếp và đưa về vị trí đầu tiên.
              </p>
              <div className="level-footer">
                <span className="level-machines text-muted">Mở khóa tại Sprint 3</span>
                <button className="btn-play-level" disabled>
                  Chưa Mở
                </button>
              </div>
            </div>

            {/* Level 3: Insertion Sort */}
            <div className="level-card level-card-locked">
              <div className="level-card-top">
                <span className="level-badge badge-locked">Màn 3: Insertion Sort</span>
                <span className="level-status-pill status-locked">🔒 Khóa</span>
              </div>
              <h4 className="level-title">Sắp Xếp Chèn (Insertion Sort)</h4>
              <p className="level-desc">
                Chèn từng kiện hàng vào đúng vị trí của phần mảng đã sắp xếp ở phía trước.
              </p>
              <div className="level-footer">
                <span className="level-machines text-muted">Mở khóa tại Sprint 3</span>
                <button className="btn-play-level" disabled>
                  Chưa Mở
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div>
          <strong>ALGO WAREHOUSE</strong> // Nền tảng học thuật cấu trúc dữ liệu và giải thuật trực quan.
        </div>
        <div className="footer-links">
          <span>Java Virtual Machine Runner</span>
          <span>•</span>
          <span>Phaser 3 Game Engine</span>
          <span>•</span>
          <span>Rich Pedagogical Diagnostics</span>
        </div>
      </footer>
    </div>
  )
}
