import React from 'react'
import { ControlPanelContainer, RedCircle, SecondsDisplay } from './styled.js'

interface Props {
  onClick: () => void
  seconds: number | undefined
}

export const ControlPanel: React.FC<Props> = ({ onClick, seconds }) => {
  return (
    <ControlPanelContainer>
      <RedCircle
        onClick={onClick}
        disabled={!!seconds}
        isDisabled={!!seconds}
      />
      <SecondsDisplay>
        {seconds === undefined && (
          <span style={{ textAlign: 'center' }}>Call Elevator</span>
        )}
        {!!seconds && (
          <span style={{ textAlign: 'center' }}>{seconds} sec</span>
        )}
        {seconds == 0 && <span style={{ textAlign: 'center' }}>Ready</span>}
      </SecondsDisplay>
    </ControlPanelContainer>
  )
}
