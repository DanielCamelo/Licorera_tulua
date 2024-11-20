const mongoose = require("mongoose");

const discountSchema = mongoose.Schema(
  {
    code: { type: String, required: true },
    discountPercentage: { type: Number, required: true },
    description: { type: String, require: true },
    expirationDate: { type: Date, required: true },
    category: { type: String, require: true }, // Categorías aplicables
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Off = mongoose.model("Discount", discountSchema);

module.exports = Off;
