import React from 'react';
import '../about/ourGarden.css'; // We'll define this file in the next steps

const OurGarden = () => {
  return (
    <div className="our-garden-container">
      <div className="text-overlay">
        <h1 className="transparent-text">IREAS GARDEN</h1>
        <p>Explore the beauty of nature</p>
        <p>and experience the serenity</p>
        <p>that our garden offers.</p>
      </div>
      <div className="image-background"></div>
    </div>
  );
};

export default OurGarden;
