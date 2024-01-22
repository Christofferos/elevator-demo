import React from 'react'
import { ControlPanelContainer, PanelButton, PanelDisplay } from './styled.js'

interface Props {
  onClick: () => void
  seconds: number | undefined
}

export const ControlPanel: React.FC<Props> = ({ onClick, seconds }) => {
  return (
    <ControlPanelContainer>
      <PanelButton
        onClick={onClick}
        disabled={!!seconds}
        isDisabled={!!seconds}
      />
      <PanelDisplay>
        {seconds === undefined && (
          <span style={{ textAlign: 'center' }}>Call Elevator</span>
        )}
        {!!seconds && (
          <span style={{ textAlign: 'center' }}>{seconds} sec</span>
        )}
        {seconds == 0 && <span style={{ textAlign: 'center' }}>Ready</span>}
      </PanelDisplay>
    </ControlPanelContainer>
  )
}
