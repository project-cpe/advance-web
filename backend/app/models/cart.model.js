module.exports = mongoose => {
    var schema = mongoose.Schema({
        usernameco: { type: String },
        nameCargo: { type: String,  required: true },
        img: { type: String },
        price: { type: Number },
        quantity: { type: Number, required: true },
        file: { type: String },
        productId: {type: String},
        date: { type: Date, default: Date.now }
    }, { timestamps: true });

    // schema.method("toJSON", function() {
    //     const { __v, _id, ...object } = this.toObject();
    //     object.id = _id;
    //     return object;
    // });

    const Cart = mongoose.model("cart", schema);
    return Cart;
};