import React from "react";
import "../home/homeNews.css"; // We'll define this file in the next step

const HomeNews = () => {
  return (
    <section className="home-news">
      <div className="news-content">
        <div className="news-image">
          <img
            src="https://i.pinimg.com/736x/cd/e8/81/cde881a264cb963f000e124486d8f21b.jpg"
            alt="Garden Plant"
          />
        </div>
        <div className="news-text">
          <h2>Philodendron Florida Beauty Variegata</h2>
          <ul>
            <li style={{ display: "flex", alignItems: "center" }}>
              <span className="icon">&#x2714;</span> Vẻ đẹp độc đáo với lá
              variegated nổi bật.
            </li>
            <li style={{ display: "flex", alignItems: "center" }}>
              <span className="icon">&#x2714;</span> Dễ chăm sóc, thích nghi tốt
              với môi trường trong nhà.
            </li>
            <li style={{ display: "flex", alignItems: "center" }}>
              <span className="icon">&#x2714;</span> Khả năng lọc không khí,
              mang lại không gian sống trong lành.
            </li>
          </ul>
          <h3>Mô Tả: </h3>
          <p className="news-desc">
            "Cây Philodendron Florida Beauty Variegata là một trong những loại
            cây trang trí nội thất đặc biệt với vẻ đẹp nổi bật. Cây nổi tiếng
            với những chiếc lá hình dáng độc đáo, được điểm xuyết bởi các mảng
            màu trắng hoặc vàng sáng trên nền xanh lá, tạo nên sự tương phản ấn
            tượng và cuốn hút. Philodendron Florida Beauty Variegata không chỉ
            mang lại vẻ đẹp sang trọng cho không gian sống mà còn rất dễ chăm
            sóc, thích hợp cho những người yêu cây cảnh ở mọi cấp độ. Với khả
            năng phát triển tốt trong môi trường ánh sáng gián tiếp và độ ẩm vừa
            phải, đây là lựa chọn lý tưởng để tô điểm cho không gian sống hay
            làm việc của bạn."
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeNews;
