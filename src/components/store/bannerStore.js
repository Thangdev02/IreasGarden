import React, { useEffect, useState } from "react";
import "../store/bannerStore.css"; 
import ScrollReveal from "scrollreveal";

const BannerStore = () => {
  
    ScrollReveal().reveal(".bannerStore", {
        delay: 1000,
        distance: "50px",
        origin: "left",
        duration: 1200,
        opacity: 0,
      });
  
      ScrollReveal().reveal(".bannerStore-text", {
        delay: 1200,
        distance: "50px",
        origin: "bottom",
        duration: 800,
        opacity: 0,
      });

  return (
    <div className="bannerStore">
      <p className="bannerStore-text">
        Ireas Garden's Products
      </p>
     
    </div>
  );
};

export default BannerStore;
