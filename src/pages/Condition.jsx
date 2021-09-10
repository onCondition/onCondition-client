import React, { useEffect, useState } from "react";
import styled from "styled-components";

import ContentViewer from "../components/ContentViewer";
import HeartCounter from "../components/HeartCounter";
import Button from "../components/Button";
import LineGraph from "../components/graphs/LineGraph";
import RadarGraph from "../components/graphs/RadarGraph";
import { sortData } from "../utils/graphData";
import { getCondition } from "../api/condition";

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

function Condition() {
  const [isRadarGraph, setIsRadarGraph] = useState(true);
  const [categories, setCategories] = useState([]);
  const [dataPerDate, setDataPerDate] = useState(null);
  const [status, setStatus] = useState([]);
  const [heartCount, setHeartCount] = useState(0);

  useEffect(() => {
    async function loadCondition() {
      const conditionData = await getCondition();
      const [
        loadedCategories, dataPerCategory, loadedDataPerDate,
      ] = sortData(conditionData);

      const loadedStatus = dataPerCategory.map((data, i) => {
        let total = data.length;
        const sum = data.reduce((sum, { average }) => {
          if (!average) {
            total--;

            return sum;
          } else {
            return sum + average;
          }
        }, 0);

        return {
          category: loadedCategories[i],
          heartCount: sum ? sum / total : 0,
        };
      });

      let total = loadedStatus.length;
      const loadedHeartCount = loadedStatus.reduce((sum, { heartCount }) => {
        if (!heartCount) {
          total--;

          return sum;
        } else {
          return sum + heartCount;
        }
      }, 0) / total;

      setCategories(loadedCategories);
      setDataPerDate(loadedDataPerDate);
      setStatus(loadedStatus);
      setHeartCount(loadedHeartCount);
    }

    loadCondition();
  }, []);

  const handleConvertButtonClick = function () {
    setIsRadarGraph(!isRadarGraph);
  };

  const statusInfos = status.map(({ category, heartCount }) => (
    <>
      <span>{category}</span>
      <HeartCounter count={heartCount} />
    </>
  ));

  return (
    <>
      <h1>내 컨디션</h1>
      {!!dataPerDate && <ConditionWrapper>
        <div className="graph">
          <Button
            text="전환"
            onClick={handleConvertButtonClick}
          />
          {isRadarGraph
            ? <RadarGraph
              categories={categories}
              dataPerDate={dataPerDate}
            /> : <LineGraph
              categories={categories}
              dataPerDate={dataPerDate}
            />}
        </div>
        <div className="status">
          <StatusInfo>
            {statusInfos}
          </StatusInfo>
          <ContentViewer
            heartCount={heartCount}
            date={new Date().toDateString()}
            isDescription
          />
        </div>
      </ConditionWrapper>}
    </>
  );
}

export default Condition;
