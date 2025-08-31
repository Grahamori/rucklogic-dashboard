import React, { useEffect, useState } from "react";
import { getFlips, deleteFlip } from "./firestore";
import { Button, Card, Row, Col } from "react-bootstrap";

function FlipHistory({ user, userId, editingFlip, refreshTrigger, onEdit }) {
  const [flips, setFlips] = useState([]);

  useEffect(() => {
  async function fetchFlips() {
    const data = await getFlips(user.uid);
    console.log("Fetched flips:", data); // ✅ See raw data
    setFlips(data); // ✅ No filtering
  }
  fetchFlips();
}, [user, refreshTrigger]);



const handleDelete = async (flipId) => {
  console.log("Attempting to delete flip:", flipId);
  if (!userId || !flipId) {
    console.warn("Missing userId or flipId — cannot delete");
    return;
  }

  try {
    await deleteFlip(userId, flipId);
    setFlips(prev => prev.filter(f => f.id !== flipId));
    console.log("Flip deleted:", flipId);
  } catch (err) {
    console.error("Delete failed:", err);
  }
};


  return (
    <div>
      <h3 className="page-title">Saved Flips</h3>
      <Row xs={1} md={2} lg={3} className="g-4">
        {flips.map((flip, index) => {
  console.log("Rendering flip:", flip); // ✅ Confirm ID presence
  return (
    <Col key={flip.id || `flip-${index}`}>
      <Card className="h-100">
        <Card.Body>
          <Card.Title>{flip.brand} {flip.itemType}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {flip.platform} ({flip.region}) — Grade {flip.grade}
          </Card.Subtitle>
          <Card.Text>
            Cost: {flip.cost} {flip.currency}<br />
            Suggested: {flip.suggestedPrice} {flip.currency}<br />
            Style: {flip.style}<br />
            Tags: {flip.personality?.join(", ") || "None"}<br />
            Size: {flip.size} | Colour: {flip.colour}<br />
            Fit: {flip.fit} | Material: {flip.material}<br />
            Flaws: {flip.flaws || "None"}
          </Card.Text>
          <div className="d-flex justify-content-between">
  <Button
  variant="outline-secondary"
  size="sm"
  onClick={() => {
    console.log("Edit clicked for flip:", flip);
    onEdit(flip);
  }}
>
  Edit
</Button>

<Button
  variant="outline-danger"
  size="sm"
  onClick={() => {
    console.log("Delete clicked for flip:", flip);
    if (!flip?.id) {
      console.warn("Flip object missing or invalid:", flip);
      return;
    }
    handleDelete(flip.id);
  }}
>
  Delete
</Button>



</div>
        </Card.Body>
      </Card>
    </Col>
  );
})}

      </Row>
    </div>
  );
}

export default FlipHistory;
