import styled from 'styled-components'

export const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 2px solid black;
  border-radius: 5px;
  outline: none;
  width: 110px;
  background: white;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`
