const { parseAsync, parse } = require('json2csv');
const fs = require('fs');
const { Promise } = require('bluebird');
const path = require('path');
const os = require('os');
const moment = require('moment');

const config = {
    // run parallel job base on CPU   
    maxConcurrency: 0,
    // csv export to
    csvExportTo: './tmp',
    // date format that following Moment.js
    outputFormat: "YYYY-MM-DD",
    maxRecords: 1000000,
    workingDate: {
        since: "1-9-2020",
        to: "31-8-2021",
        format: 'DD-M-YYYY'
    },
    // time format that following Moment.js
    timeFormat: "HH:mm:ss",
    customerID: {
        range: [1, 1000]
    },
    serviceID: {
        range: [1, 100]
    },
    country: ['CN', 'UK', 'US', 'FR', 'DE', 'ES', 'CA', 'IN', 'JP', 'KR', 'SG'],
    usage: {
        range: [1, 1000000000]
    },
};

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const timePickerList = () => {
    const cache = [];
    let r = [];
    // 86400 = max sec in a day
    [...Array(86400).keys()].reduce((acc, value) => {
        cache.push(acc);
        return acc + 1;
    }, moment('2000 01 01 00:00:00', 'YYYY DD MM hh:mm:ss').unix());
    // .then(() => {

    console.log(`filling for all records`);
    for (let i = 0; r.length < config.maxRecords; i++) {
        r = [...r, ...cache];
    }
    // return r;
    return r.sort();
    // });
};

// Generate JSON records
const dailyJSON = (secInDay) => [...Array(config.maxRecords).keys()].map((record) => {
    const customerID = randomNumber(config.customerID.range[0], config.customerID.range[1]);
    return {
        ID: record,
        randomTime: moment(secInDay.shift(), "X").format(config.timeFormat),
        customerID,
        serviceID: `${customerID}${randomNumber(config.serviceID.range[0], config.serviceID.range[1]).toString().padStart(3, 0)}`,
        country: config.country[randomNumber(0, config.country.length - 1)],
        usage: randomNumber(config.usage.range[0], config.usage.range[1]),
    };
});


(async () => {
    const startTime = moment.now();
    console.log(`Starting with config ${JSON.stringify(config, null, 2)}`);

    // create folder if not exist
    if (!fs.existsSync(config.csvExportTo)) {
        fs.mkdirSync(config.csvExportTo, { recursive: true });
    }

    const secInDay = timePickerList(); // generate time that can share to all rows
    const useFaster = process.argv[2] === 'true'; // if true, all csv have same data

    // Export CSV
    const dateRange = moment(config.workingDate.to, config.workingDate.format).diff(moment(config.workingDate.since, config.workingDate.format), 'days');
    console.log(`generating json`);
    const data = useFaster && dailyJSON(secInDay);
    await Promise.map([...Array(dateRange).keys()], async (date) => {
        const filename = moment(config.workingDate.since, config.workingDate.format).add(date, 'day').format(config.outputFormat);       
        // const data = dailyJSON(secInDay);
        console.log(`parsing ${filename} json to csv`);
        const csv = parse(useFaster ? data : dailyJSON(secInDay), { fields: Object.keys(data[0]), header: true });

        console.log(`Writing ${filename}.csv to ${config.csvExportTo}`);
        fs.writeFileSync(path.join(config.csvExportTo, `${filename}.csv`), csv);
    }, { concurrency: config.maxConcurrency || os.cpus.length });


    // const csvBody = Object.keys(key).map(header => { r; });

    const endTime = moment.now();
    console.log(`Performance:
start time: ${startTime}
end time ${endTime}
duration: ${(endTime - startTime) / 1000} sec`);
})();