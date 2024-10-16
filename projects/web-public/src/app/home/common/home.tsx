"use client";

import Header from "utils/components/header/header";
import Lines from "./lines";
import { HomeContainer } from "./style";

const Home = () => {
  return (
    <HomeContainer>
      <Header />
      <Lines />
    </HomeContainer>
  );
};

export default Home;
