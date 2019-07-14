import * as React from 'react';
import styled from 'styled-components';
import { CloseButton } from './styled/Buttons';

const ConfirmModalWrapperStyle = styled.div`
  position: absolute;
  top: 15px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 96%;
  min-width: 95%;

`

const ConfirmModalStyle = styled.div`

`

export const ConfirmationModal = (props: any) => {
  console.log('modal props', props)
  const { close, save, closeUnsaved } = props;

  return (
    <ConfirmModalWrapperStyle>
      <ConfirmModalStyle>
        <div className="modal-header">
          <h3>You have unsaved changes.</h3>
          <CloseButton onClick={close}>×</CloseButton>
        </div>
        <div className="modal-body">
          <p>
            {props.children}
          </p>
        </div>
        <div className="modal-footer">
          <button onClick={closeUnsaved}>Close Without Saving</button>
          <button onClick={save}>Save</button>
          <button onClick={close}>Back to Recipe</button>
        </div>
      </ConfirmModalStyle>
    </ConfirmModalWrapperStyle>
  )
}