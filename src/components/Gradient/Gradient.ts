import styled from "styled-components";

interface GradientProps {
  colors: string[];
}

const Gradient = styled.div<GradientProps>`
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, ${({ colors }) => colors.join(", ")});
  border-radius: 2px;
`;

export default Gradient;
