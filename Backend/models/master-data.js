import mongoose from "mongoose"

const MasterDataSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: false
    },
    whatsappnumber: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true
    },
    dateofbirth: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const MasterData = mongoose.model("master-data", MasterDataSchema)
export default MasterData
