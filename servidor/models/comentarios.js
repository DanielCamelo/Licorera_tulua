const mongoose = require('mongoose')

const comentarioSchema = mongoose.Schema({
   productId : {
        ref : 'product',
        type : String,
   },
    userId : {
          ref : 'user',
          type : String,
    },
    comentario : String,
    calificacion : Number,
    
},{
    timestamps : true
})


const comentarioModel = mongoose.model("comentario",comentarioSchema)

module.exports = comentarioModel
