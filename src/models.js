import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true, 
        trim: true,       
        validate: {
            validator: async function (value) {
                const user = await mongoose.model("User").findOne({ email: value });
                if (user) {
                    throw new Error("Email already in use");
                }
                return true;
            },
            message: "Email already in use"
        }
    },
    password: { type: String, required: true }
});

UserSchema.pre("save", async function (next) {
    if(!this.isModified("password"))return next();
    this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password)
};

const User = mongoose.model("User", UserSchema)

export default User;