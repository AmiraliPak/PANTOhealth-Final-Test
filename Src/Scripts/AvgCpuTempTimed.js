const AvgCpuTempModel = require("../Models/AvgCpuTempModel");
const avgCpuTempService = new (require("../Services/AvgCpuTempService"))(AvgCpuTempModel);
const CpuTempModel = require("../Models/CpuTempModel");
const cpuTempService = new (require("../Services/CputempsService"))();


const TIME_INTERVAL = '5m';
const fluxQuery = `\
    from(bucket:"${process.env.INFLUX_BUCKET}")\
    |> range(start: -${TIME_INTERVAL})\
    |> filter(fn:(r) => r._measurement == "${CpuTempModel.name}" and r._field == "${CpuTempModel.field}")\
    |> mean()\
    `;

const postAvgCpuTemp = async () => {
    try {
        cpuTempService
            .query(fluxQuery, async (results) => {
                if (!results || results.length == 0)
                    console.log("InfluxDB Query FAILED");
                
                const result = results[0];
                const avgCpuTemp = {
                    avgTemp: result._value,
                    cpu: {
                        manufacturer: result.manufacturer,
                        brand: result.brand
                    },
                    from: result._start,
                    to: result._stop
                };
                await avgCpuTempService.insertOne(avgCpuTemp);
                console.log(`MongoDB Write {${result._value}} SUCCESS`);
            });
        
    }
    catch (err) {
        console.log("AvgCpuTempTimed script FAILED");
        console.log(err);
    }
}

module.exports = () => setInterval(postAvgCpuTemp, 300000);
