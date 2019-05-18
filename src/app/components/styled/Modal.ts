import styled from "styled-components";
import Textarea from 'react-textarea-autosize';

export const Name = styled.input`
  margin: 0 0 5px 0;
  font-size: 4vmin;
  border: none;
  width: 90%;
`

export const StyledTextArea = styled(Textarea)`
  display: block;
  border: none;
  width: 100%;
  font-size: 2.5vmin;
  resize: none;
`

export const Time = styled.input`
  font-size: 2.5vmin;
  border: none;
`

export const Instructions = styled.div`
  font-size: 2.5vmin;
  width: 100%;
`