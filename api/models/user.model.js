import mongoose from "mongoose";
import crypto, { randomBytes } from "crypto";
const userSchema=new mongoose.Schema(
    {
        fullname:{
            type:String,
            required:true,
            unique:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
        },
        salt:{
            type:String,
        },
        profilePicture:{
            type:String,
            default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        },
        isAdmin:{
            type:Boolean,
            default:false
        },
    },{timestamps:true}
);
userSchema.pre("save",function(next){
    const user=this;
    if(!user.isModified("password")) return;
    const salt=crypto.randomBytes(16).toString();
    const hashedPassword= crypto.createHmac("sha256",salt).update(user.password).digest("hex");
    this.salt=salt;
    this.password=hashedPassword;
    next();
});
const User=mongoose.model('User',userSchema);
export default User;