import React from "react";
import "../home/homeNewsRight.css"; // Updated CSS file with new class names
import MonsIMG from "../../assets/images/MonsPostNew.png";
const PlantHighlight = () => {
  return (
    <section className="plant-highlight-section">
      <div className="plant-highlight-content">
        <div className="plant-text">
          <h2>Monstera Deliciosa</h2>
          <ul>
            <li className="plant-feature">
              <span className="check-icon">&#x2714;</span> Lá lớn và độc đáo,
              tạo điểm nhấn thẩm mỹ.
            </li>
            <li className="plant-feature">
              <span className="check-icon">&#x2714;</span> Dễ chăm sóc, thích
              nghi tốt với môi trường trong nhà.
            </li>
            <li className="plant-feature">
              <span className="check-icon">&#x2714;</span> Giúp lọc không khí,
              cải thiện chất lượng không gian sống.
            </li>
          </ul>
          <h3>Mô Tả: </h3>
          <p className="plant-description">
            Cây Monstera, còn được biết đến với tên gọi "cây trầu bà lá xẻ," là
            một trong những loại cây nội thất được ưa chuộng nhất hiện nay. Với
            những chiếc lá lớn, xanh mướt, có hình dáng độc đáo với các vết rách
            tự nhiên, Monstera không chỉ mang lại vẻ đẹp hoang dã, nhiệt đới mà
            còn trở thành điểm nhấn thẩm mỹ trong mọi không gian sống.
          </p>
          <p className="plant-description">
            Monstera nổi tiếng vì dễ chăm sóc, thích nghi tốt trong nhiều điều
            kiện ánh sáng khác nhau, đặc biệt là ánh sáng gián tiếp. Điều này
            làm cho Monstera trở thành lựa chọn lý tưởng cho cả những người mới
            bắt đầu trồng cây cảnh. Cây có thể phát triển mạnh mẽ chỉ với việc
            tưới nước đều đặn và duy trì độ ẩm phù hợp.
          </p>
        </div>
        <div className="plant-image-container">
          <img src={MonsIMG} alt="Garden Plant" className="plant-image" />
        </div>
      </div>
    </section>
  );
};

export default PlantHighlight;
