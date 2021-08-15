import React from "react";
import PropTypes from "prop-types";
import { Modal, Button, Icon } from "semantic-ui-react";
import { EndGameModalHeaderStyles, EndGameModalActionsStyles } from "./styles";

function EndGameModal({ open, title, onPlayAgain }) {
  return (
    <Modal basic size="small" open={open}>
      <Modal.Header>
        <EndGameModalHeaderStyles>
          <Icon size="large" name="trophy" />
          <div>{title}</div>
        </EndGameModalHeaderStyles>
      </Modal.Header>

      <Modal.Actions>
        <EndGameModalActionsStyles>
          <Button fluid color="green" onClick={onPlayAgain}>
            PLAY AGAIN
          </Button>
        </EndGameModalActionsStyles>
      </Modal.Actions>
    </Modal>
  );
}

EndGameModal.propTypes = {
  open: PropTypes.bool,

  onClose: PropTypes.func,

  onPlayAgain: PropTypes.func,
};

export default EndGameModal;
