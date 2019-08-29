import styled from "styled-components";

export const CloseButton = styled.button`
  position: absolute;
  right: 15px;
  top: 15px;
`;

interface USProps {
  start: boolean;
  isUploading: boolean;
  finished: boolean;
}

export const UploaderStyle = styled.label<USProps>`
  ${props => props.start && `cursor: pointer;`}
  background-color: steelblue;
  color: white;
  padding: 10px;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 14px;
  min-width: 100px;
  text-align: center;
`;
