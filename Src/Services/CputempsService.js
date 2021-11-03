const { getInfluxWriteApi, getInfluxQueryApi } = require('../../Config/influxdb');
const si = require('systeminformation');


/**
 * Class for managing influx CPU temperature DB.
 */
class CpuTempsService {
    constructor() {
        this.writeApi = getInfluxWriteApi();
        si.cpu((data) => {
            const { manufacturer, brand } = data;
            this.writeApi.useDefaultTags({ manufacturer, brand });
        });
        this.queryApi = getInfluxQueryApi();

        this.insertOne = this.insertOne.bind(this);
        this.query = this.query.bind(this);
    }

    async insertOne(cpuTemp) {
        this.writeApi.writePoint(cpuTemp);
        await this.writeApi.flush();
    }

    query(fluxQuery, cb) {
        const items = [];
        this.queryApi.queryRows(fluxQuery, {
            next(row, tableMeta) {
                const obj = tableMeta.toObject(row);
                items.push(obj);
            },
            error(error) { throw error; },
            complete() { cb(items); }
        });
    }
}

module.exports = CpuTempsService;