import React from "react";
import PlantList from "../../components/plants/plantList";
import Banner from "./banner";
import PlantGallery from "../../components/gallery/plantGallery";
import HomeNews from "../../components/home/homeNews";
import PlantHighlight from "../../components/home/homeNewsRight";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <PlantGallery />
      <HomeNews />
      <PlantHighlight/>
    </div>
  );
};

export default HomePage;
