import React, { useState } from "react";
import styled from "styled-components";
import { Radar, Line } from "react-chartjs-2";

import theme from "../theme";
import ContentViewer from "../components/ContentViewer";
import HeartCounter from "../components/HeartCounter";
import Button from "../components/Button";
import SIZE from "../constants/numbers";

const ConditionWrapper = styled.div`
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.text.main};

  .graph {
    width: 700px;
  }

  .graph button {
    float: right;
  }

  .status {
    flex-basis: 680px;
    align-items: center;
  }
`;

const GraphWrapper = styled.div`
  margin-top: 5rem;
  padding: 5rem;
  border-radius: 2rem;
  background-color: ${({ theme }) => theme.background.graph};
`;

const StatusInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 0.8fr 1fr);
  justify-items: start;
  column-gap: 1rem;
  padding: 20px;
  width: 630px;
  margin: 0 auto;
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.shadow.main};
  background-color: ${({ theme }) => theme.background.main};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

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

function MyCondition() {
  const yesterDayIndex = -1;
  const now = new Date();
  const numberOfLineGraphLabels = 7;
  const [isRadarGraph, setIsRadarGraph] = useState(true);
  const [displayDateIndex, setDisplayDateIndex] = useState(yesterDayIndex);
  const [clickedDatasetLabel, setClickedDatasetLabel] = useState("");

  const labels = ["Meal", "Activity", "Sleep", "Grid", "Album", "Step"];
  // eslint-disable-next-line no-magic-numbers
  const MockRadardatas = [...Array(30)].map((_, i) => {
    const newData = {
      labels,
      datasets: [{
        label: i,
        // eslint-disable-next-line no-magic-numbers
        data: [5, i % 10, 6, 2, 1, 7],
        borderColor: theme.background.sub,
        backgroundColor: theme.background.graphData,
      }],
    };

    return newData;
  });

  const Dates = [...Array(numberOfLineGraphLabels)].map((_, i) => (
    new Date(now.setDate(i - numberOfLineGraphLabels)).toDateString()
  ));

  const MockLineDatas = {
    labels: Dates,
    datasets: [
      {
        label: "Meal",
        // eslint-disable-next-line no-magic-numbers
        data: [5, 4, 3, 2, 1, 5, 7],
      },
      {
        label: "Activity",
        // eslint-disable-next-line no-magic-numbers
        data: [0, 5, 3, 2, 1, 5, 7],
      },
      {
        label: "Sleep",
        // eslint-disable-next-line no-magic-numbers
        data: [0, 0, 0, 0, 0, 0, 0],
      },
      {
        label: "1",
        // eslint-disable-next-line no-magic-numbers
        data: [1, 1, 1, 1, 1, 1, 1],
      },
      {
        label: "2",
        // eslint-disable-next-line no-magic-numbers
        data: [10, 4, 3, 8, 9, 5, 7],
      },
      {
        label: "3",
        // eslint-disable-next-line no-magic-numbers
        data: [5, 10, 3, 2, 4.5, 3.7, 8],
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        grid: {
          color: theme.background.main,
        },
        ticks: {
          backdropColor: "transparent",
          stepSize: 2,
        },
        pointLabels: {
          font: {
            size: SIZE.TEXT.SMALL,
          },
        },
      },
    },
  };

  const LineOptions = {
    scale: {
      min: 0,
      max: 10,
      ticks: {
        stepSize: 1,
      },
    },
    interaction: {
      mode: "dataset",
    },
    borderColor(context) {
      const index = context.datasetIndex;
      const label = MockLineDatas.datasets[index].label;
      if (label === clickedDatasetLabel) {
        return "red";
      }

      return "black";
    },
    onClick: (_, elements) => {
      if (!elements.length) {
        return;
      }

      console.log(elements[0]._index);
    },
  };

  const handleRangeInput = function ({ target }) {
    setDisplayDateIndex(Number(target.value));
  };

  const handleConvertButtonClick = function () {
    setIsRadarGraph(!isRadarGraph);
  };

  const handleChartClick = function (element) {
    if (element.length) {
      const clickedDatasetIndex = element[0].datasetIndex;
      const label = MockLineDatas.datasets[clickedDatasetIndex].label;
      setClickedDatasetLabel(label);
    }
  };

  const statusInfos = labels.map((label) => (
    <>
      <span>{label}</span>
      <HeartCounter />
    </>
  ));

  return (
    <>
      <h1>내 컨디션</h1>
      <ConditionWrapper>
        <div className="graph">
          <Button
            text="전환"
            onClick={handleConvertButtonClick}
          />
          <GraphWrapper>
            {isRadarGraph
              ? <Radar
                data={MockRadardatas[MockRadardatas.length + displayDateIndex]}
                options={radarOptions}
              /> : <Line
                data={MockLineDatas}
                options={LineOptions}
                getElementAtEvent={handleChartClick}
              />}
          </GraphWrapper>
          {isRadarGraph
            && <DragBar
              min="-30" max="-1"
              value={displayDateIndex}
              onChange={handleRangeInput}
            />}
        </div>
        <div className="status">
          <StatusInfo>
            {statusInfos}
          </StatusInfo>
          <ContentViewer
            date={new Date().toDateString()}
            isDescription
          />
        </div>
      </ConditionWrapper>
    </>
  );
}

export default MyCondition;
