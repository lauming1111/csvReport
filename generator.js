const fs = require('fs');
const { Promise } = require('bluebird');
const path = require('path');
const os = require('os');
const moment = require('moment');

const config = require('./config');

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
    // timestamp from old to new
    return r.sort();
};

// Generate JSON records
const whileLoopJSON = async (filename, secInDay) => {
    let start = 0;
    while (start < config.maxRecords) {
        const customerID = randomNumber(config.customerID.range[0], config.customerID.range[1]);
        // need to follow the header ordering
        await fs.promises.appendFile(path.join(config.csvExportTo, `${filename}.csv`), [
            start,
            moment(secInDay[start], "X").format(config.timeFormat),
            customerID,
            `${customerID}${randomNumber(config.serviceID.range[0], config.serviceID.range[1]).toString().padStart(3, 0)}`,
            config.country[randomNumber(0, config.country.length - 1)],
            randomNumber(config.usage.range[0], config.usage.range[1]),
        ].join() + '\n');
        start++;
    }
};

(async () => {
    const startTime = moment.now();
    console.log(`Starting with config ${JSON.stringify(config, null, 2)}`);

    // create folder if not exist
    if (!fs.existsSync(config.csvExportTo)) {
        fs.mkdirSync(config.csvExportTo, { recursive: true });
    }

    const secInDay = timePickerList(); // generate time that can share to all rows
    console.log(`generated ${secInDay.length} timestamp`);


    // Export CSV
    const dateRange = moment(config.workingDate.to, config.workingDate.format).diff(moment(config.workingDate.since, config.workingDate.format), 'days');
    console.log(`generating json`);
    await Promise.map([...Array(dateRange).keys()], async (date) => {
        const filename = moment(config.workingDate.since, config.workingDate.format).add(date, 'day').format(config.outputFormat);

        console.log(`Writing headers ${config.csvHeaders} ${filename}.csv to ${config.csvExportTo}`);
        // Recreate file and add header in the csv
        await fs.promises.writeFile(path.join(config.csvExportTo, `${filename}.csv`), config.csvHeaders.join() + '\n');
        console.log(`Writing contents ${config.csvHeaders} ${filename}.csv to ${config.csvExportTo}`);
        // Write random records
        await whileLoopJSON(filename, secInDay);
    }, { concurrency: config.maxConcurrency || os.cpus().length }); // run in parallel

    const endTime = moment.now();
    console.log(`Performance:
start time: ${startTime}
end time ${endTime}
duration: ${(endTime - startTime) / 1000} sec`);
})();