const fs = require("fs");
const LOG_PATH = "./logs/logs.json";

module.exports = {
  log(key, value) {
    let content = {};
    console.log(key, value);

    fs.readFile(LOG_PATH, "utf8", (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      content = JSON.parse(data);
      content[key] = value;
      fs.writeFile(LOG_PATH, JSON.stringify(content), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  },
};
