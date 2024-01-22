export const FLOORS = Array.from({ length: 20 }, (_, index) => index).reverse()

export const DEFAULT_ELEVATOR_STATE = {
  elevatorId: '0',
  isIdle: true,
  currentFloor: 0,
  destinationFloor: 0,
}

export const ELEVATOR_TIME_PER_FLOOR = 2
