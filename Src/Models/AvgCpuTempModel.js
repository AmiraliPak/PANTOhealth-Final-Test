const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    avgTemp: {
        type: Number,
        required: [true, "avgTemp is required"]
    },
    cpu: {
        manufacturer: String,
        brand: String
    },
    from: Date,
    to: Date

}, { timestamps: true });
schema.index({ "createdAt": -1 });

schema.methods.toJSON = function () {
    let obj = this.toObject();
    delete obj._id;
    delete obj.__v;
    delete obj.createdAt;
    delete obj.updatedAt;
    return obj;
}

module.exports = mongoose.model("CpuTemperature", schema);