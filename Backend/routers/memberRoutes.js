import express from "express";
import {
	addBacentaMember,
	checkIfBacentaMemberExist,
	deleteBacentaMember,
	getBacentaMemberCount,
	getBacentaMembers,
	getBacentaMembersForAttendance,
    registerMember,
} from "../controllers/memberControllers.js";

const router = express.Router();

router.get("/", (req, res) => {
	res.send("Got to /member");
});
router.post("/check-if-bacenta-member-exist", checkIfBacentaMemberExist);
router.post("/register-member", registerMember);
router.post("/get-bacenta-members", getBacentaMembers);
router.post("/get-bacenta-member-count", getBacentaMemberCount);
router.post("/add-bacenta-member", addBacentaMember);
router.post("/delete-bacenta-member", deleteBacentaMember);
router.post(
	"/get-bacenta-members-for-attendance",
	getBacentaMembersForAttendance
);

export default router;
