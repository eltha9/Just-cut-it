const conf = require("./config");
const https = require("https");
const logger = require("./libs/logger");
const mailler = require("./libs/mailler");

function urlBuilder(target) {
  const { _base, ...options } = target;
  let url = `${_base}?`;
  let i = 0;
  for (const [key, value] of Object.entries(options)) {
    i++;
    url += `${key}=${value}`;
    if (i < Object.entries(options).length) url += "&";
  }
  return url;
}

function doStuff(data) {
  console.log(data);
  if (new Date(conf.KILL_DATE).getTime() > new Date(data.next_slot).getTime()) {
    // send email
    conf.MAILS.forEach((mail) => {
      mailler.send(mail, { text: "test" });
    });

    // log next slot recieved
    logger.log(toDay(), {
      next_slot: data.next_slot,
      is_before_kill_date: true,
    });
  } else {
    logger.log(toDay(), {
      next_slot: data.next_slot,
      // just fuck me if it will be always equal to false
      is_before_kill_date: false,
    });

    conf.MAILS.forEach((mail) => {
      mailler.send(mail, { text: "test" });
    });
  }
}

function toDay() {
  const today = new Date();
  const minutes =
    today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes();
  const hours =
    today.getHours() < 10 ? `0${today.getHours()}` : today.getHours();
  const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
  const month =
    today.getMonth() + 1 < 10
      ? `0${today.getMonth() + 1}`
      : today.getMonth() + 1;
  const year = today.getFullYear();

  return `${year}-${month}-${day}-${hours}-${minutes}`;
}

// request part
const req = https.request(urlBuilder(conf.TARGET), (res) => {
  res.on("data", (d) => {
    const data = JSON.parse(d.toString());
    doStuff(data);
  });
});

req.on("error", (error) => {
  logger.log(toDay(), "error");
});

req.end();
