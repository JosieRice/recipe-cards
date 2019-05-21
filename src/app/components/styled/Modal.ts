import styled from "styled-components";
import Textarea from 'react-textarea-autosize';

export const Modal = styled.div`
  background-color: #F2EECB;
  position: absolute;
  background: #fff;
  top: 25px;
  left: 25px;
  right: 25px;
  border: 2px solid #444;
`

export const Name = styled.input`
  font-family: 'Sriracha', 'Courier New';
  font-weight: 600;
  margin: 0 0 5px 0;
  font-size: 4vmin;
  line-height: 5vmin;
  border: none;
  width: 90%;
  background: transparent;
`

export const StyledTextArea = styled(Textarea)`
  font-family: 'Sriracha', 'Courier New';
  font-weight: 600;
  display: block;
  border: none;
  width: 100%;
  font-size: 2.5vmin;
  line-height: 2.5vmin;
  resize: none;
  background: transparent;
`

export const Time = styled.input`
  font-family: 'Sriracha', 'Courier New';
  font-weight: 600;
  font-size: 2.5vmin;
  line-height: 2.5vmin;
  border: none;
  background: transparent;
`

export const Instructions = styled.div`
  font-family: 'Sriracha', 'Courier New';
  font-weight: 600;
  font-size: 2.5vmin;
  line-height: 2.5vmin;
  width: 100%;
  background: transparent;
`

export const Label = styled.span`
  font-family: 'Exo', Arial Black, sans-serif;
  font-size: 2.5vmin;
`

export const UL = styled.ul`
  padding-inline-start: 2.6vmin;
  margin-block-start: 0.8vmin;
  margin-block-end: 0.8vmin;
`

export const OL = styled.ol`
  padding-inline-start: 2.6vmin;
  margin-block-start: 0.8vmin;
  margin-block-end: 0.8vmin;
`