import { Elevator } from "../models/Elevator";

export const updateElevatorDestination = async (
  id: string,
  destinationFloor: number
) => {
  const elevator = await Elevator.findByPk(id);
  if (!elevator) {
    throw new Error("Elevator not found");
  }

  elevator.isIdle = false;
  elevator.destinationFloor = destinationFloor;
  await elevator.save();
};

export const scheduleUpdateCurrentFloor = (
  id: string,
  currentElevatorFloor: number,
  delay: number
) => {
  setTimeout(async () => {
    try {
      const elevator = await Elevator.findByPk(id);
      if (!elevator) {
        throw new Error("Elevator not found");
      }
      elevator.isIdle = true;
      elevator.currentFloor = currentElevatorFloor;
      await elevator.save();
    } catch (error) {
      console.error("Error performing delayed update:", error);
    }
  }, delay);

  return { message: "Scheduled update successful" };
};
