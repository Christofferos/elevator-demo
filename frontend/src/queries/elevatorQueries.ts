import { ElevatorStatus } from './hooks/useCallElevator'

export interface Elevator {
  elevatorId: string
  isIdle: boolean
  currentFloor: number
  destinationFloor: number
}

export const getElevatorStatus = async (): Promise<Array<Elevator>> => {
  const response = await fetch('http://localhost:3000/api/v1/elevators/status')
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
  return response.json()
}

export const callElevator = async (
  currentFloor: number,
): Promise<ElevatorStatus> => {
  const response = await fetch(
    'http://localhost:3000/api/v1/elevators/assign',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ currentFloor }),
    },
  )
  if (!response.ok) {
    throw new Error('Failed to callElevator')
  }
  return response.json()
}
