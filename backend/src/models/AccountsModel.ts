import mongoose from "mongoose";


const AccountSchema  = new mongoose.Schema({
    userId :{
        type : mongoose.SchemaTypes.ObjectId,
        require : true,
        ref : 'User'
    }
,
    balance: {
        type :Number,
        require :true
    }
})

export const AccountModel = mongoose.model('account', AccountSchema)