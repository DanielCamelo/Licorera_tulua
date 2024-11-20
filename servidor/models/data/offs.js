require('dotenv').config();
const connectDB = require('../../config/db.js');
connectDB();
const Off = require("../Off.js");

const coupons = [
  {
    code: "VERANO20",
    discountPercentage: 20,
    description: "Obtén un 20% de descuento en todos los productos por temporada navideña.",
    expirationDate: "2024-11-24",
    category: "Bebidas con alchol",
    isActive : true
  },
  {
    code: "BEBIDAS10",
    discountPercentage: 10,
    description: "Disfruta un 10% de descuento en bebidas sin alcohol.",
    expirationDate: "2024-11-24",
    category: "Bebidas sin alchol",
    isActive : true
  },
  {
    code: "TULUA70",
    discountPercentage: 30,
    description: "Obtén un 30% de descuento en tu próxima compra.",
    expirationDate: "2024-11-24",
    category: "Bebidas con alchol",
    isActive : true
  },
];

console.log("Insert many...")
Off.insertMany(coupons);