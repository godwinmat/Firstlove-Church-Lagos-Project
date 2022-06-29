import mongoose from "mongoose";

const BacentaLeaderSchema = mongoose.Schema(
	{
		email: {
			type: String,
			required: false,
		},
		area: {
			type: String,
			required: true,
		},
		userid: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const BacentaLeader = mongoose.model("bacenta-leader", BacentaLeaderSchema);
export default BacentaLeader;
