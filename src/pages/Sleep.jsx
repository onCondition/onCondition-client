import React, { useEffect } from "react";
import { useParams } from "react-router";
// import { useDispatch } from "react-redux";
// import styled from "styled-components";

import BarGraph from "../components/graphs/BarGraph";
import { PrevButton, NextButton } from "../components/PageButton";
// import Button from "../components/Button";
import { getSleepData } from "../api/sleep";
// import { setError } from "../features/errorSlice";

function Sleep() {
  // const [sleepData, setSleepData] = useState(null);
  // const [currentPage, setCurrentPage] = useState(0);
  // const [prevPage, setPrevPage] = useState(null);
  // const [nextPage, setNextPage] = useState(null);
  const { creatorId } = useParams();

  async function getSleep(creatorId) {
    const loadedData = await getSleepData(creatorId);
    // const organizedData = [];

    if (!loadedData) {
      return ("nothing");
    }

    const loadedDataPerDate = Object.values(loadedData);

    // setSleepData(loadedDataPerDate);

    // loadedDataPerDate?.map((data) => {
    //   organizedData.push([data.date, data.duration]);

    return loadedDataPerDate;
  }

  useEffect(() => {
    getSleep(creatorId);
  }, []);

  return (
    <div>
      <h1>수면</h1>
      <div>
        <PrevButton
          // onClick={}
        />
        <div>{creatorId}</div>
        <NextButton
          // onClick={}
        />
      </div>
      <BarGraph
        // IncommingData={data}
      />
    </div>
  );
}

export default Sleep;
