import { model , Schema } from "mongoose";
const OauthSchema = new Schema ({
    userId: {
        type: Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    provider : {
        type : String,
        required : true,
        enum : ['google' , 'facebook' , 'github']
    },
    accessToken:{
        tyep : String,
        required : true
    },
    refreshToken:{
        type : String,
        required : true
    },
    expiresIn:{
        type : Date,
        required : true
    },
    obtainedAt : {
        type : Date,
        default : Date.now
    }
}, {timestamps : true})

const Oauth = model("Oauth" , OauthSchema);