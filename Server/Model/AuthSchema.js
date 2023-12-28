import mongoose from "mongoose";


const UserAuthSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

     Cpassword:{
        type:String,
        required:true
     }
})


const UserAuth= mongoose.model('UserAuthNote', UserAuthSchema);

export default UserAuth;