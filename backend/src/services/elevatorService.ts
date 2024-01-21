import { Elevator } from "../models/Elevator";
import { ELEVATOR_TIME_PER_FLOOR } from "../utils";

export const findMostEffectiveElevator = (
  userFloor: number,
  elevators: Array<Elevator>
) => {
  const elevatorDistances = elevators.map((e) => {
    const isUserOnTheWay =
      (e.currentFloor < userFloor && userFloor < e.destinationFloor) ||
      (e.currentFloor > userFloor && userFloor > e.destinationFloor); // UP direction on the way || DOWN direction on the way

    if (e.isIdle || isUserOnTheWay) {
      return {
        elevatorId: e.elevatorId,
        timeAway:
          Math.abs(userFloor - e.currentFloor) * ELEVATOR_TIME_PER_FLOOR,
      };
    }

    // floorDistance if elevator reaches previous destination and then user destination
    const floorDistance = Math.abs(
      Math.abs(e.currentFloor - e.destinationFloor) - userFloor
    );

    return {
      elevatorId: e.elevatorId,
      timeAway: floorDistance * ELEVATOR_TIME_PER_FLOOR,
    };
  });

  const fastestElevator = elevatorDistances.reduce(
    (fastestElevator, currentElevator) => {
      const fastestTime = fastestElevator.timeAway;
      const currentElevatorTime = currentElevator.timeAway;

      return currentElevatorTime < fastestTime
        ? currentElevator
        : fastestElevator;
    },
    elevatorDistances[0]
  );

  return fastestElevator;
};
