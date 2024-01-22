import { useQuery } from 'react-query'
import { Elevator, getElevatorStatus } from '../elevatorQueries'

export const useFetchElevatorStatus = (
  onSuccessCallback?: (data: Array<Elevator>) => void,
) => {
  const {
    data: elevators,
    isError,
    isLoading,
    refetch,
  } = useQuery<Array<Elevator>>('getElevatorStatus', getElevatorStatus, {
    onSuccess: (elevatorsStatus) => {
      if (onSuccessCallback) {
        onSuccessCallback(elevatorsStatus)
      }
    },
  })

  return { elevators, isError, isLoading, refetch }
}
