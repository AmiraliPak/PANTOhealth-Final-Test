const si = require('systeminformation');

/**
 * Gets current CPU temperature.
 * @returns {number}
 */
const getCpuTemperature = async () => {
    const data = await si.cpuTemperature();
    if (data.main) { // main could be NaN
        // console.log(`main temperature: ${data.main}`);
        return data.main;
    }
    
    const cpuTemps = data.cores;
    // console.log(`core temperatures: ${cpuTemps}`);
    let lenTemps = 0, sumTemps = 0;
    for (temp of cpuTemps) {
        if (temp) { // temp could be NaN
            sumTemps += temp;
            lenTemps++;
        }
    }
    if (sumTemps == 0 || lenTemps == 0) {
        sumTemps = (Math.random() * 50) + 40;
        lenTemps = 1;
        console.log(`CPU temperature unavailable.
Be sure to have elevated privileges / run as administrator.
Write random number ${sumTemps} instead.`);
    }
    const avgCpuTemp = sumTemps / lenTemps;
    // console.log(`average core temperatures: ${avgCpuTemp}`);
    return avgCpuTemp;
};

module.exports = { getCpuTemperature };