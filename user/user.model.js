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


UserSchema.pre('save', async function (next) {
    const hashedpassword = await bcrypt.hash(this.password, 10);
    this.password = hashedpassword;
    next();
})

UserSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
}

const UserModel = mongoose.model("User", UserSchema);


module.export = { UserModel };