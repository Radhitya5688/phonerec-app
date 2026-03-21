const csv = require('csvtojson');
const fs = require('fs');

csv()
  .fromFile('phones.csv')
  .then((jsonArray) => {
    fs.writeFileSync('phones.json', JSON.stringify(jsonArray, null, 2));
    console.log('Converted to JSON');
  });