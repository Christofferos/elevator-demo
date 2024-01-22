import rateLimit from "express-rate-limit";
import { Elevator } from "./models/Elevator";

export const ELEVATOR_TIME_PER_FLOOR = 2;

export const rateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 min
  max: 100, // X requests per windowMs
});

export const initDatabase = async () => {
  Array(5)
    .fill(0)
    .forEach(async (_, index) => {
      const randomFloor = Math.floor(Math.random() * 20);
      return await Elevator.create({
        elevatorId: index,
        isIdle: true,
        currentFloor: randomFloor,
        destinationFloor: randomFloor,
      });
    });
};
