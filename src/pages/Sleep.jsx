import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import BarGraph from "../components/graphs/BarGraph";
import { PrevButton, NextButton } from "../components/PageButton";
import getApi from "../api/category";

function Sleep() {
  const [sleepData, setSleepData] = useState(null);
  const [periods, setPeriods] = useState(null);
  const { get } = getApi("sleep");
  const { creatorId } = useParams();

  async function getSleep(creatorId) {
    const loadedData = await get(creatorId);

    if (!loadedData) {
      return;
    }

    const { data } = loadedData;
    setSleepData(data);
  }

  useEffect(() => {
    getSleep(creatorId);
  }, []);

  useEffect(() => {
    if (sleepData) {
      setPeriods(`${sleepData[0]._id} ~ ${ sleepData[sleepData.length - 1]._id} `);
    }
  }, [sleepData]);

  return (
    <div>
      <h1>수면</h1>
      <div>
        <PrevButton />
        <div>{periods}</div>
        <NextButton />
      </div>
      <BarGraph
        IncomingData={sleepData}
      />
    </div>
  );
}

export default Sleep;
