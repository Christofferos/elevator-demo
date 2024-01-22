import { useMutation, UseMutationResult, MutationFunction } from 'react-query'
import { callElevator } from '../elevatorQueries'

export interface ElevatorStatus {
  elevatorId: string
  timeAway: number
}

export const useCallElevator = (
  onSuccessCallback?: (data: ElevatorStatus) => void,
): UseMutationResult<ElevatorStatus, Error, number> => {
  const mutationFn: MutationFunction<ElevatorStatus, number> = async (input) =>
    await callElevator(input)

  return useMutation(mutationFn, {
    onSuccess: (data) => {
      if (onSuccessCallback) {
        onSuccessCallback(data)
      }
    },
  })
}
