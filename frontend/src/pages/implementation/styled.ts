import styled from 'styled-components'

export const ElevatorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: gray;
`

export const Doors = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 90vw;
`

export const DoorContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: black;
  width: 200px;
  height: 400px;
`

export const Door = styled.div<{ isOpen: boolean }>`
  background-color: #6b7280;
  width: ${(props) => (props.isOpen ? '25px' : '100px')};
  height: 400px;
  transition: width 0.3s ease-out;
`

export const ElevatorSign = styled.div<{ isSelected: boolean }>`
  display: flex;
  justify-content: center;
  font-size: 18px;
  opacity: 40%;
  background: ${(props) => (props.isSelected ? 'green' : 'silver')};
`
