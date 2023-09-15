import mongoose from "mongoose";

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    phoneNumber: {
        type: String,
        unique: true,
        required: true
    },
    createdAt: Date
});


const UserModel = mongoose.model("User", UserSchema);


module.export = { UserModel };