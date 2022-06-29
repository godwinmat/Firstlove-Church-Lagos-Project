import express from "express";
import { addAttendance, getAttendanceGraph, getLastSundayAttendance } from "../controllers/attendanceController.js";
const router = express.Router();

router.get("/", (req, res) => {
	res.send("Got to /attendance");
});

router.post("/get-attendance-graph", getAttendanceGraph);
router.post("/get-last-sunday-attendance", getLastSundayAttendance);
router.post("/add-attendance", addAttendance);

export default router;