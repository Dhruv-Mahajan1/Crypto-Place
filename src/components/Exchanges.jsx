import React from "react";
import { useGetExchangesQuery } from "../services/cryptoApi";
import Loader from "./Loader";
import Error from "./Error";
const Exchanges = () => {
  const { data, isFetching, error } = useGetExchangesQuery();
  if (isFetching) return <Loader />;
  if (error) return <Error />;
  console.log(data);
  return (
    <div>
      <h1>kk</h1>
    </div>
  );
};

export default Exchanges;
