import styled from 'styled-components'

export const ControlPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #222222;
  padding: 10px;
  width: 200px;
  border-radius: 10px;
`
export const PanelButton = styled.button<{ isDisabled: boolean }>`
  width: 100px;
  height: 100px;
  background-color: ${(props) => (props.isDisabled ? '#ddd' : 'red')};
  border-radius: 50%;
  cursor: ${(props) => (props.isDisabled ? 'not-allowed' : 'pointer')};
  box-shadow: 0 0 10px rgba(231, 76, 60, 0.7);

  &:active {
    box-shadow: 0 0 20px rgba(231, 76, 60, 0.9); /* Increase shadow on hover */
  }
`

export const PanelDisplay = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  font-size: 24px;
  padding: 20px;
  background: #ecf0f1;
  opacity: 50%;
  border: black 2px solid;
  width: 90px;
`
