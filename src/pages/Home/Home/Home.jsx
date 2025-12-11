import React from "react";
import Banner from "./Banner/Banner";
import AvailableLoans from "./Banner/AvailableLoans";
import { useLoaderData } from "react-router";

const Home = () => {
  const loans = useLoaderData();
  return (
    <div>
      <Banner />
      <AvailableLoans loans={loans} />
    </div>
  );
};

export default Home;
