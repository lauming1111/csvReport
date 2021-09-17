module.exports = {
    // run parallel job base on CPU   
    maxConcurrency: 0,
    // csv export to, only support full path
    csvExportTo: '/tmp',
    // date format that following Moment.js
    outputFormat: "YYYY-MM-DD",
    // maxRecords: 1000000,
    maxRecords: 5,
    csvHeaders: ['ID', 'randomTime', 'customerID', 'serviceID', 'country', 'usage'],
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