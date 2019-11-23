import styled from "styled-components";

export const CloseButton = styled.button`
  position: absolute;
  right: 15px;
  top: 15px;
`;

interface USProps {
  start: string;
  uploading: boolean;
  finished: boolean;
  modal?: boolean;
}

export const UploaderStyle = styled.label<USProps>`
  margin-right: 15px;
  
  ${props => props.start && `cursor: pointer;`}

  ${props =>
    !props.modal &&
    `
      background-color: steelblue;
      color: white;
      padding: 10px;
      border-radius: 4px;
      display: inline-block;
      margin-bottom: 14px;
      min-width: 100px;
      text-align: center;
  `}

  ${props =>
    props.modal &&
    `
      object-position: center;
      object-fit: cover;
      max-width: 100px;
      max-height: 100px;
      min-height: 100px;
      min-width: 100px;
      border-radius: 10px;
      background: #c4c0c0;
      color: white;
      padding: 10px;
      display: inline-block;
      text-align: center;
  `}
`;
