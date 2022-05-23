import express from "express";
import {registerBacentaLeaderController, loginController, verifyUsername, verifyPhone, registerMember, fetchUser} from "../controllers/userControllers.js"

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Got to /user")
})

router.post("/", fetchUser);
router.post("/register-bacenta-leader", registerBacentaLeaderController);
router.post("/register-member", registerMember);
router.post("/login", loginController);
router.post("/verify-username", verifyUsername);
router.post("/verify-phonenumber", verifyPhone);

export default router;
