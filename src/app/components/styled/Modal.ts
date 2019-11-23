import styled from "styled-components";
import agnosticStyled from "../../utilites/Utilities";
import Textarea from "react-textarea-autosize";

export const Modal = styled.div`
  position: fixed;
  background: #fff;
  top: 25px;
  left: 25px;
  right: 25px;
  border: 2px solid #444;
`;

export const PhotoInModal = styled.img`
  object-position: center;
  object-fit: cover;
  max-width: 125px;
  max-height: 100px;
  min-height: 100px;
  min-width: 125px;
  border-radius: 10px;
  margin-right: 15px;
`;

interface TWProps {
  fullscreen?: boolean;
}

export const TitleWrapper = styled.div<TWProps>`
  width: 100%;
  ${props =>
    props.fullscreen === false &&
    `
      display: inline-block;
      width: calc(100% - 175px);
      padding-left: 20px;
      vertical-align: top;
  `}
`;

export const NameInput = styled.input`
  font-family: "Sriracha", "Courier New";
  font-weight: 600;
  margin: 0 0 5px 0;
  font-size: 3vmin;
  line-height: 4vmin;
  border: none;
  width: 95%;
  background: transparent;
  color: #444;
`;

export const StyledTextArea = styled(Textarea)`
  font-family: "Sriracha", "Courier New";
  font-weight: 600;
  display: block;
  border: none;
  width: 100%;
  font-size: 2vmin;
  line-height: 2vmin;
  resize: none;
  background: transparent;
  color: #444;
`;

export const TimeInput = styled.input`
  font-family: "Sriracha", "Courier New";
  font-weight: 600;
  font-size: 2vmin;
  line-height: 2vmin;
  border: none;
  background: transparent;
  color: #444;
`;

export const ListInput = styled.input`
  font-family: "Sriracha", "Courier New";
  font-weight: 600;
  font-size: 2vmin;
  line-height: 2vmin;
  height: 2.2vh;
  border: none;
  background: transparent;
  color: #444;
`;

export const Instructions = styled.div`
  font-family: "Sriracha", "Courier New";
  font-weight: 600;
  font-size: 2vmin;
  line-height: 2vmin;
  width: 100%;
  background: transparent;
  color: #444;
`;

export const Label = styled.span`
  font-family: "Exo", Arial Black, sans-serif;
  font-size: 2vmin;
  color: #444;
`;

export const UL = styled.ul`
  padding-inline-start: 2.6vmin;
  margin-block-start: 0.8vmin;
  margin-block-end: 0.8vmin;
  color: #444;
`;

export const OL = styled.ol`
  padding-inline-start: 2.6vmin;
  margin-block-start: 0.8vmin;
  margin-block-end: 0.8vmin;
  color: #444;
`;

// TODO: currently not working and not being used
export const StyledList = agnosticStyled`
  padding-inline-start: 2.6vmin;
  margin-block-start: 0.8vmin;
  margin-block-end: 0.8vmin;
  color: #444;
`;
