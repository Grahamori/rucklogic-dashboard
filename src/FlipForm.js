import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

function FlipForm({ user, flip, onSave }) {
  const [platform, setPlatform] = useState("Depop");
  const [region, setRegion] = useState("UK");
  const [currency, setCurrency] = useState("GBP");
  const [grade, setGrade] = useState("A");
  const [style, setStyle] = useState("witty");
  const [brand, setBrand] = useState("");
  const [itemType, setItemType] = useState("");
  const [size, setSize] = useState("");
  const [colour, setColour] = useState("");
  const [material, setMaterial] = useState("");
  const [fit, setFit] = useState("");
  const [flaws, setFlaws] = useState("");
  const [personality, setPersonality] = useState([]);
  const [cost, setCost] = useState("");
  const [suggestedPrice, setSuggestedPrice] = useState("");

  useEffect(() => {
    if (flip) {
      setPlatform(flip.platform || "Depop");
      setRegion(flip.region || "UK");
      setCurrency(flip.currency || "GBP");
      setGrade(flip.grade || "A");
      setStyle(flip.style || "witty");
      setBrand(flip.brand || "");
      setItemType(flip.itemType || "");
      setSize(flip.size || "");
      setColour(flip.colour || "");
      setMaterial(flip.material || "");
      setFit(flip.fit || "");
      setFlaws(flip.flaws || "");
      setPersonality(flip.personality || []);
      setCost(flip.cost?.toString() || "");
      setSuggestedPrice(flip.suggestedPrice?.toString() || "0");
      console.log("Loaded flip into form:", flip);
    }
  }, [flip]);

  const handleCheckbox = (tag) => {
    setPersonality((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSuggestedPrice = () => {
    const parsedCost = parseFloat(cost);
    const multiplier = platform === "Depop" ? 1.5 : platform === "Vinted" ? 1.4 : 1.3;
    const calculated = isNaN(parsedCost) ? 0 : Math.round(parsedCost * multiplier * 100) / 100;
    setSuggestedPrice(calculated.toString());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const flipData = {
      id: flip?.id || null,
      platform,
      region,
      currency,
      grade,
      style,
      brand,
      itemType,
      size,
      colour,
      material,
      fit,
      flaws,
      personality,
      cost: isNaN(parseFloat(cost)) ? 0 : parseFloat(cost),
      suggestedPrice: isNaN(parseFloat(suggestedPrice)) ? 0 : parseFloat(suggestedPrice),
    };

    console.log("Submitting flip:", flipData);

    if (typeof onSave === "function") {
      await onSave(flipData);
      console.log("Flip saved via onSave");
      setCost("");
      setSuggestedPrice("0");
    } else {
      console.error("onSave is not a function");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Col md={2}>
          <Form.Group>
            <Form.Label>Platform</Form.Label>
            <Form.Select value={platform} onChange={(e) => setPlatform(e.target.value)}>
              <option value="Depop">Depop</option>
              <option value="Vinted">Vinted</option>
              <option value="eBay">eBay</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group>
            <Form.Label>Grade</Form.Label>
            <Form.Select value={grade} onChange={(e) => setGrade(e.target.value)}>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group>
            <Form.Label>Region</Form.Label>
            <Form.Select value={region} onChange={(e) => setRegion(e.target.value)}>
              <option value="UK">UK</option>
              <option value="US">US</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
              <option value="ES">Spain</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group>
            <Form.Label>Currency</Form.Label>
            <Form.Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option value="GBP">£ GBP</option>
              <option value="USD">$ USD</option>
              <option value="EUR">€ EUR</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Description Style</Form.Label>
            <Form.Select value={style} onChange={(e) => setStyle(e.target.value)}>
              {["neutral", "witty", "trustworthy", "hype", "minimal"].map((key) => (
                <option key={key} value={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={2}><Form.Control placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} /></Col>
        <Col md={2}><Form.Control placeholder="Item Type" value={itemType} onChange={(e) => setItemType(e.target.value)} /></Col>
        <Col md={2}><Form.Control placeholder="Size" value={size} onChange={(e) => setSize(e.target.value)} /></Col>
        <Col md={2}><Form.Control placeholder="Colour" value={colour} onChange={(e) => setColour(e.target.value)} /></Col>
        <Col md={2}><Form.Control placeholder="Material" value={material} onChange={(e) => setMaterial(e.target.value)} /></Col>
        <Col md={2}><Form.Control placeholder="Fit" value={fit} onChange={(e) => setFit(e.target.value)} /></Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Flaws"
            value={flaws}
            onChange={(e) => setFlaws(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Control
            type="number"
            placeholder="Cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Suggested Price</Form.Label>
            <Form.Control
              type="number"
              value={suggestedPrice}
              readOnly
              style={{ backgroundColor: "#f8f9fa", border: "1px solid #ced4da" }}
            />
            <Button
  variant="outline-success"
  className="mt-2"
  style={{
    backgroundColor: "#e6f2e6", // soft green tone
    borderColor: "#5c7d5c",
    color: "#2f4f2f"
  }}
  onClick={handleSuggestedPrice}
>
  Generate Suggested Price
</Button>


          </Form.Group>
        </Col>
      </Row>

      <Form.Label>Personality Tags</Form.Label>
      <div className="checkbox-grid mb-3">
        {["sarcasm", "genZ", "resale", "clean"].map((tag) => (
          <Form.Check
            key={tag}
            type="checkbox"
            label={tag}
            value={tag}
            checked={personality.includes(tag)}
            onChange={() => handleCheckbox(tag)}
          />
        ))}
      </div>

      <Button variant="success" type="submit">
        Save Flip
      </Button>
    </Form>
  );
}

export default FlipForm;
