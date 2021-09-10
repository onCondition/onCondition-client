import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Radar } from "react-chartjs-2";

import GraphWrapper from "./GraphWrapper";
import theme from "../../theme";
import SIZE from "../../constants/numbers";
import PropTypes from "prop-types";
import { convertToRadar } from "../../utils/graphData";

const DragBar = styled.input.attrs({
  type: "range",
})`
  -webkit-appearance: none;
  width: 80%;
  height: 50px;
  padding: 20px;
  margin: 10px;
  border-radius: 3rem;
  box-shadow: ${({ theme }) => theme.shadow.main};
  background-color: ${({ theme }) => theme.background.main};

  &&::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 30px;
    height: 30px;
    margin-top: -10px;
    border-radius: 50%;
    background: ${({ theme }) => theme.background.graph};
    box-shadow: ${({ theme }) => theme.shadow.sub};
    cursor: pointer;
  }

  &&::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    height: 10px;
    border-radius: 3rem;
    box-shadow: ${({ theme }) => theme.shadow.range};
    background: ${({ theme }) => theme.background.graph};
  }
`;

function RadarGraph({ categories, dataPerDate }) {
  const latestDayIndex = -1;
  const [data, setData] = useState([]);
  const [displayDateIndex, setDisplayDateIndex] = useState(latestDayIndex);

  useEffect(() => {
    const newData = convertToRadar(categories, dataPerDate);
    setData(newData);
  }, []);

  const radarOptions = {
    datasets: {
      radar: {
        borderColor: theme.background.sub,
        backgroundColor: theme.background.graphData,
      },
    },
    scales: {
      r: {
        min: 0,
        max: 10,
        grid: {
          color: theme.background.main,
        },
        ticks: {
          backdropColor: "transparent",
          stepSize: 2,
          color: theme.text.sub,
          font: {
            size: SIZE.TEXT.SMALL,
          },
        },
        pointLabels: {
          color: theme.text.sub,
          font: {
            size: SIZE.TEXT.SMALL,
          },
        },
      },
    },
    animation: {
      duration: 0,
    },
  };

  const handleRangeInput = function ({ target }) {
    console.log(target.value, data[data.length + displayDateIndex]);
    setDisplayDateIndex(Number(target.value));
  };

  return (
    <>
      <GraphWrapper>
        <Radar
          data={data[data.length + displayDateIndex]}
          options={radarOptions}
        />
      </GraphWrapper>
      <DragBar
        min={0 - data.length} max={latestDayIndex}
        value={displayDateIndex}
        onChange={handleRangeInput}
      />
    </>
  );
}

RadarGraph.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
  dataPerDate: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.number)),
};

export default RadarGraph;
