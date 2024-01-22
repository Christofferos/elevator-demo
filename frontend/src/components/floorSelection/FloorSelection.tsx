import React, { useState } from 'react'
import { Select } from './styled'

interface Props {
  floor: number
  floors: Array<number>
  onClick: (value: number) => void
}

export const FloorDropdown: React.FC<Props> = ({ floor, floors, onClick }) => {
  const [selectedFloor, setSelectedFloor] = useState(floor)

  const handleSelectChange = (event: { target: { value: any } }) => {
    const selectedValue = event.target.value
    setSelectedFloor(selectedValue)
    onClick(selectedValue)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label htmlFor='floorDropdown' style={{ textAlign: 'center' }}>
        Your floor is:
      </label>
      <Select
        id='floorDropdown'
        value={selectedFloor}
        onChange={handleSelectChange}
      >
        <option value='' disabled>
          Select a floor
        </option>
        {floors.map((floor) => (
          <option key={floor} value={floor}>
            Floor {floor}
          </option>
        ))}
      </Select>
    </div>
  )
}
