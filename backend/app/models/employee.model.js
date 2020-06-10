module.exports = mongoose => {
    var schema = mongoose.Schema({
        idem: { type: Number, unique: true },
        emusername: { type: String, unique: true },
        password: { type: String, required: true },
        firstName: { type: String, required: true, unique: true },
        lastName: { type: String, required: true, unique: true }
    }, { timestamps: true });

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Employee = mongoose.model("employee", schema);
    return Employee;
};