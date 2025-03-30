const mongoose = require('mongoose');


const shcema = mongoose.Schema({
    lable:{
        type:String
    },
    value:{
        type:Number
    },
    date:{
        type:String
    }

})


module.exports = mongoose.model('expense',shcema)