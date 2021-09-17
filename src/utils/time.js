function getKoreanTimeString(date) {
  return new Date(date).toLocaleString("ko-KR", { timeZone: "asia/Seoul" });
}

function getISOTime(today) {
  today.setUTCHours(
    0, 0, 0, 0,
  );

  const pastMidnightInMS = today;
  const pastMidnight = new Date(pastMidnightInMS);

  return { pastMidnight };
}

export { getISOTime, getKoreanTimeString };
