const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema ;
const detailschema = new Schema({
    FirstName : {type : String, required: true},
    LastName : {type : String, required: true},
    Birthday : {type : String, required: true},
    Gender : {type : String, required: true},
    PhoneNo : {type : Number, required: true , unique: true},
    Email : {type : String, required: true , unique: true},
    Password : {type : String, required: true},
    ConfirmPassword : {type : String, required: true}
});

detailschema.pre("save" ,async function(next){                //pre function , first arg is save which means before save we have to execute
    this.Password = await bcrypt.hash(this.Password , 10);     // 10 rounds , this.Password gives the current password
    this.ConfirmPassword = undefined;                      // after hashing we don't need confirmed password
    next();                                          // next() now we can go ahead
})

const Detail = new mongoose.model('Detail' , detailschema);
module.exports = Detail;
