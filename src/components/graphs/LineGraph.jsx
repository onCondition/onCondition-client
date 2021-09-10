import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";

import theme from "../../theme";
import SIZE from "../../constants/numbers";
import { convertToLine } from "../../utils/graphData";

function LineGraph({ categories, dataPerDate }) {
  const [clickedDatasetLabel, setClickedDatasetLabel] = useState(categories[0]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const newData = convertToLine(categories, dataPerDate);
    setData(newData);
  }, []);

  const LineOptions = {
    scales: {
      y: {
        min: 0,
        max: 10,
        ticks: {
          stepSize: 1,
          z: 1,
          color: theme.text.sub,
          font: {
            size: SIZE.TEXT.SMALL,
          },
        },
      },
      x: {
        grid: {
          color: theme.text.sub,
        },
        ticks: {
          color: theme.text.sub,
          font: {
            size: SIZE.TEXT.SMALL,
          },
        },
      },
    },
    elements: {
      point: {
        radius: 10,
      },
    },
    aspectRatio: 1,
    events: ["click"],
    plugins: {
      tooltip: {
        backgroundColor: theme.background.main,
        mode: "dataset",
      },
    },
    borderColor(context) {
      const index = context.datasetIndex;
      const label = data.datasets[index].label;
      if (label === clickedDatasetLabel) {
        return theme.lineGraph.clicked;
      }

      return theme.lineGraph.unclicked;
    },
    backgroundColor(context) {
      const index = context.datasetIndex;
      const label = data.datasets[index].label;
      if (label === clickedDatasetLabel) {
        return theme.lineGraph.clicked;
      }

      return theme.lineGraph.unclicked;
    },
    animation: {
      duration: 0,
    },
  };

  const handleGraphClick = function (element) {
    if (element.length) {
      const clickedDatasetIndex = element[0].datasetIndex;
      const label = data.datasets[clickedDatasetIndex].label;
      setClickedDatasetLabel(label);
    }
  };

  return (
    <>
      {!data.length && <Line
        data={data}
        options={LineOptions}
        getElementAtEvent={handleGraphClick}
      />}
    </>
  );
}

LineGraph.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
  dataPerDate: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.number)),
};

export default LineGraph;
