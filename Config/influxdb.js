const { InfluxDB } = require('@influxdata/influxdb-client');

const url = process.env.INFLUX_URL;
const token = process.env.INFLUX_TOKEN;
const org = process.env.INFLUX_ORG;
const bucket = process.env.INFLUX_BUCKET;

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