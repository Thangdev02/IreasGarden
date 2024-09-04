import React, { useEffect, useState } from "react";
import ScrollReveal from "scrollreveal";
import { useNavigate } from "react-router-dom";
import "../home/banner.css"; // Assuming the CSS file is named Banner.css

const Banner = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
  
    useEffect(() => {
      ScrollReveal().reveal('.banner-text', {
        delay: 400,
        distance: '50px',
        origin: 'left',
        opacity: 0,
        duration: 1200,
        reset: false,
      });
  
      ScrollReveal().reveal('.search-container', {
        delay: 600,
        distance: '50px',
        origin: 'bottom',
        opacity: 0,
        duration: 1600,
        reset: false,
      });
    }, []);
  
    const handleSearch = () => {
      if (searchTerm.trim()) {
        navigate(`/store?search=${searchTerm}`);
      }
    };

  return (
    <div className="banner">
      <p className="banner-text">
        Growing your garden now and into the future
      </p>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for plants, tools, etc..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default Banner;
