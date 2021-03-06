import express from "express";
import {
	registerBacentaLeaderController,
	loginController,
	verifyUsername,
	verifyPhone,
	fetchUser,
	checkIfUserExist,
	verifyEmail,
	updateProfile,
	signUpload,
} from "../controllers/userControllers.js";

const router = express.Router();

router.get("/", (req, res) => {
	res.send("Got to /user");
});

router.post("/", fetchUser);
router.post("/register-bacenta-leader", registerBacentaLeaderController);
router.post("/login", loginController);
router.post("/verify-username", verifyUsername);
router.post("/verify-phonenumber", verifyPhone);
router.post("/verify-email", verifyEmail);
router.post("/check-if-user-exist", checkIfUserExist);
router.post("/update-profile", updateProfile);
router.post("/sign-upload", signUpload);

export default router;
