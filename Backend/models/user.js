import mongoose from "mongoose"

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const User = mongoose.model("user", UserSchema)
export default User
