import styled from "styled-components";
import tinycolor from "tinycolor2";

interface PickerProps {
  color: string;
  onClick: () => void;
}

const Picker = styled.a<PickerProps>`
  height: 50px;
  width: 50px;
  background-color: ${({ color }) => color};
  border: ${({ color }) =>
    `1px solid ${tinycolor(color)
      .darken()
      .toHexString()}`};
  border-radius: 50px;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 2px, rgba(0, 0, 0, 0.3) 0px 4px 8px;

  :hover {
    box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 6px, rgba(0, 0, 0, 0.3) 0px 8px 10px;
  }
`;

export default Picker;
