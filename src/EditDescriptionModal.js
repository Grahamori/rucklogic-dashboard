import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function EditDescriptionModal({ show, onClose, onSave, initialText }) {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(initialText || "");
  }, [initialText]);

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Description</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          as="textarea"
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => onSave(text)}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditDescriptionModal;
