class AvgCpuTempsService {
    constructor(model) {
        this.model = model; // mongoose.model
        this.insert = this.insertOne.bind(this);
        this.getOne = this.getOne.bind(this);
    }

    async insertOne(data) {
        const item = this.model.create(data);
        if (item) return item;
    }

}

module.exports = AvgCpuTempsService;