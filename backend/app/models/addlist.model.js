module.exports = mongoose => {
    var schema = mongoose.Schema({
        nameCargo: { type: String, unique: true, required: true },
        type: { type: String, required: true },
        codeCargo: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number },
        img: { type: String },
        file: { type: String },
        produceDate: { type: String },
        typeOS: { type: String, required: true },
        size: { type: String, required: true },
        display: { type: String },
        cpu: { type: String },
        ram: { type: String },
        rom: { type: String },
        externalDrive: { type: String },
        camBack: { type: String },
        camFace: { type: String },
        batt: { type: String },
        twoSim: { type: String },
        date: { type: Date, default: Date.now }
    }, { timestamps: true });

    // schema.method("toJSON", function() {
    //     const { __v, _id, ...object } = this.toObject();
    //     object.id = _id;
    //     return object;
    // });

    const AddList = mongoose.model("addlists", schema);
    return AddList;
};