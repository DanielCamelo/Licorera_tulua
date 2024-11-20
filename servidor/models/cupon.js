const mongoose = require('mongoose')

const cuponSchema = mongoose.Schema({
    
    titulo : String,
    descripcion : String,
    codigo : String
},{
    timestamps : true

})


const cuponModel = mongoose.model("cupon",cuponSchema)

module.exports = cuponModel