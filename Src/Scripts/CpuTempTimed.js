const { getCpuTemperature } = require('./GetCpuTemp');
const axios = require('axios');

const request_url = process.env.APP_URL + ':' + process.env.PORT + '/cputemps';
const postCpuTemp = async () => {
    try {
        const cpuTemp = await getCpuTemperature();
        await axios.post(request_url, { temperature: cpuTemp });
        console.log(`InfluxDB Write {${cpuTemp}} SUCCESS`);
    }
    catch (err) {
        console.log("InfluxDB Write FAILED");
        if (err.response) err = err.response.data;
        console.log(err);
    }
}

module.exports = () => setInterval(postCpuTemp, 10000);
