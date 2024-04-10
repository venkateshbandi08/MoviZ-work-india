import React, { useState } from "react";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";

const PlayingNow = () => {
  const [endpoint, setEndpoint] = useState("movie");

  const { data, loading } = useFetch(`/movie/now_playing`);

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Playing in theatres</span>
      </ContentWrapper>
      <Carousel endpoint={endpoint} data={data} loading={loading} />
    </div>
  );
};

export default PlayingNow;
