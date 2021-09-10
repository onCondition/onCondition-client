function sortData(condition) {
  const {
    activityData,
    mealData,
    sleepData,
    albumData,
    gridData,
  } = condition;

  const categories = ["운동", "식사", "수면"];
  const dataPerCategory = [activityData, mealData, sleepData];
  const dataPerDate = {};

  [...albumData, ...gridData].forEach(({ _id, data }) => {
    categories.push(_id);
    dataPerCategory.push(data);
  });

  dataPerCategory.forEach((data, i) => {
    data.forEach(({ _id, average }) => {
      if (!dataPerDate[_id]) {
        dataPerDate[_id] = Array(categories.length).fill(0);
      }

      dataPerDate[_id][i] = average;
    });
  });

  return [categories, dataPerCategory, dataPerDate];
}

function convertToRadar(categories, dataPerDate) {
  const radarData = Object.keys(dataPerDate).sort().map((date) => {
    const datasets = [{ label: date, data: dataPerDate[date] }];

    return { labels: categories, datasets };
  });

  return radarData;
}

function convertToLine(categories, dataPerDate) {
  const sliceIndex = -7;
  const dates = Object.keys(dataPerDate).sort().slice(sliceIndex);
  const datasets = categories.map((category, i) => {
    const data = dates.map((date) => dataPerDate[date][i]);

    return { label: category, data };
  });

  return { labels: dates, datasets };
}

export { sortData, convertToRadar, convertToLine };
