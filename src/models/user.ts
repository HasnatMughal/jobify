import mongoose from "mongoose"

interface User{
    name:string,
    email:string,
    password:string,
    role:string,
    profilePic:string,
    bio:string,
    cvUrl:string
}

const UserSchema = new mongoose.Schema<User>({
    name: String,
    email: String,
    password: String,
    role: {type:String, enum:["jobSeeker", "company"]},
    profilePic:String,
    bio:String,
    cvUrl:String
})


export default mongoose.models.User || mongoose.model("User", UserSchema)
