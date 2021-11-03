const { InfluxDB } = require('@influxdata/influxdb-client');

try {
    var url = process.env.INFLUX_URL;
    var token = process.env.INFLUX_TOKEN;
    var org = process.env.INFLUX_ORG;
    var bucket = process.env.INFLUX_BUCKET;
    if (!token || !org || !bucket)
        throw null;
}
catch{ throw new Error('influx data missing in .env file'); }


const client = new InfluxDB({ url, token });

const connect = () => {
    if (!client) console.error("InfluxDB connection failed");
    else {
        console.log("InfluxDB connected");
        return client;
    }
}
const getInfluxWriteApi = () => client.getWriteApi(org, bucket, 's');
const getInfluxQueryApi = () => client.getQueryApi(org, bucket, 's');

module.exports = {connect, getInfluxWriteApi, getInfluxQueryApi};