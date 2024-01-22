import React, { useEffect, useRef, useState } from 'react'
import { useQueryClient } from 'react-query'
import {
  Door,
  DoorContainer,
  Doors,
  ElevatorContainer,
  ElevatorSign,
} from './styled.js'
import { ControlPanel } from '../../components/controlPanel/ControlPanel.js'
import { FloorDropdown } from '../../components/floorSelection/FloorSelection.js'
import { Elevator } from '../../queries/elevatorQueries.js'
import {
  ElevatorStatus,
  useCallElevator,
} from '../../queries/hooks/useCallElevator.js'
import { useFetchElevatorStatus } from '../../queries/hooks/useFetchElevatorStatus.js'
import {
  DEFAULT_ELEVATOR_STATE,
  ELEVATOR_TIME_PER_FLOOR,
  FLOORS,
} from './utils.js'

export const ImplementationPage = () => {
  const [elevators, setElevators] = useState<Array<Elevator>>(
    new Array(5).fill(DEFAULT_ELEVATOR_STATE),
  )
  const [selectedElevator, setSelectedElevator] = useState<
    ElevatorStatus | undefined
  >(undefined)

  const [userFloor, setUserFloor] = useState<number>(
    Math.floor(Math.random() * 20),
  )

  const [seconds, setSeconds] = useState<number | undefined>(undefined)

  const secondsIntervalIdRef = useRef<NodeJS.Timeout>()
  const elevatorsIntervalIdRef = useRef<NodeJS.Timeout>()

  const handleStatusFetch = (status: Array<Elevator>) => {
    setElevators(status)
  }

  const { isError, isLoading, refetch } =
    useFetchElevatorStatus(handleStatusFetch)
  const queryClient = useQueryClient()

  const handleElevatorCallSuccess = (data: ElevatorStatus) => {
    setSelectedElevator(data)
    setSeconds(data.timeAway)
    const elevatorIdCalled = data.elevatorId

    // COUNTDOWN TIMER LOGIC
    secondsIntervalIdRef.current = setInterval(async () => {
      setSeconds((prevSeconds) => {
        if (prevSeconds != undefined && prevSeconds <= 0) {
          clearInterval(secondsIntervalIdRef.current)
          clearInterval(elevatorsIntervalIdRef.current)
          queryClient.invalidateQueries('getElevatorStatus')
          refetch()
        }
        return !!prevSeconds && prevSeconds > 0 ? prevSeconds - 1 : prevSeconds
      })
    }, 1000)

    // COUNTDOWN ELEVATOR FLOOR LOGIC
    elevatorsIntervalIdRef.current = setInterval(() => {
      setElevators((prevElevators) => {
        const copyElevators = prevElevators
        return copyElevators.map((prevElevator) => {
          if (
            prevElevator.elevatorId == elevatorIdCalled &&
            prevElevator.currentFloor != userFloor
          ) {
            return {
              ...prevElevator,
              currentFloor:
                prevElevator.currentFloor > userFloor
                  ? prevElevator.currentFloor - 1
                  : prevElevator.currentFloor + 1,
            }
          }
          return prevElevator
        })
      })
    }, 1000 * ELEVATOR_TIME_PER_FLOOR)
  }

  const {
    mutate,
    isLoading: isLoadingCall,
    isError: isErrorCall,
  } = useCallElevator(handleElevatorCallSuccess)

  const handleElevatorCall = () => {
    mutate(userFloor)
  }

  useEffect(() => {
    return () => {
      clearInterval(elevatorsIntervalIdRef.current)
      clearInterval(secondsIntervalIdRef.current)
    }
  }, [])

  return (
    <div>
      <ElevatorContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>
          <Doors>
            {elevators.map((elevator, index) => (
              <span key={index}>
                <ElevatorSign
                  isSelected={
                    selectedElevator
                      ? selectedElevator.elevatorId == elevator.elevatorId
                      : false
                  }
                >
                  {elevator.currentFloor}
                </ElevatorSign>
                <DoorContainer>
                  <Door
                    isOpen={
                      !!selectedElevator && elevator.currentFloor == userFloor
                    }
                  />
                  <div
                    style={{
                      background: 'black',
                      width: '2px',
                    }}
                  />
                  <Door
                    isOpen={
                      !!selectedElevator && elevator.currentFloor == userFloor
                    }
                  />
                </DoorContainer>
              </span>
            ))}
          </Doors>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FloorDropdown
              floor={userFloor}
              floors={FLOORS}
              onClick={(floor) => setUserFloor(floor)}
            />
            <ControlPanel onClick={handleElevatorCall} seconds={seconds} />
          </div>
        </div>
      </ElevatorContainer>
    </div>
  )
}
