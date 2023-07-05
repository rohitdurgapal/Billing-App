import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Itemform = ({
  handleAction,
  code,
  setCode,
  name,
  setName,
  price,
  setPrice,
  itemId,
  flag,
}) => {
  return (
    <>
      <div className="item-block">
        <h3>{itemId === "" ? "Add" : "Update"} Item</h3>
        <Form onSubmit={handleAction}>
          <Row>
            <Col xs={3}>
              <Form.Control
                type="text"
                placeholder="Item Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
            <Col xs={3}>
              <Form.Control
                type="text"
                placeholder="Item Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </Col>
            <Col xs={3}>
              <Form.Control
                type="text"
                placeholder="Item Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Col>
            <Col xs={3}>
              <Button variant="primary" type="submit" disabled={flag}>
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default Itemform;
