import { Request, Response } from "express";
import { Elevator } from "../models/Elevator";
import { findMostEffectiveElevator } from "../services/elevatorService";
import {
  scheduleUpdateCurrentFloor,
  updateElevatorDestination,
} from "../repositories/elevatorRepositroy";

export const getElevatorStatus = async (
  _: Request,
  res: Response
): Promise<void> => {
  const elevators = await Elevator.findAll();
  res.json(elevators);
};

export const getClosestElevator = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userFloor = parseInt(req.body.currentFloor, 10);
  const elevators = await Elevator.findAll();

  const { elevatorId, timeAway } = findMostEffectiveElevator(
    userFloor,
    elevators
  );

  try {
    updateElevatorDestination(elevatorId, userFloor);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: `Failed in updating elevator state` });
  }

  try {
    scheduleUpdateCurrentFloor(elevatorId, userFloor, timeAway);
  } catch (error) {
    console.error(error);
  }

  res.json({ elevatorId, timeAway });
};
