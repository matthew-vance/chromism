import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Slider from "@material-ui/core/Slider";
import AddIcon from "@material-ui/icons/Add";
import { ChromePicker, ColorResult } from "react-color";
import tinycolor from "tinycolor2";
import Modal from "react-modal";
import { getSurroundingValues } from "~/utils";
import { Gradient, Picker } from "..";

interface GlobalStyleProps {
  backgroundColor: string;
}

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  body {
    background-color: ${({ backgroundColor }) => backgroundColor};
    max-width: 900px;
    margin: auto;
  }
`;

const AppStyles = styled.main`
  background-color: white;
  margin: 20px;
  padding: 10px;
  display: grid;
  grid-template-rows: 5vh 5vh 5vh 1fr;
  place-items: center center;
  border-radius: 2px;
  grid-gap: 0.5em;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 2px, rgba(0, 0, 0, 0.3) 0px 4px 8px;
`;

interface PickerTest {
  key: number;
  color: string;
}

const startColor = tinycolor.random();

const App = () => {
  const [colors, setColors] = useState([
    startColor.toHexString(),
    startColor.complement().toHexString()
  ]);
  const [percentage, setPercentage] = useState(Math.round(Math.random() * 100));
  const [output, setOutput] = useState("#ffffff");
  const [showModal, setShowModal] = useState(false);
  const [picker, setPicker] = useState({ key: 0, color: "#ffffff" });

  useEffect(() => {
    updateOutput();
  });

  const handlePercentageChange = (event: object, value: any) => {
    setPercentage(value);
    updateOutput();
  };

  const handleColorChange = (key: number) => (color: ColorResult) => {
    setPicker({ key, color: tinycolor(color.hex).toHexString() });

    // Is there a functional way to splice I don't know about?
    setColors([...colors.slice(0, key), color.hex, ...colors.slice(key + 1)]);
    updateOutput();
  };

  const handleAddPickerClick = () => {
    setColors(colors.concat([tinycolor.random().toHexString()]));
  };

  const handlePickerClick = (picker: PickerTest) => () => {
    setPicker(picker);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const updateOutput = (): void => {
    const surroundingValues = getSurroundingValues(colors, percentage);

    const color = tinycolor.mix(
      surroundingValues.lower,
      surroundingValues.upper,
      surroundingValues.weight
    );

    setOutput(color.toHexString());
  };

  return (
    <>
      <GlobalStyle backgroundColor={output} />
      <AppStyles>
        <OutputGridContainer>
          <div>{tinycolor(output).toHexString()}</div>
          <div>{tinycolor(output).toRgbString()}</div>
          <div>{tinycolor(output).toHslString()}</div>
        </OutputGridContainer>
        <Gradient colors={colors} />
        <Slider
          value={percentage}
          valueLabelDisplay="auto"
          step={1}
          min={1}
          max={100}
          onChange={handlePercentageChange}
          track={false}
        />
        <GridContainer>
          {colors.map((color, key) => (
            <Picker
              color={color}
              onClick={handlePickerClick({ key, color })}
              key={key}
            />
          ))}
          <AddPickerButton color={output} onClick={handleAddPickerClick}>
            <AddIcon style={{ fontSize: 32 }} />
          </AddPickerButton>
        </GridContainer>
        <Modal
          isOpen={showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={handleCloseModal}
          shouldCloseOnOverlayClick={true}
          ariaHideApp={false}
          style={{
            overlay: {
              backgroundColor: "rgba(255, 255, 255, 0.4)"
            },
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              padding: 0
            }
          }}
        >
          <ChromePicker
            color={picker.color}
            disableAlpha
            onChange={handleColorChange(picker.key)}
          />
        </Modal>
      </AppStyles>
    </>
  );
};

export default App;

interface AddPickerButtonProps {
  color: string;
}

const AddPickerButton = styled(Picker)<AddPickerButtonProps>`
  background-color: white;
  text-align: center;
  color: ${({ color }) => color};
`;

const GridContainer = styled.section`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  place-items: center center;
  grid-gap: 1em;
`;

const OutputGridContainer = styled(GridContainer)`
  grid-template-columns: repeat(3, 1fr);
`;
