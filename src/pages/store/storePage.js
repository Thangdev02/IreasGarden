import React from "react";
import PlantList from "../../components/plants/plantList";
import FilterStore from "../../components/store/filterStore";
import BannerStore from "../../components/store/bannerStore";

const StorePage = () => {
  return (
    <div>
        <BannerStore/>
        <FilterStore/>
      {/* <PlantList /> */}
    </div>
  );
};

export default StorePage;
