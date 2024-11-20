const mongoose = require('mongoose')
const { BiVolume } = require('react-icons/bi')

const productSchema = mongoose.Schema({
    productName : String,
    brandName : String,
    category : String,
    productImage : [],
    description : String,
    price : Number,
    sellingPrice : Number,
    stock : Number,
    volumen : String
},{
    timestamps : true
})


const productModel = mongoose.model("product",productSchema)

module.exports = productModel