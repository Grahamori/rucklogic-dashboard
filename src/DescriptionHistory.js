import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import {
  getDescriptions,
  deleteDescription,
  updateDescription
} from "./firestore";
import EditDescriptionModal from "./EditDescriptionModal";

function DescriptionHistory({ user }) {
  const [descriptions, setDescriptions] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [editingDesc, setEditingDesc] = useState(null);

  useEffect(() => {
    async function fetchDescriptions() {
      const data = await getDescriptions(user.uid);
      setDescriptions(data.filter(d => d.id));
    }
    fetchDescriptions();
  }, [user, refreshTrigger]);

  const handleDelete = async (descId) => {
    await deleteDescription(user.uid, descId);
    setRefreshTrigger(prev => prev + 1);
  };

  const handleSaveEdit = async (newText) => {
    await updateDescription(user.uid, editingDesc.id, { text: newText });
    setEditingDesc(null);
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="container mt-4">
      {/* <h3 className="mb-4">📜 Description History</h3> */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {descriptions.map((desc) => (
          <Col key={desc.id}>
            <Card className="shadow-sm h-100">
              <Card.Body>
                <Card.Title className="text-muted small">
                  Style: {desc.style}
                </Card.Title>
                <Card.Text>{desc.text}</Card.Text>
                <div className="d-flex justify-content-between">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => setEditingDesc(desc)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(desc.text)}
                  >
                    Copy
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(desc.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <EditDescriptionModal
        show={!!editingDesc}
        initialText={editingDesc?.text}
        onClose={() => setEditingDesc(null)}
        onSave={handleSaveEdit}
      />
    </div>
  );
}

export default DescriptionHistory;
