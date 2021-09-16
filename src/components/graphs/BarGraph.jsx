import React from "react";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";

import theme from "../../theme";
import GraphWrapper from "./GraphWrapper";

// const one = 1;
// const two = 2;
// const three = 3;
// const four = 4;
// const five = 5;
const seven = 7;
const max = 100;
const min = -100;
// const fif = 50;

const NUMBER = { count: seven, min, max };

const options = {
  responsive: true,
  legend: {
    display: false,
    position: "top",
  },
  scales: {
    y: {
      min: 0,
      max: 24,
      grid: {
        color: theme.background.main,
      },
      ticks: {
        backdropColor: "transparent",
        stepSize: 2,
        color: theme.text.sub,
        font: {
          size: theme.fontSizes.graph,
        },
      },
      pointLabels: {
        color: theme.text.sub,
        font: {
          size: theme.fontSizes.graph,
        },
      },
    },
  },
  animation: {
    duration: 0,
  },
};

function BarGraph({ IncomingData }) {
  // const [incomingData, setIncomingData] = useState(IncomingData);

  // useEffect(() => {

  // })
  const data = {
    datasets: [
      {
        backgroundColor: theme.background.sub,
        borderColor: theme.background.sub,
        borderWidth: 2,
        borderRadius: NUMBER.max,
        borderSkipped: false,
        hoverBackgroundColor: theme.background.main,
        hoverBorderColor: theme.background.main,
        data: IncomingData,
      },
    ],
  };

  return (
    <GraphWrapper>
      <Bar
        data={data}
        options={options}
      />
    </GraphWrapper>
  );
}

BarGraph.propTypes = {
  IncomingData: PropTypes.array || PropTypes.object ,
};

export default BarGraph;
