const { Point } = require("@influxdata/influxdb-client");

class CpuTemperature extends Point {
    static name = 'temperature';
    static field = 'value';
    constructor(value) {
        super(CpuTemperature.name);
        this.value = value;
        this.floatField(CpuTemperature.field, value);
    }
}

module.exports = CpuTemperature;