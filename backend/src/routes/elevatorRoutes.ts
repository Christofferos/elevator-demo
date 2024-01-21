import { Router } from "express";
import {
  getClosestElevator,
  getElevatorStatus,
} from "../controllers/elevatorController";
import { validateInputs } from "../middleware/expressValidation";

const router = Router();

router.get("/elevators/status", getElevatorStatus);
router.put("/elevators/assign", validateInputs, getClosestElevator);

export default router;
