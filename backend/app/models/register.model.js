module.exports = mongoose => {
    var schema = mongoose.Schema({
        usernameco: { type: String, unique: true },
        password: { type: String, required: true },
        firstName: { type: String, required: true, unique: true },
        lastName: { type: String, required: true, unique: true },
        sex: { type: String },
        check: { type: Boolean },
        email: { type: String, required: true, unique: true },
        tel: { type: String, required: true },
        Hnum: { type: String },
        province: { type: String },
        district: { type: String },
        parish: { type: String },
        zip: { type: String },
        date: { type: Date, default: Date.now }
    }, { timestamps: true });

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Register = mongoose.model("register", schema);
    return Register;
};