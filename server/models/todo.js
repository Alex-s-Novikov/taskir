const { Schema, model, Types } = require("mongoose");

const schema = new Schema(
    {
        title: { type: String, required: true },
        text: { type: String, required: true },
        deadline: { type: Number, required: true },
        status: { type: String, required: true, default: "new" },
        important: false,
        user: { type: Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

module.exports = model("Todo", schema);
