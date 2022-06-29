import mongoose from "mongoose";

export const MemberSchema = mongoose.Schema(
	{
		firstname: {
			type: String,
			required: true,
		},
		lastname: {
			type: String,
			required: true,
		},
		fullname: {
			type: String,
			required: true,
		},
		phonenumber: {
			type: String,
			required: false,
		},
		whatsappnumber: {
			type: String,
			required: false,
		},
		gender: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		area: {
			type: String,
			required: true,
		},
		dateofbirth: {
			day: {
				type: Number,
				required: true,
			},
			month: {
				type: Number,
				required: true,
			},
			year: {
				type: Number,
				required: true,
			},
		},
		image: {
			type: String,
			required: true,
		},
		people: [String],
		userid: {
			type: String,
			required: true,
		},
		roles: [String]
	},
	{
		timestamps: true,
	}
);

const Member = mongoose.model("member", MemberSchema);
export default Member;
