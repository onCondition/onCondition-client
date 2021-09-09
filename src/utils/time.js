function getKoreanTimeString(date) {
  return new Date(date).toLocaleString("ko-KR", { timeZone: "asia/Seoul" });
}

export { getKoreanTimeString };
