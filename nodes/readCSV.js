const fs = require("fs");
const csv = require("csv-parser");

const getSpreadsheetData = async () => {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream("data.csv")
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(results);
      });
  });
};

module.exports = getSpreadsheetData;
