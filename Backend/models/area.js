import mongoose from "mongoose"

const AreaSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const Area = mongoose.model("area", AreaSchema)
export default Area
