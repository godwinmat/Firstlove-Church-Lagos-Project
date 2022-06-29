import express from "express";
import { addArea, getAreas } from "../controllers/areaControllers.js";
const router = express.Router();

router.get("/", (req, res) => {
	res.send("Got to /area");
});

router.get("/get-areas", getAreas);
router.post("/add-area", addArea);

export default router;