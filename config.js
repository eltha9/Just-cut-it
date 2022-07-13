function toDay() {
  const today = new Date();
  const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
  const month =
    today.getMonth() + 1 < 10
      ? `0${today.getMonth() + 1}`
      : today.getMonth() + 1;
  const year = today.getFullYear();

  return `${year}-${month}-${day}`;
}

module.exports = {
  CRON_DELAY: 30, // in minutes
  MAILS: [],
  TARGET: {
    _base: "",
  },
  KILL_DATE: "",
};
