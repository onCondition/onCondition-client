function getKoreanTimeString(date) {
  const lengthOfSecond = 3;

  return new Date(date).toLocaleString("ko-KR", { timeZone: "asia/Seoul" }).slice(0, -lengthOfSecond);
}

function getKoreanDateString(date) {
  return new Date(date).toLocaleDateString("ko-KR", { timeZone: "asia/Seoul" });
}

export { getKoreanTimeString, getKoreanDateString };
