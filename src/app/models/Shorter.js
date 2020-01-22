const { Schema, model } = require("mongoose");

const ShorterSchema = new Schema(
  {
    shortURL: {
      type: String,
      required: true,
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports = model("Shorter", ShorterSchema);
